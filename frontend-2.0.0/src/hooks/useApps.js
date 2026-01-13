import { useQuery } from "@tanstack/react-query";
import { getAppsList } from "../api/morphisec";

export default function useApps(dataKey) {
  return useQuery({
    queryKey: ["apps", dataKey],
    queryFn: getAppsList,
  });
}
