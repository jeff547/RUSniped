import { backendUrl } from "./backend";

type OpenSectionsResponse = {
  sections: string[];
  updatedAt: string | null;
};

export async function fetchOpenSections(): Promise<OpenSectionsResponse> {
  const response = await fetch(backendUrl("/open-sections"));

  if (!response.ok) {
    throw new Error(`Failed to fetch open sections: ${response.status}`);
  }

  return response.json() as Promise<OpenSectionsResponse>;
}
