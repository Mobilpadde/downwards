const events = {};

export default class Events {
  static on(name, fn) {
    if (!events[name]) {
      events[name] = [];
    }

    events[name].push(fn);
  }

  static remove(name, fn) {
    if (!events[name]) {
      return;
    }

    events[name] = events[name].filter((listener) => listener !== fn);
  }

  static emit(name, data) {
    if (!events[name]) {
      return;
    }

    events[name].forEach((cb) => cb(data));
  }
}
