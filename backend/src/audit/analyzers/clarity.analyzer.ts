// src/audit/analyzers/clarity.analyzer.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ClarityAnalyzer {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async analyze(content: string) {
        const prompt = `
You are an expert at clarity analysis.

Check the content for:
- Ambiguous sentences
- Overly complex ideas
- Missing explanations
- Poorly defined terms
- Lack of examples
- Confusing sentence structure
- Excessive fluff

Return JSON ONLY in this strict format:
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

        // return JSON.parse(response.choices[0].message.content);
        const raw = response.choices[0].message.content ?? '{}';
        const cleaned = raw.replace(/```json|```/g, '').trim();

        try {
            return JSON.parse(cleaned);
        } catch {
            return {
                score: 0,
                issues: ['Invalid JSON returned from LLM'],
                recommendations: ['Regenerate the result']
            };
        }
    }
}
