import { UserProps } from "../model/UserProps";
import { User } from "./../model/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventMaps(): { [key: string]: () => void } {
    return {
      "click:.set-name": this.onSetButton,
      "click:.update-name": this.onUpdateName,
    };
  }

  onSetButton = (): void => {
    console.log("clicked");
    const input = document.querySelector("input");
    if (!input) {
      return;
    }
    const name = input.value;
    this.model.set({ name });
  };

  onUpdateName = () => {
    this.model.save();
  };

  template(): string {
    return `
    <div>
    <input />
    <button class='set-name'>Set Name</button>
    <button class='update-name'>Update Name</button>
    </div>
    `;
  }
}
