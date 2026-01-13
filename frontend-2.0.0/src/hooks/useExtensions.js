// hooks/useExtensions.js
import { useQuery } from "@tanstack/react-query";
import { getBrowserExtensionsList } from "../api/morphisec";

export default function useExtensions(dataKey) {
  return useQuery({
    queryKey: ["extensions", dataKey],
    queryFn: getBrowserExtensionsList,
  });
}
