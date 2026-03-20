import { createMMKV } from 'react-native-mmkv';

//mmkv
const STORAGE_USERS = 'user';
const STORAGE_TOKENS = 'token';
const STORAGE_CONFIGS = 'config';

export const storageUser = createMMKV({ id: `${STORAGE_USERS}` });
export const storageToken = createMMKV({ id: `${STORAGE_TOKENS}` });
export const storageConfig = createMMKV({ id: `${STORAGE_CONFIGS}` });

export { STORAGE_USERS, STORAGE_TOKENS, STORAGE_CONFIGS };
