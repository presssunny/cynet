
// hooks/useHighRiskAffectedHosts.js
import { useQuery } from "@tanstack/react-query";
import { getHighRiskSoftwareAffectedHosts } from "../api/morphisec";

// הוספנו dataKey גם כאן כדי לאפס את המידע בעת החלפת חברה כללית
export default function useHighRiskAffectedHosts(productName, executableName, dataKey) {
  return useQuery({
    queryKey: ["highRiskHosts", productName, executableName, dataKey],
    enabled: !!productName && !!executableName,
    queryFn: () =>
      getHighRiskSoftwareAffectedHosts({ productName, executableName }),
    retry: 1,
  });
}
