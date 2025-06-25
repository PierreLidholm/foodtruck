import type { Status } from "./status";


export interface InitialState<T> {
  data: T;
  loading: boolean;
  error: boolean;
  status: Status;
}
