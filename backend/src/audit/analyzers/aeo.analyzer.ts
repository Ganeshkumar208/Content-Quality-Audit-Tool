import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AeoAnalyzer {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async analyze(content: string) {
        const prompt = `
Analyze AEO (AI Engine Optimization).

Check:
- Structured formatting (FAQ, How-to)
- Lists and bullets
- Presence of citations
- Schema suitability
- AI-friendly clarity

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
            temperature: 0.1,
        });

        console.log('Response from the AEO Analyser', response)

        const raw = response.choices[0].message.content ?? "{}";
        const cleaned = raw.replace(/```json|```/g, "").trim();

        try {
            return JSON.parse(cleaned);
        } catch {
            return {
                score: 0,
                issues: ["Invalid JSON"],
                recommendations: ["Retry"],
            };
        }
    }
}
