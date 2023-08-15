import { disabled } from "./global"

let button = {
  classes: `
    sm:text-base
    focus:outline-none
  `,
  size: {
    medium: `
      px-4
      py-2
    `,
    small: `
      px-4
      py-1
    `,
    large: `
      px-4
      py-3
    `,
    tiny: `
      px-4
      py-1
      !text-sm
    `,
  },
  shape: {
    rounded: `
      rounded-md
    `,
    square: `
      rounded-none
    `,
    circle: `
      rounded-full
    `
  },
  text: {
    optional: true,
    uppercase: `
      uppercase
    `
  },
  variant: {
    classes: `
      font-medium
    `,
    primary: `
      text-text-100
      bg-primary-500
      dark:bg-primary-500
      hover:bg-primary-600
      dark:hover:bg-primary-600
      border-primary-700
      focus:ring-primary-200
    `,
    secondary: `
      text-text-100
      bg-secondary-500
      dark:bg-secondary-500
      hover:bg-secondary-600
      dark:hover:bg-secondary-600
      border-secondary-700
      focus:ring-secondary-200
    `,
    warn: `
      text-text-800
      bg-warn-400
      dark:bg-warn-400
      hover:bg-warn-500
      dark:hover:bg-warn-500
      border-warn-600
      focus:ring-warn-200
    `,
    danger: `
      text-text-800
      bg-danger-400
      dark:bg-danger-400
      hover:bg-danger-500
      dark:hover:bg-danger-500
      border-danger-600
      focus:ring-danger-200
    `,
    success: `
      text-text-800
      bg-success-400
      dark:bg-success-400
      hover:bg-success-500
      dark:hover:bg-success-500
      border-success-600
      focus:ring-success-200
    `
  },
  effect: {
    ring: `
      transition-shadow
      transition-opacity
      duration-150
      focus:ring-4
    `
  },
  events: {
    disabled: `
      ${disabled}
    `
  },
  special: {
    optional: true,
    raised: `
      border-b-4
    `,
    circle: `
      rounded-full
      !p-4
    `
  },
  preset: {
    plain: `
      focus:outline-none
      text-text-600
      dark:text-text-300
      font-semibold
    `
  }
}

export default {
  button,
}
