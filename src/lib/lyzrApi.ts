
const API_KEY = 'sk-default-H0RDPuvT95RpWUepisEbn0NVZEs0hBEf'; // Note: Storing API keys client-side is not recommended for production.
const API_URL = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';

const agents = [
  { agent_id: "6846d65762d8a0cca7618622", session_id: "6846d65762d8a0cca7618622-drg9hreicli" },
  { agent_id: "684c1a1de5203d8a7b64cd82", session_id: "684c1a1de5203d8a7b64cd82-wrhuma9tsaa" },
  { agent_id: "68481c3db67a5a754564ec0b", session_id: "68481c3db67a5a754564ec0b-guqvkw83cjo" },
  { agent_id: "684816b0b67a5a754564eb0d", session_id: "684816b0b67a5a754564eb0d-1sy8dkb59qp" },
];

interface Answers {
  [key: string]: string;
}

const callAgent = async (agent: { agent_id: string, session_id: string }, message: string) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({
      user_id: "katewamukul@gmail.com", // As per instructions
      agent_id: agent.agent_id,
      session_id: agent.session_id,
      message: message,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`API Error for agent ${agent.agent_id}:`, errorBody);
    throw new Error(`Failed to fetch from agent ${agent.agent_id}. Status: ${response.status}`);
  }
  
  const data = await response.json();
  // The API seems to return a JSON string inside the 'message' field.
  try {
    return JSON.parse(data.message);
  } catch (e) {
    console.error("Failed to parse agent response message:", data.message);
    return { error: "Invalid JSON response from agent", original_message: data.message };
  }
};

export const generateBlueprint = async (answers: Answers) => {
  const formattedMessage = Object.entries(answers)
    .map(([key, value]) => `${key}:\n${value}`)
    .join('\n\n');

  try {
    const results = await Promise.all(agents.map(agent => callAgent(agent, formattedMessage)));
    // Combine results from all agents into a single object
    const combinedBlueprint = results.reduce((acc, current) => ({ ...acc, ...current }), {});
    return combinedBlueprint;
  } catch (error) {
    console.error("Error generating blueprint:", error);
    throw error;
  }
};
