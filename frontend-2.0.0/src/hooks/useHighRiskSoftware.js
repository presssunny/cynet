// hooks/useHighRiskSoftware.js
import { useQuery } from "@tanstack/react-query";
import { getHighRiskSoftwareList } from "../api/morphisec";

export default function useHighRiskSoftware(dataKey) {
  return useQuery({
    queryKey: ["highRiskSoftware", dataKey],
    queryFn: getHighRiskSoftwareList,
  });
}
