import { Collection } from "./Collection";
import { UserProps } from "./UserProps";
import { Model } from "./Model";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";

export class User extends Model<UserProps> {
  static buildUser(data: UserProps): User {
    return new User(
      new Eventing(),
      new Sync("http://localhost:3000/users"),
      new Attributes(data)
    );
  }

  static UserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      "http://localhost:3000/users",
      (json: UserProps) => User.buildUser(json)
    );
  }
}
