export class Attributes<T extends object> {
  constructor(public data: T) {}

  get<K extends keyof T>(key: K): T[K] { // instead of => number | string | boolean 
    return this.data[key];
  }

  // arrow function
  // get = <K extends keyof T>(key: K): T[K] => { // instead of => number | string | boolean 
  //   return this.data[key];
  // }

  set(update: T): void {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}

