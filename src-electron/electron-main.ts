import 'reflect-metadata';

import { app, BrowserWindow } from 'electron';
import { readFileSync } from 'original-fs';
import * as path from 'path';

import { AppDataSource } from './data-source';
import { User } from './entities/user';
import { registerDbIpc } from './ipc-db';

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

registerDbIpc();

// DB を初期化。
void AppDataSource.initialize()
  .then(async dataSource => {
    const users: User[] = await dataSource.manager.find(User);
    if (users.length === 0) {
      // サンプルデータを追加。
      const user1: User = new User();
      user1.lastName = '太秦';
      user1.firstName = '太夫';
      user1.portrait = 'data:image/png;base64,' + readFileSync('sample.png', 'base64');
      await AppDataSource.manager.save(user1);

      const user2: User = new User();
      user2.lastName = '車太鼓屋';
      user2.firstName = '影千代';
      await AppDataSource.manager.save(user2);
    }
  });
