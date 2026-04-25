const OPEN_URL = "/api/openSections.json?year=2026&term=7&campus=NB";

export async function fetchOpenSections(): Promise<string[]> {
  const response = await fetch(OPEN_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch open sections: ${response.status}`);
  }

  const data = await response.json();
  console.log("[openSections] got", data.length, "open");
  return data;
}
