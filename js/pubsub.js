const PubSub = (() => {
  const events = {};

  const subscribe = (event, fn) => {
    if (!events[event]) {
      events[event] = [];
    }
    events[event].push(fn);
  };

  const publish = (event, data) => {
    if (events[event]) {
      events[event].forEach((fn) => fn(data));
    }
  };

  return { subscribe, publish };
})();
