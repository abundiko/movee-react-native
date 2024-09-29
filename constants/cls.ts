// classnames for reusability
const buttonClass = " px-6 flex-row items-center justify-center border ";
export const cls = {
  bg: {
    class: "bg-lighter dark:bg-darker",
    pureClass: "bg-white dark:bg-black",
    greyClass: "bg-lightGrey dark:bg-darkGrey",
    opacified: "bg-dark/10 dark:bg-light/10"
  },
  text: {
    class: "text-darker dark:text-lighter",
    lightClass: "text-dark dark:text-light",
    lighterClass: "text-darkGrey dark:text-lightGrey",
    primaryClass: "text-primary",
    secondaryClass: "text-secondary",
  },
  btn: {
    primaryClass: buttonClass + "py-3 rounded-[35px] bg-primary border-primary",
    primaryAltClass: buttonClass + "py-3 rounded-[35px] bg-primary/20 border-primary",
    primaryBorderClass: buttonClass + "py-3 rounded-[35px] border-primary",
    secondaryClass:
      buttonClass + "py-3 rounded-[35px] bg-secondary border-secondary",
    secondaryAltClass:
      buttonClass + "py-3 rounded-[35px] bg-secondary/20 border-secondary",
    secondaryBorderClass: buttonClass + "py-3 rounded-[35px] border-secondary",
    iconClass: "h-10 w-10 rounded-lg items-center justify-center",
    selectClass: "px-4 py-2.5 rounded-[30px] bg-primary/20 flex-row items-center"
  },
  input: {
    className:
      "px-4 py-3 rounded-lg border border-neutral-400 focus:border-blue-500 bg-transparent text-dark dark:text-light",
    searchClassName: "px-4 py-2.5 rounded-3xl bg-black/10 dark:bg-white/10 text-dark/80 dark:text-light/80"
  },
  message: {
    errorClass:
      "text-red-800 bg-red-50 border-red-800 px-3 py-3 rounded-lg border mb-4 dark:text-red-800 dark:bg-red-100",
    successClass:
      "text-green-800 bg-green-50 border-green-800 px-3 py-3 rounded-lg border mb-4 dark:text-green-800 dark:bg-green-100",
  },
};
