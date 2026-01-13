import { useQuery } from "@tanstack/react-query";
import { getReportById } from "../api/api";

export default function useProjectReports(projectId, enabled = !!projectId) {
  return useQuery({
    enabled,
    queryKey: ["projectReports", projectId],
    queryFn: () => getReportById(projectId),
  });
}
