import { User } from "../model/User";
import { UserProps } from "./../model/UserProps";
import { View } from "./View";
export class UserShow extends View<User, UserProps> {
  eventMaps(): { [key: string]: () => void } {
    return {};
  }
  template(): string {
    return `
    <h1>User Form</h1>
    <h3>${this.model.get("name")}</h3>
    <h3>${this.model.get("lastName")}</h3>
    <h3>${this.model.get("age")}</h3>
    `;
  }
}
