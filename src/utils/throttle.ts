export function throttle(fn: (...args: any[]) => any, delay = 1000) {
  let timerId: number | undefined;
  let invokedOnce = false;

  return function (...args: any[]) {
    if (!invokedOnce) {
      fn(...args);
      invokedOnce = true;
      return;
    }

    if (!timerId) {
      timerId = window.setTimeout(() => {
        fn(...args);
        timerId = undefined;
      }, delay);
    }
  };
}
