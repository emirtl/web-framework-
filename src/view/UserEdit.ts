import { UserShow } from "./UserShow";
import { UserProps } from "./../model/UserProps";
import { User } from "./../model/User";
import { View } from "./View";
import { UserForm } from "./UserForm";

export class UserEdit extends View<User, UserProps> {
  eventMaps(): { [key: string]: () => void } {
    return {};
  }
  regionsMap(): { [key: string]: string } {
    return { UserShow: ".user-show", UserForm: ".user-form" };
  }
  onRender(): void {
    new UserShow(this.regions["UserShow"], this.model).render();
    new UserForm(this.regions["UserForm"], this.model).render();
  }

  template(): string {
    return `
   <div>
   <div class='user-show'></div>
   <div class='user-form'></div>
   </div>
   `;
  }
}
