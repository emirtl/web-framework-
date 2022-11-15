import { UserForm } from "./UserForm";
import { UserProps } from "../model/UserProps";
import { User } from "./../model/User";
import { CollectionView } from "./CollectionView";
import { UserShow } from "./UserShow";

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render();
  }
}
