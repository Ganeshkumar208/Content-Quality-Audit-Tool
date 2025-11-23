import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class HumanizationAnalyzer {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async analyze(content: string) {
        const prompt = `
Analyze how HUMAN this content sounds.

Check:
- Sentence variety
- Natural tonal flow
- Emotional depth
- Avoidance of AI-pattern repetition
- Conversational elements

Return JSON ONLY:
{
  "score": number,
  "issues": [string],
  "recommendations": [string]
}

CONTENT:
${content}
`;

        const response = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
        });

        const raw = response.choices[0].message.content ?? "{}";
        const cleaned = raw.replace(/```json|```/g, "").trim();

        try {
            return JSON.parse(cleaned);
        } catch {
            return {
                score: 0,
                issues: ["Invalid JSON"],
                recommendations: ["Adjust prompt"],
            };
        }
    }
}
