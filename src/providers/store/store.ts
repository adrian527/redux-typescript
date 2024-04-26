import type { ReducerWithName } from '@/helpers/store/ReducerWithName';
import type { Store } from '@/helpers/store/Store';
import {
  createStore,
  applyMiddleware,
  combineReducers,
  type Reducer,
} from 'redux';
import { thunk } from 'redux-thunk';

class StoreProvider {
  private store?: Store;
  private reducers: Array<ReducerWithName<unknown, unknown>> = [];

  constructor() {
    this.addReducer = this.addReducer.bind(this);
    this.getCombinedReducers = this.getCombinedReducers.bind(this);
    this.createStore = this.createStore.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.getStore = this.getStore.bind(this);
  }

  public addReducer(reducer: ReducerWithName<unknown, unknown>): void {
    this.reducers.push(reducer);
  }

  private getCombinedReducers(): Reducer<object, never, Partial<object>> {
    const reducers = this.reducers.reduce((reducers, reducerWithName) => {
      return { ...reducers, [reducerWithName.name]: reducerWithName.reducer };
    }, {});

    return combineReducers(reducers);
  }

  public createStore(): void {
    if (!this.store) {
      this.store = createStore(
        this.getCombinedReducers(),
        applyMiddleware(thunk),
      );
    }
  }

  public subscribe(): void {
    if (this.store) {
      this.store.subscribe(() => {
        const data = this?.store?.getState();
        console.log(data);
      });
    }
  }

  public getStore(): Store | undefined {
    return this.store;
  }
}

export default StoreProvider;
