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
    
    // Combine results from all agents. Some might be JSON, others plain text.
    const combinedBlueprint = results.reduce((acc, current, index) => {
      try {
        const parsed = JSON.parse(current);
        // If the parsed content is a JSON object, merge it into the blueprint.
        if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
          return { ...acc, ...parsed };
        }
        // Otherwise, add it with a generic key.
        return { ...acc, [`agent_response_${index}`]: parsed };
      } catch (e) {
        // If parsing fails, it's plain text. Add it with a generic key.
        return { ...acc, [`agent_response_${index}`]: current };
      }
    }, {});

    return combinedBlueprint;
  } catch (error) {
    console.error("Error generating blueprint:", error);
    throw error;
  }
};
