import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class SeoAnalyzer {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async analyze(content: string, keyword: string = "") {
        const prompt = `
You are an SEO analysis expert. Analyze this content for SEO quality.

Check:
- Keyword density for: "${keyword}"
- Header structure (H1, H2, H3)
- Readability signals
- Meta description presence
- On-page SEO issues

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
                issues: ["Invalid JSON from model"],
                recommendations: ["Retry analysis"],
            };
        }
    }
}
