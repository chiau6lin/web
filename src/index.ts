import { User } from "./modules/User";

const user = new User({
  name: "John",
  age: 20
});


/**
 * user.attributes.get('id');
 * user.attributes.get('name');
 * user.attributes.get('age');
 * user.sync.save();
 *  
 * refactor #1
 * user.save();
 */

// const on = user.on;
// on("change", () => {});

// also can call this way
// user.on("change", () => {})

