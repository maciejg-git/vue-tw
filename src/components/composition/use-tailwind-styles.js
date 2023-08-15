import { ref, computed } from "vue"

let isFunction = (v) => typeof v === "function";

let getClasses = (classes) => {
  return isFunction(classes) ? classes() : classes
}

let parseElementModProp = (props, el) => {
    let element = "mod" + el.charAt(0).toUpperCase() + el.slice(1)

    if (!props[element]) return {}

    return props[element].split(" ").reduce((acc, i) => {
      let item = i.split(/\s*(?:\?|:)\s*/).toReversed()

      if (item[2] && item[2] !== props.variant) {
        return acc
      }

      acc[item[1]] = {
        condition: item[2] ?? null,
        key: item[1],
        value: item[0],
      }

      return acc
    }, {})
}

export default function useTailwindStyles(props, styles, elements) {
  let classes = {}
  let variants = {}
  let dataStyle = {}
  
  let state = ref("")

  let isSingleElement = Object.keys(elements).length === 1

  for (let [el, options] of Object.entries(elements)) {
    variants[el] = {}
    classes[el] = computed(() => {
      let base = props.base

      if (!styles[base]) return ""

      let mods = parseElementModProp(props, el)

      let elementStyles = !isSingleElement ? styles[base][el] : styles[base]

      let classes = ""

      if (mods.preset) {
        return getClasses(elementStyles.preset[mods.preset.value]).replace(/\s\s+/g, " ") + " " + (options?.fixed || "") + " " + (options?.computed?.value || "")
      }

      if (elementStyles?.classes) {
        classes += getClasses(elementStyles.classes)
      }

      if (options?.dataStyle) {
        dataStyle[el] = elementStyles.data
      }

      for (let type in elementStyles) {
        let sharedClasses = null
        let stateClasses = null
        let modClasses = null
        let defaultClasses = null

        if (options?.externalVariants?.includes(type)) {
          for (let variant in elementStyles[type]) {
            variants[el][variant] = elementStyles[type][variant].replace(/\s\s+/g, " ")
          }
          continue
        }

        if (type !== "state" && type !== "preset" && type !== "data") {
          sharedClasses = elementStyles[type]?.classes || ""
        }

        if (type !== "preset" && type !== "data") {
          stateClasses = state.value ? elementStyles[type][state.value] : null
        }

        if (type !== "state" && type !== "preset" && type !== "data") {
          modClasses = mods[type] && (mods[type].condition === null || mods[type].condition === props.variant) ? elementStyles[mods[type].key][mods[type].value] : null

          defaultClasses = !elementStyles[type].optional ? Object.values(elementStyles[type])[sharedClasses ? 1 : 0] : ""
        }

        classes += ` ${getClasses(sharedClasses)} ${(getClasses(stateClasses) ?? getClasses(modClasses)) || getClasses(defaultClasses)}`
      }

      return classes.replace(/\s\s+/g, " ") + " " + (options?.fixed || "") + " " + (options?.computed?.value || "")
    })
  }

  let setState = (newState) => {
    state.value = newState
  }

  return { classes, setState, variants, dataStyle }

}
