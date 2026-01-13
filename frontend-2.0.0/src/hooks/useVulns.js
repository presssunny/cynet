// hooks/useVulns.js
import { useQuery } from "@tanstack/react-query";
import { getVulnerabilitiesCveList } from "../api/morphisec";

export default function useVulns(dataKey) {
  return useQuery({
    queryKey: ["vulns", dataKey],
    queryFn: getVulnerabilitiesCveList,
  });
}
