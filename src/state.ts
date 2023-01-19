import { atom } from "recoil";

type AppMode = 'initial' | 'listing';

export const mode = atom({ key: 'mode', default: 'initial' as AppMode })
export const master_pw = atom({ key: 'master_pw', default: '' });
export const names = atom({ key: 'names', default: [] as string[] });
export const error = atom({ key: 'error', default: undefined as string | undefined });