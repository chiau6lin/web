import { AxiosResponse } from "axios";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  public event: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  /**
   * refactor #1
   * 
   *    on(eventName: string, callback: Callback): void {
   *      this.event.on(eventName, callback);
   *    }
   * 
   * => But when Eventing funtion signature change,
   * also need modify this. and other reson is also we need to call like this:
   *
   *    user.sync.save();
   *    user.event.on(); 
   * 
   * So using `Getter accessors` 
   * 
   */
  get on() {
    return this.event.on;
  }

  get trigger() {
    return this.event.trigger;
  }
  
  get get() {
    // console.log(user.get("name"));
    // error ! root cause: `this`
    // return this.attributes.get;

    return this.attributes.get.bind(this.attributes);
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.event.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');

    if (typeof id !== "number") {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      })
  }
}