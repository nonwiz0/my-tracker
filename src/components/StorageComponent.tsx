import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

// Get lists of keys:
export const getKeys = async () => {
  const { keys } = await Storage.keys();
  // console.log("Got Keys: ", keys);
  return keys;
};

export const getItem = async (keyName: string) => {
  const { value } = await Storage.get({ key: `${keyName}` });
};

export const getObject = async (keyName: string) => {
  const ret = await Storage.get({ key: keyName });
  const objValue = JSON.parse(ret.value!);
  console.log(objValue);
};
