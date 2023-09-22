import {KeyEnum, AppId_Enum, APPID_key} from "./enum";
export const BASE_APPID_KEY: APPID_key = "QP"; //分公司名称
export const miniId = AppId_Enum[BASE_APPID_KEY];
export const Global_Cog = {
  APPID: AppId_Enum[BASE_APPID_KEY],
  MAP_KEY: KeyEnum[BASE_APPID_KEY],
  TITLE: `当前:${BASE_APPID_KEY}公司`,
  BASE_APPID_KEY,
};
export default Global_Cog;
