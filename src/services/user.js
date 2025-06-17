import {
  capitalizeWord,
  emailRgx,
  passwordRgx,
  usernameRgx,
  validateImg,
} from "../utils";
import getDB from "./db";
import bcryptjs from "bcryptjs";
import JWT, { SupportedAlgorithms } from "expo-jwt";

const userSchema = async () => {
  const db = await getDB();
  await db.execAsync(`
  CREATE 
  TABLE IF NOT EXISTS 
  User (
  UserId INTEGER PRIMARY KEY NOT NULL, 
  UserName VARCHAR(255), 
  UserFullname TEXT, 
  UserEmail VARCHAR(255), 
  UserPassword VARCHAR(255), 
  UserImg BLOB,
  UserInfo TEXT
  );
  `);
  // const query = `
  // SELECT * FROM User `;
  // const user = await db.getFirstAsync(query);
  // if (!user) {
  // const query = `
  // INSERT
  // INTO
  // User
  // (UserName, UserPassword, UserFullname, UserEmail, UserImg, UserInfo)
  // VALUES
  // ("josse", "billionaireWFA100%", "Josse Surya Pinem", "pinemjosse@gmail.com", "", "")
  // `;
  // await db.runAsync(query);
  // }
};
const updateUserAPI = async (req) => {
  const { userName, userFullname, userEmail, userImg, userInfo } = req;
  if (!userName || !userFullname || !userEmail) {
    const msgError = `Please fill (UserName, UserFullname, UserEmail) fields`;
    throw new Error(msgError);
  }
  // validation username
  const isValidUserName = usernameRgx.test(userName);
  if (!isValidUserName) {
    const msg =
      "Requirement Username : Only contain Alphabet, Number, Without Space, Minimum length Character 3 - 15 ";
    throw new Error(msg);
  }
  // validation email
  const isEmail = emailRgx.test(userEmail);
  if (!isEmail) {
    const errMsg = `Email is not Valid !`;
    throw new Error(errMsg);
  }
  // validation img
  if (userImg) {
    if (userImg.mimeType) {
      validateImg(userImg);
    }
  }
  const db = await getDB();
  const query = `
  UPDATE
  User 
  SET 
  UserName = ?,
  UserFullname = ?,
  UserEmail = ?,
  UserImg = ?,
  UserInfo = ?
  WHERE UserId = 1
  `;
  await db.runAsync(query, [
    userName,
    capitalizeWord(userFullname),
    userEmail,
    userImg.base64,
    userInfo,
  ]);
  const msg = `User Has been Updated !`;
  return msg;
};
const resetPasswordAPI = async (req) => {
  const { userPassword, userPasswordConfirmation } = req;
  const db = await getDB();
  // validation require
  if (!userPassword && !userPasswordConfirmation) {
    const errMsg = "Uppsss, All Input are Required !";
    throw new Error(errMsg);
  }
  // validation same password
  if (userPassword !== userPasswordConfirmation) {
    const errMsg = "Upppps , Password and Confirmation aren't match";
    throw new Error(errMsg);
  }
  // validation strong password
  const isStrongPassword = passwordRgx.test(userPassword);
  if (!isStrongPassword) {
    const errMsg =
      "Requirement Password : Minimum length 8 Character, At least 1 Capital letter (A-Z), At least 1 Number (0-9), At least 1 Character sepecial (@,#,$) ";
    throw new Error(errMsg);
  }
  // hashingPassword
  bcryptjs.setRandomFallback((len) => {
    const buf = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      buf[i] = Math.floor(Math.random() * 256);
    }
    return buf;
  });
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(userPassword, salt);
  // executeQuery
  const query = `
  UPDATE
  User 
  SET 
  UserPassword = ?
  WHERE UserId = 1
  `;
  await db.runAsync(query, [hashedPassword]);
  const msg = `Password Has been Reset !`;
  return msg;
};
const getUserAPI = async () => {
  const db = await getDB();
  const query = `
  SELECT * FROM User
  `;
  const user = await db.getFirstAsync(query);
  return user;
};
const loginAPI = async (req) => {
  const { userName, userPassword } = req;
  const db = await getDB();
  // validation required
  if (!userName || !userPassword) {
    const errMsg = "Uppsss, All Input are Required !";
    throw new Error(errMsg);
  }
  // vallidate existed username
  const query = `
  SELECT 
  UserId,
  UserName,
  UserFullname,
  UserPassword
  FROM 
  User
  WHERE UserName = ?
  `;
  const user = await db.getFirstAsync(query, [userName]);
  if (!user) {
    const errMsg = `Uppsss, ${userName} is not existed !`;
    throw new Error(errMsg);
  }
  // password
  const passwordMatch = await bcryptjs.compare(userPassword, user.UserPassword);
  if (!passwordMatch) {
    const errMsg = "Uppsss, Password is Incorrect !";
    throw new Error(errMsg);
  }
  // token
  const payload = {
    userId: user.UserId,
    userName: user.UserName,
  };
  const key = "shh";
  const token = JWT.encode(payload, key);
  return { token, key };
};
export { userSchema, updateUserAPI, getUserAPI, loginAPI, resetPasswordAPI };
