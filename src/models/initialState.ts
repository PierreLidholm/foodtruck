export interface InitialState<T> {
  data: T;
  loading: boolean;
  error: boolean;
  status: "idle" | "pending" | "success" | "failed";
}
