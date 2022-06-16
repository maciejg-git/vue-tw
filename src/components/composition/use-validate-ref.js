import { ref, computed } from "vue";
import { globalValidators } from "../../validators";

let isString = (v) => typeof v === "string";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: true,
  wasInvalid: false,
};

let forms = {}

// shared form status

let formStatus = {};

let getFormStatus = (form) => {
  if (!form) return;
  if (formStatus[form]) return formStatus[form];
  formStatus[form] = ref({ ...defaultStatus });
  return formStatus[form];
};

//  FIX:
let updateFormStatus = (status, { touched, dirty, valid }) => {
  status.value.touched = status.value.touched || touched;
  status.value.dirty = status.value.dirty || dirty;
  status.value.valid = status.value.valid && valid;
};

let getForm = (form, input) => {
  if (!forms[form]) {
    forms[form] = {
      inputs: [input],
      status: {
        ...defaultStatus
      }
    }
  } else {
    forms[form].inputs.push(input)
  }

  return forms[form]
}

let getValidateStatus = ({ validators, status, model, formStatus }) => {
  let valueToValidate = model.value;

  let newStatus = {
    ...defaultStatus,
    touched: status.value.touched,
    wasInvalid: status.value.wasInvalid,
    dirty: status.value.dirty || (valueToValidate && !!valueToValidate.length),
  };

  for (let [key, value] of Object.entries(validators)) {
    if (globalValidators[key]) {
      newStatus[key] = globalValidators[key](valueToValidate, value);
    } else if (typeof validators[key] === "function") {
      newStatus[key] = validators[key](valueToValidate);
    }
    newStatus.valid = newStatus.valid && newStatus[key];
  }

  newStatus.wasInvalid = newStatus.wasInvalid || (!newStatus.valid && newStatus.touched)  

  // updateFormStatus(formStatus, newStatus);

  return newStatus;
};

export default function useValidateRef(model, validators, form) {
  let m = {
    _isValidateRef: true,
    model: ref(model),
    validators: validators || {},
    status: ref({ ...defaultStatus }),
    touch() {
      this.status.value.touched = true;
    },
  };

  m.formStatus = getForm(form, m)

  return computed({
    get() {
      return m;
    },
    set(value) {
      if (isString(value) || Array.isArray(value)) m.model.value = value;
      m.status.value = getValidateStatus(m);
    },
  });
}
