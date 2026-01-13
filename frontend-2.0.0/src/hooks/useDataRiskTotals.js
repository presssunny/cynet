// hooks/useDataRiskTotals.js
import { useQuery } from "@tanstack/react-query";
import { getDataRiskTotals } from "../api/ngds";

export default function useDataRiskTotals(dataKey) {
  return useQuery({
    queryKey: ["dataRiskTotals", dataKey],
    queryFn: getDataRiskTotals,
    staleTime: 5 * 60 * 1000,
  });
}
