// export const debounceFunc = (method, delay) => {
//   let timeout;
//   return () => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(method, delay);
//   };
// };

// export var debounce = (func, wait, immediate) => {
//   return function () {
//     var context = this;
//     var later = function () {
//       var args = arguments;
//       if (!immediate) {
//         func.apply(context, args);
//       }
//     };
//   };
// };
