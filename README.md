# angular-electron-sqlite-sample

## デバッグ手準備

1. パッケージをインストールする。
    ```bat
    npm install
    ```
1. デバッグビルドを実行する。
    ```bat
    npm run build:development:all
    ```
1. デバッグ構成 `Debug All` を選択してデバッグを開始する。

## EXE 作成手順

1. EXE ビルドを実行する。
    ```bat
    npm run build-portable
    ```

## Electron - Angular 間のやりとり

`preload.ts` に定義した API を介してやりとりする。[コンテキストの分離](https://www.electronjs.org/ja/docs/latest/tutorial/context-isolation)を参照。
加えて、 Angular 側で使用できるように `global.d.ts` に API のインターフェイスを公開する。

## DB アクセス

Entity Framework に typeorm を使用し、 typeorm の Entity クラス、 Entity クラス用のインターフェイスを使用する。

```typescript
/**
 * ユーザー Entity クラス。 IUser を実装する。
 */
@Entity()
export class User implements IUser {

  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public firstName: string = '';

  @Column()
  public lastName: string = '';

}
```

```typescript
/**
 * ユーザー Entitiy インターフェイス。
 */
export interface IUser {

  /** ID。 */
  id?: string;

  /** 名。 */
  firstName: string;

  /** 姓。 */
  lastName: string;

}
```

### Electron 側の DB アクセス

typeorm の Entity クラスでアクセスする。

### Angular 側の DB アクセス

直接 DB アクセス出来ないため、 Entity クラス用インターフェイスを使用してアクセスする。
