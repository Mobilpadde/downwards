type Callback = (data: string | null) => void;

type EventsType<K extends string> = { [k in K]: Array<Callback> };

const events: EventsType<string> = {};

export default class Events {
  static on(name: string, fn: Callback) {
    if (!events[name]) {
      events[name] = [];
    }

    events[name].push(fn);
  }

  static remove(name: string, fn: Callback) {
    if (!events[name]) {
      return;
    }

    events[name] = events[name].filter((listener) => listener !== fn);
  }

  static emit(name: string, data: string | null) {
    if (!events[name]) {
      return;
    }

    events[name].forEach((cb) => cb(data));
  }
}
