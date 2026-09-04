const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/soc/api";
const OPEN_URL =
  `${API_BASE_URL}/openSections.json?year=2026&term=7&campus=NB`;

export async function fetchOpenSections(): Promise<string[]> {
  const response = await fetch(OPEN_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch open sections: ${response.status}`);
  }

  const data = await response.json();
  console.log("[openSections] got", data.length, "open");
  return data;
}
