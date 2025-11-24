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
  "goodat":[string],
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
            const parsed = JSON.parse(cleaned);
            return {
                ...parsed,
                recommendations: parsed.recommendations?.slice(0, 3) ?? []
            };
        } catch {
            return {
                score: 0,
                issues: ["Invalid JSON"],
                recommendations: ["Retry"],
            };
        }
    }
}
