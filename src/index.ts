import { UserProps } from "./model/UserProps";
import { Collection } from "./model/Collection";
import { UserList } from "./view/UserList";
import { User } from "./model/User";

const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.buildUser(json);
  }
);
users.on("collection", () => {
  const root = document.getElementById("root");
  if (root) {
    new UserList(root, users).render();
  }
});
users.fetch();
