import type { ActionWithPayload } from './ActionWithPayload';

export type Reducer<T, Y> = (state: T, action: ActionWithPayload<Y>) => T;
