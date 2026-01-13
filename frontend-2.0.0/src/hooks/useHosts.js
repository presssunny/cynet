// hooks/useHosts.js
import { useQuery } from "@tanstack/react-query";
import { getHostsList } from "../api/morphisec";

export default function useHosts(dataKey) {
  return useQuery({
    queryKey: ["hosts", dataKey],
    queryFn: getHostsList,
  });
}
