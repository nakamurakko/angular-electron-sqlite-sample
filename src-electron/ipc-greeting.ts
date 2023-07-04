import { ipcMain } from 'electron';

/**
 * Greeting 関連のプロセス間通信を登録する。
 */
export function registerGreetingIpc(): void {

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

}
