// hooks/useProtectors.js
import { useQuery } from "@tanstack/react-query";
import { getProtectorsList } from "../api/morphisec";

export default function useProtectors(dataKey) {
  return useQuery({
    queryKey: ["protectors", dataKey],
    queryFn: getProtectorsList,
  });
}
