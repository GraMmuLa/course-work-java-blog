import KeyValue from "./keyValue";

export type CookieMap = {[param:string]:string};

export interface Cookie extends KeyValue<string, string>{
}