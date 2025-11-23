import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class SerpAnalyzer {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async analyze(content: string, keyword: string) {
        const prompt = `
You are a SERP performance analyst. Evaluate how well this content would rank.

Check:
- Target keyword: ${keyword}
- Compare with top 10 articles (generic reasoning)
- Word count vs SERP average
- Topic coverage (missing subtopics)
- Use of product comparisons, data, stats, quotes

Return JSON ONLY:
{
  "score": number,
  "issues": [string],
  "recommendations": [string],
  "predictedRanking": "string"
}

CONTENT:
${content}
`;
        const response = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1,
        });

        const raw = response.choices[0].message.content ?? "{}";
        const cleaned = raw.replace(/```json|```/g, "").trim();

        try {
            return JSON.parse(cleaned);
        } catch {
            return {
                score: 0,
                issues: ["Invalid JSON"],
                recommendations: ["Try again"],
                predictedRanking: "Unknown",
            };
        }
    }
}
