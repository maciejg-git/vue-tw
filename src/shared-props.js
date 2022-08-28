import { correctPlacement } from "./const.js";
import { defaultProps } from "./defaultProps";

// popper props

export const sharedPopperProps = (component) => {
  return {
    placement: {
      type: String,
      default: defaultProps(component, "placement", "bottom-start"),
      validator: function (v) {
        return correctPlacement.includes(v);
      },
    },
    offsetX: { type: Number, default: defaultProps(component, "offsetX", 0) },
    offsetY: { type: Number, default: defaultProps(component, "offsetY", 0) },
    noFlip: { type: Boolean, default: defaultProps(component, "noFlip", false) },
  };
};

// style props

export const sharedStyleProps = (component) => {
  return {
    base: { type: String, default: defaultProps(component, "base", "default") },
    variant: { type: [String, Boolean], default: "" },
  };
};

// form props

export const sharedFormProps = (d, options) => {
  d = d || {};
  options = options || {};

  let props = {};
  if (options.icon === true) {
    props.icon = { type: String, default: d.icon || "" };
  }
  if (options.clearable === true) {
    props.clearable = { type: Boolean, default: d.clearable || false };
  }

  return {
    ...props,
    state: { type: String, default: d.state || null },
  };
};
