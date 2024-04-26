// Import helpers.
import { test } from '@/hello';
import StoreProvider from './providers/store/store';
import type { Reducer } from './helpers/store/Reducer';
import DogsProvider from './providers/dogs/dogs';
import SubscriberList from './providers/store/subscriberList';
import Dogs from './componenets/Dogs';
/**
 * Will find #root element and set HTML to "Hello World!".
 */
function editDom(): void {
  const root = document.getElementById('root'); // Get root element.
  if (root) {
    root.innerHTML = `<p>${test}</p>`; // Set html of the root element.
    const dogs = new DogsProvider();
    const store = new StoreProvider();
    const subscribersList = new SubscriberList();
    const dogsPresentation = new Dogs();

    store.addReducer({
      name: 'dogs',
      reducer: dogs.reducer as Reducer<unknown, unknown>,
    });
    store.addSubscribersList(subscribersList);

    store.createStore();
    store.subscribe();

    subscribersList.addSubscriber(dogsPresentation);

    dogs.fetchDogsAction(store.getStore());
  }
}

editDom(); // Call editDom.
