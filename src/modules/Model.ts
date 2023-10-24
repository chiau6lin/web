interface ModelAttributes<T> {
  set(value: T): void;
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): Promise<T>;
  save(data: T): Promise<T>;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export class Model<T> {
  constructor(
    private modelAttributes: ModelAttributes<T>,
    private events: Events,
    private Sync: Sync<T>
  ) {}  
}