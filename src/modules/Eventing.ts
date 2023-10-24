type Callback = () => void;

export class Eventing {
  public events: { [key: string]: Callback[] } = {};

  on(eventName: string, callback: Callback): void {
    const callbacks = this.events[eventName] || [];
    this.events[eventName] = callbacks;
  }

  trigger(eventName: string): void {
    const callbacks = this.events[eventName];

    if (!callbacks || callbacks.length === 0) {
      return
    }

    callbacks.forEach(callback => {
      callback();
    })
  }
}