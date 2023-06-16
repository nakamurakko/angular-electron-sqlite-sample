// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// https://www.electronjs.org/ja/docs/latest/tutorial/context-isolation

import { contextBridge, ipcRenderer } from 'electron';

import { IUser } from './entities/interfaces/i-user';

contextBridge.exposeInMainWorld('DbApi', {
  /**
   * ユーザー一覧を取得する。
   *
   * @returns ユーザー一覧。
   */
  getUsers: (): Promise<Array<IUser>> => ipcRenderer.invoke('getUsers').then(value => value as Array<IUser>)
});

contextBridge.exposeInMainWorld('GreetingApi', {
  /**
   * 挨拶を返す。
   *
   * @param whoIs 挨拶する相手
   * @returns 挨拶。
   */
  greeting: (whoIs: string): Promise<string> => ipcRenderer.invoke('greeting', whoIs).then(value => value as string)
});
