import { User } from "./modules/User";
import { UserEdit } from "./views/UserEdit";

const userEdit = new UserEdit(
  document.getElementById('root') as HTMLElement,
  User.buildUser({name: "John", age: 20})
);

userEdit.render();

