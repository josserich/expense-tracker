import AsyncStorage from "@react-native-async-storage/async-storage";

// storage  = 1.order 2.auth

const saveStorage = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};
const getStorage = async (key) => {
  const storage = await AsyncStorage.getItem(key);
  return storage ? JSON.parse(storage) : [];
};
const removeStorage = async (key) => {
  await AsyncStorage.removeItem(key);
};
export { saveStorage, getStorage, removeStorage };
