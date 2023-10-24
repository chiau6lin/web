import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  set(value: T): void;
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}
  
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
    return this.events.on.bind(this.events);
  }

  get trigger() {
    return this.events.trigger.bind(this.events);
  }
  
  get get() {
    // console.log(user.get("name"));
    // error ! root cause: `this`
    // return this.attributes.get;

    return this.attributes.get.bind(this.attributes);
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
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

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      })
  }
}