import { useEffect } from "react";
import { fetchOpenSections } from "../api/openSections";
import { backendUrl } from "../api/backend";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useOpenSections() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const events = new EventSource(backendUrl("/events"));
    const invalidateOpenSections = () => {
      void queryClient.invalidateQueries({ queryKey: ["openSections"] });
    };

    events.addEventListener("connected", invalidateOpenSections);
    events.addEventListener("open-sections-updated", invalidateOpenSections);

    return () => {
      events.close();
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["openSections"],
    queryFn: fetchOpenSections,
  });
}
