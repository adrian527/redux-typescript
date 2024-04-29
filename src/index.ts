// Import helpers.
import StoreProvider from './providers/store/store';
import type { Reducer } from './helpers/store/Reducer';
import DogsProvider from './providers/dogs/dogs';
import SubscriberList from './providers/store/subscriberList';
import Dogs from './componenets/dogs/Dogs';
import Header from './componenets/dogs/Header';
import Buttons from './componenets/dogs/Buttons';
import type { Store } from './helpers/store/Store';
/**
 * Will find #root element and set HTML to "Hello World!".
 */
function editDom(): void {
  const root = document.getElementById('root'); // Get root element.
  if (root) {
    const dogs = new DogsProvider();
    const store = new StoreProvider();
    const subscribersList = new SubscriberList();
    const dogsPresentation = new Dogs();
    const dogsHeader = new Header();

    store.addReducer({
      name: 'dogs',
      reducer: dogs.reducer as Reducer<unknown, unknown>,
    });
    store.addSubscribersList(subscribersList);

    store.createStore();
    store.subscribe();

    subscribersList.addSubscriber(dogsPresentation);
    subscribersList.addSubscriber(dogsHeader);

    dogs.fetchDogsAction(store.getStore(), 6);
    if (store.getStore()) {
      new Buttons(store.getStore() as Store, dogs);
    }
  }
}

editDom(); // Call editDom.
