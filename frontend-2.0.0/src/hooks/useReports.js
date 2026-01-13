// hooks/useReports.js
import { useQuery } from "@tanstack/react-query";
import { getReports } from "../api/api";

export default function useReports(dataKey) {
  return useQuery({
    queryKey: ["count", dataKey],
    queryFn: getReports,
  });
}
