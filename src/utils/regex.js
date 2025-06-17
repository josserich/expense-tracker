const emailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const noNumberRgx = /[^.\d]/g;
const noNumberRgx1 = /[^,\d]/g;
const numberRgx = /^(?:-?(?:0\.\d+|[1-9]\d*(?:\.\d+)?)(?:[eE][-+]?\d+)?)$/;
const usernameRgx = /^[a-zA-Z0-9_.]{3,15}$/;
const passwordRgx = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,})/;
export {
  emailRgx,
  noNumberRgx,
  noNumberRgx1,
  numberRgx,
  usernameRgx,
  passwordRgx,
};
