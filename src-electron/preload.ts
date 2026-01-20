// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// https://www.electronjs.org/ja/docs/latest/tutorial/context-isolation

import { contextBridge, ipcRenderer } from 'electron';

import { IUser } from '../src/@types/entities/interfaces/i-user';

contextBridge.exposeInMainWorld('dbApi', {

  /**
   * ユーザーを追加する。
   *
   * @param user ユーザー ID。
   * @returns ユーザー。
   */
  addUser: (user: IUser): Promise<IUser> => ipcRenderer.invoke('addUser', user).then(value => value as IUser),

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
  getUsers: (): Promise<IUser[]> => ipcRenderer.invoke('getUsers').then(value => value as IUser[])

});
