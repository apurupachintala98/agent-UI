const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API Base URL:", API_BASE_URL);

export const sendToAgent = async (user_ques: string, session_id: string) => {
  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify({ user_ques, session_id }),
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

  return result;
};
