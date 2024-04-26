import type { Action } from './Action';

export type ActionWithPayload<T> = Required<Action<T>>;
