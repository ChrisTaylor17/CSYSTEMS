import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface MatchRequest {
  userAlias: string;
  interests: string;
  skills: string;
  availableProjects: Array<{
    id: string;
    name: string;
    description: string;
    skillsNeeded: string;
  }>;
}

export interface MatchResponse {
  projectId: string;
  projectName: string;
  reasoning: string;
  suggestedTask: string;
  estimatedReward: number;
}

export async function getAIMatch(request: MatchRequest): Promise<MatchResponse> {
  const prompt = `You are an AI matchmaker for a DAO collaboration platform. 

User Profile:
- Alias: ${request.userAlias}
- Interests: ${request.interests}
- Skills: ${request.skills}

Available Projects:
${request.availableProjects.map(p => `- ${p.name}: ${p.description} (Needs: ${p.skillsNeeded})`).join('\n')}

Task: Match this user with the BEST project based on their interests and skills. Suggest a specific first task they can complete.

Respond in JSON format:
{
  "projectId": "project_id",
  "projectName": "project_name",
  "reasoning": "why this is a good match",
  "suggestedTask": "specific task description",
  "estimatedReward": 100
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  const response = JSON.parse(completion.choices[0].message.content || '{}');
  return response as MatchResponse;
}

export async function verifyTaskCompletion(
  taskDescription: string,
  proofText: string,
  proofImageUrl?: string
): Promise<{ verified: boolean; feedback: string }> {
  const prompt = `You are an AI verifier for a DAO platform.

Task: ${taskDescription}
Proof submitted: ${proofText}
${proofImageUrl ? `Image URL: ${proofImageUrl}` : ''}

Determine if the proof demonstrates task completion. Be reasonable but ensure quality.

Respond in JSON format:
{
  "verified": true/false,
  "feedback": "explanation of your decision"
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  const response = JSON.parse(completion.choices[0].message.content || '{}');
  return response;
}

export async function chatWithAI(
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  userMessage: string
): Promise<string> {
  const messages = [
    {
      role: 'system' as const,
      content: 'You are a helpful AI assistant for a DAO collaboration platform. Help users find projects, complete tasks, and collaborate with others.',
    },
    ...conversationHistory,
    { role: 'user' as const, content: userMessage },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages,
  });

  return completion.choices[0].message.content || '';
}
