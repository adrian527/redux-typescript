// Import helpers.
import { test } from '@/hello';
import StoreProvider from './providers/store/store';
import type { Reducer } from './helpers/store/Reducer';
import DogsProvider from './providers/dogs/dogs';
/**
 * Will find #root element and set HTML to "Hello World!".
 */
function editDom(): void {
  const root = document.getElementById('root'); // Get root element.
  if (root) {
    root.innerHTML = `<p>${test}</p>`; // Set html of the root element.
    const dogs = new DogsProvider();
    const store = new StoreProvider();
    store.addReducer({
      name: 'dogs',
      reducer: dogs.reducer as Reducer<unknown, unknown>,
    });

    store.createStore();
    store.subscribe();

    dogs.fetchDogsAction(store.getStore());
  }
}

editDom(); // Call editDom.
