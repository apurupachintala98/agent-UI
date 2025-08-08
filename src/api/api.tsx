export const sendToAgent = async (user_ques: string, session_id: string) => {
  const res = await fetch(`${VITE_API_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify({ user_ques, session_id }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API error response:", errorText);
    throw new Error("API error");
  }

  const data = await res.json();
  return data; 
};
