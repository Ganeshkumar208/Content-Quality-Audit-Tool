// src/audit/analyzers/readability.analyzer.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ReadabilityAnalyzer {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async analyze(content: string) {
        const prompt = `
You are a readability analysis expert. Your task is to evaluate:

- Ease of reading
- Sentence length variety
- Difficult/uncommon words
- Flesch-Kincaid type readability
- Clarity of explanations
- Skimmability (lists, bullets)
- Short paragraphs

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
