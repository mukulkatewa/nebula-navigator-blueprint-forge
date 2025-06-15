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
  // The API can return a JSON string or plain text, so we return the raw message.
  return data.message;
};

export const generateBlueprint = async (answers: Answers) => {
  const formattedMessage = Object.entries(answers)
    .map(([key, value]) => `${key}:\n${value}`)
    .join('\n\n');

  try {
    const results = await Promise.all(agents.map(agent => callAgent(agent, formattedMessage)));
    
    // Process each result, but keep them as separate items in an array.
    const processedResults = results.map((current, index) => {
      try {
        const parsed = JSON.parse(current);
        // Check if it's a non-null, non-array object with at least one key
        if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed) && Object.keys(parsed).length > 0) {
          const firstKey = Object.keys(parsed)[0];
          // Return an object representing the section
          return { id: firstKey, title: firstKey.replace(/_/g, ' '), content: parsed[firstKey] };
        }
        // If not a valid JSON object, treat as plain text.
        return { id: `agent_response_${index}`, title: `Agent Response ${index + 1}`, content: current };
      } catch (e) {
        // If parsing fails, it's plain text.
        return { id: `agent_response_${index}`, title: `Agent Response ${index + 1}`, content: current };
      }
    });

    return processedResults;
  } catch (error) {
    console.error("Error generating blueprint:", error);
    throw error;
  }
};
