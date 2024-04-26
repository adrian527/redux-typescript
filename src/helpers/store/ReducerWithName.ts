import type { Reducer } from './Reducer';

export interface ReducerWithName<T, Y> {
  name: string;
  reducer: Reducer<T, Y>;
}
