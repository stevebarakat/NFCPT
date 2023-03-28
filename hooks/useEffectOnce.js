import { useEffect } from "react";

export default function useEffectOnce(cb) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cb, []);
}
