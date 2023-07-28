// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// https://www.electronjs.org/ja/docs/latest/tutorial/context-isolation

import { contextBridge, ipcRenderer } from 'electron';

import { IUser } from '../src/@types/entities/interfaces/i-user';

contextBridge.exposeInMainWorld('DbApi', {
  /**
   * ユーザーを取得する。
   *
   * @param userId ユーザー ID。
   */
  getUser: (userId: string): Promise<IUser> => ipcRenderer.invoke('getUser', userId).then(value => value as IUser),

  /**
   * ユーザー一覧を取得する。
   *
   * @returns ユーザー一覧。
   */
  getUsers: (): Promise<Array<IUser>> => ipcRenderer.invoke('getUsers').then(value => value as Array<IUser>)
});
