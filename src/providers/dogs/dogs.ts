import type { ActionWithPayload } from '@/helpers/store/ActionWithPayload';
import type { Store } from '@/helpers/store/Store';
import axios from 'axios';

interface InitValues {
  dogs: string[];
  loading: boolean;
  error: string;
}

class DogsProvider {
  // constants
  private REQUEST_STARTED = 'REQUEST_STARTED';
  private REQUEST_SUCCESS = 'REQUEST_SUCCESS';
  private REQUEST_FAILED = 'REQUEST_FAILED';

  // initial state
  private initValue: InitValues = {
    dogs: [],
    loading: false,
    error: '',
  };

  constructor() {
    this.fetchPostRequest = this.fetchPostRequest.bind(this);
    this.fetchPostSuccessRequest = this.fetchPostSuccessRequest.bind(this);
    this.fetchPostFailedRequest = this.fetchPostFailedRequest.bind(this);
    this.fetchDogs = this.fetchDogs.bind(this);
    this.fetchDogsAction = this.fetchDogsAction.bind(this);
    this.reducer = this.reducer.bind(this);
  }

  // action creators

  private fetchPostRequest(): { type: string } {
    return {
      type: this.REQUEST_STARTED,
    };
  }

  private fetchPostSuccessRequest(payload: unknown): {
    type: string;
    payload: unknown;
  } {
    return {
      type: this.REQUEST_SUCCESS,
      payload,
    };
  }

  private fetchPostFailedRequest(payload: string): {
    type: string;
    payload: string;
  } {
    return {
      type: this.REQUEST_FAILED,
      payload,
    };
  }

  // action to make a request

  private fetchDogs(): (dispatch: (arg: unknown) => void) => Promise<void> {
    return async (dispatch: (arg: unknown) => void) => {
      try {
        dispatch(this.fetchPostRequest());
        const resp = (
          await axios.get('https://dog.ceo/api/breeds/image/random')
        ).data.message;
        dispatch(this.fetchPostSuccessRequest(resp));
      } catch (err: unknown) {
        dispatch(this.fetchPostFailedRequest((err as Error).message));
      }
    };
  }

  public fetchDogsAction(store: Store | undefined): void {
    if (store) {
      store.dispatch(this.fetchDogs());
    }
  }

  public getDogs(store: Store | undefined): string[] | undefined {
    if (store) {
      const data = store?.getState();
      return (data as { dogs: string[] }).dogs;
    }
  }

  public reducer(
    state = this.initValue,
    action: ActionWithPayload<string[]>,
  ):
    | { dogs: (string | string[])[]; loading: boolean; error: string }
    | { error: string[]; loading: boolean; dogs: never[] } {
    switch (action.type) {
      case this.REQUEST_STARTED:
        return {
          ...state,
          loading: true,
        };
      case this.REQUEST_SUCCESS:
        return {
          ...state,
          dogs: [...state.dogs, action?.payload || ''],
          loading: false,
          error: '',
        };
      case this.REQUEST_FAILED:
        return {
          ...state,
          error: action.payload,
          loading: false,
          dogs: [],
        };
      default:
        return { ...state };
    }
  }
}

export default DogsProvider;
