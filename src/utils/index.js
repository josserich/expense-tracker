import { saveStorage, getStorage, removeStorage } from "./asyncStorage";
import capitalizeWord from "./capitalize";
import { formatCurrency, formatCurrency1, unFormatCurrency } from "./currency";
import { formatDate, formatDateTime } from "./dateTime";
import delay from "./delay";
import exportXls from "./exportExcel";
import {
  emailRgx,
  noNumberRgx,
  noNumberRgx1,
  numberRgx,
  usernameRgx,
  passwordRgx,
} from "./regex";
import { validateProduct, validateImg } from "./validate";

export {
  capitalizeWord,
  delay,
  exportXls,
  formatCurrency,
  formatCurrency1,
  formatDate,
  formatDateTime,
  emailRgx,
  numberRgx,
  noNumberRgx,
  noNumberRgx1,
  usernameRgx,
  passwordRgx,
  unFormatCurrency,
  validateProduct,
  validateImg,
  saveStorage,
  getStorage,
  removeStorage,
};
