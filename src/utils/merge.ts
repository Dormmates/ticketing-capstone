const merge = (...classes: (string | undefined | false | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export default merge;
