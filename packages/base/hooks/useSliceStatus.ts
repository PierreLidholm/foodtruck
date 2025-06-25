import { useSelector } from "react-redux";
import type { RootState } from "@pierre/core/store";
import type { Status } from "@pierre/core/models";

export function useSliceStatus(sliceName: keyof RootState) {
  const loading = useSelector((state: RootState) => state[sliceName].loading);
  const error = useSelector((state: RootState) => state[sliceName].error);
  const status = useSelector((state: RootState) => state[sliceName].status as Status);

  return { loading, error, status };
}