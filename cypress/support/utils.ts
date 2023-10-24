export const getPrefix = (): string => {
  if (window.location.pathname.includes("%2F")) {
    return window.location.pathname.split("%2F").pop().split("_")[0];
  }
  return window.location.pathname.split("%5C").pop().split("_")[0];
};
