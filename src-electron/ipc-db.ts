import { ipcMain } from 'electron';

import { IUser } from '../src/@types/entities/interfaces/i-user';
import { AppDataSource } from './data-source';
import { User } from './entities/user';

/**
 * DB 関連のプロセス間通信を登録する。
 */
export function registerDbIpc(): void {

  ipcMain.handle('addUser',
    /**
     * ユーザーを追加する。
     *
     * @param event イベントデータ。
     * @param user ユーザー ID。
     * @returns ユーザー。
     */
    async (event: Electron.IpcMainInvokeEvent, user: IUser): Promise<IUser> => {
      return await AppDataSource.getRepository(User)
        .save(user)
        .then(value => value as IUser);
    });

  ipcMain.handle('getUser',
    /**
     * ユーザーを取得する。
     *
     * @param event イベントデータ。
     * @param userId ユーザー ID。
     * @returns ユーザー。
     */
    async (event: Electron.IpcMainInvokeEvent, userId: string): Promise<IUser> => {
      return await AppDataSource.getRepository(User)
        .findOneBy({ id: userId })
        .then(value => value as IUser);
    });

  ipcMain.handle('getUsers',
    /**
     * ユーザー一覧を取得する。
     *
     * @returns ユーザー一覧。
     */
    async (): Promise<IUser[]> => {
      return await AppDataSource.getRepository(User)
        .find()
        .then(value => value.map(x => x as IUser));
    });

}
