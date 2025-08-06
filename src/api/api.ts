// ADF: This is just a placeholder for backend API interactions.
// Replace or extend as needed when backend endpoints are available.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API Base URL:", API_BASE_URL);

export const sendToAgent = async (user_ques: string) => {
  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    //headers: { "Content-Type": "application/json", "accept": "application/json", "api-key": import.meta.env.VITE_API_KEY },
    headers: { "Content-Type": "application/json", "accept": "application/json" },
    body: JSON.stringify({ user_ques }),
  });
  console.log("API response status:", res.status);
  console.log("API response headers:", res.headers);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("API error response:", errorText);
    throw new Error("API error");
  }

  const data = await res.json();
  const result = data.result as string;

  // Extract YAML code block if present
  const yamlMatch = result.match(/```yaml([\s\S]*?)```/);
  if (yamlMatch) {
    return {
      yaml: yamlMatch[1].trim(),
      rest: result.replace(yamlMatch[0], '').trim()
    };
  }

  return { yaml: null, rest: result };
};