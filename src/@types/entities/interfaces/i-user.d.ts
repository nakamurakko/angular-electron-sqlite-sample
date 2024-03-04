/**
 * ユーザー Entitiy インターフェイス。
 */
export interface IUser {

  /** ID。 */
  id?: string;

  /** 名。 */
  firstName?: string;

  /** 姓。 */
  lastName?: string;

  /** 写真。 Data URL + base64 データで文字列化する。 */
  portrait?: string;

}
