export interface Store {
  dispatch: (arg: unknown) => void;
  subscribe: (arg: () => void) => void;
  getState: () => unknown;
}
