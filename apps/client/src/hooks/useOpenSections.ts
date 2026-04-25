import { fetchOpenSections } from "../api/openSections";
import { useQuery } from "@tanstack/react-query";

export function useOpenSections(pollMs = 15_000) {
  return useQuery({
    queryKey: ["openSections"],
    queryFn: fetchOpenSections,
    refetchInterval: pollMs,
    refetchIntervalInBackground: false,
  });
}
