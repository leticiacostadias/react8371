function createStore (reducer) {
  const subscribers = [];
  let store;

  function subscribe(listener) {
    subscribers.push(listener);
  }

  function dispatch(action) {
    // if (action.call()) {
    //   return action(dispatch);
    // }
    // <===========> REDUX-THUNK <===========>

    store = reducer(store, action);
    for (const listener of subscribers) {
      listener();
    }
    // subscribers.forEach(listener => listener());
  }
}