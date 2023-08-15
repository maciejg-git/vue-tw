import { setStyleVar } from "./global"

setStyleVar({
  "--progress-bar-timing": "linear",
  "--progress-bar-speed": "1.5s",
  "--progress-bar-width": "50%",
  "--progress-bar-direction": "normal",
})

let progress = {
  progress: {
    classes: `
      overflow-hidden
    `,
    size: {
      default: `
        h-4
      `,
      tiny: `
        h-1
      `
    },
    shape: {
      default: `
        rounded
      `,
      rounded: `
        rounded-full
      `
    },
    variant: {
      default: `
        bg-secondary-100
        dark:bg-dark-700
      `,
      transparent: `
        bg-transparent
        dark:bg-transparent
      `
    }
  },
  progressBar: {
    classes: `

    `,
    shape: {
      rounded: `
        rounded-full
      `
    },
    variant: {
      default: `
        bg-primary-500
        dark:bg-primary-500;
      `,
      red: `
        bg-danger-500
        dark:bg-danger-500
      `,
      gradient: `
        bg-gradient-to-r
        from-yellow-400
        via-orange-500
        to-red-500
      `
    }
  },
  label: {
    classes: `
      text-xs
      font-bold
      text-white
    `
  }
}

export default {
  progress,
}
