import 'reflect-metadata';

import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

import { AppDataSource } from './data-source';
import { User } from './entities/user';

async function createWindow(): Promise<void> {
  // ブラウザウインドウを作成します。
  const mainWindow: BrowserWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // そしてアプリの index.html を読み込みます。
  await mainWindow.loadFile(path.join(__dirname, 'angular-electron-sqlite-sample/index.html'));

  // メニューバーを非表示。
  mainWindow.setMenuBarVisibility(false);

  // デベロッパー ツールを開きます。
  // mainWindow.webContents.openDevTools();
}

// このメソッドは、Electron の初期化が完了し、
// ブラウザウインドウの作成準備ができたときに呼ばれます。
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
void app.whenReady()
  .then(async () => {
    await createWindow();

    app.on("activate", () => {
      // macOS では、Dock アイコンのクリック時に他に開いているウインドウがない場合、
      // アプリのウインドウを再作成するのが一般的です。
      if (BrowserWindow.getAllWindows().length === 0) {
        void createWindow();
      }
    });
  });

// macOS を除き、全ウインドウが閉じられたときに終了します。 ユーザーが
// Cmd + Q で明示的に終了するまで、アプリケーションとそのメニューバーを
// アクティブにするのが一般的です。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// このファイルでは、アプリ内のとある他のメインプロセスコードを
// インクルードできます。
// 別々のファイルに分割してここで require することもできます。

// DB を初期化。
void AppDataSource.initialize();

ipcMain.handle('getUsers',
  /**
   * ユーザー一覧を取得する。
   *
   * @param event イベントデータ。
   * @returns ユーザー一覧。
   */
  async (event: Electron.IpcMainInvokeEvent): Promise<string> => {
    const user: User = new User();
    user.firstName = '太夫';
    user.lastName = '太秦';
    console.log(user);

    await AppDataSource.manager.save(user);

    const users: Array<User> = await AppDataSource.getRepository(User).find();

    return JSON.stringify(users);
  });

ipcMain.handle('greeting',
  /**
   * 挨拶を返す。
   *
   * @param event イベントデータ。
   * @param whoIs 挨拶する相手。
   * @returns 挨拶。
   */
  (event: Electron.IpcMainInvokeEvent, whoIs: string): Promise<string> => {
    return new Promise((resolve) => {
      const result: string = 'Hello ' + whoIs + '.';
      resolve(result);
      return;
    });
  });
