// src/audit/analyzers/grammar.analyzer.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class GrammarAnalyzer {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async analyze(content: string) {
        const prompt = `
You are an expert English grammar checker.

Check the text for:
- Grammar mistakes
- Spelling errors
- Punctuation issues
- Incorrect tense usage
- Repeated phrases
- Sentence correctness

Score from 0–100, where 100 means perfect grammar and 0 means extremely poor grammar.

Return JSON ONLY in this strict format:
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
            temperature: 0.2,
        });

        const raw = response.choices[0].message.content ?? '{}';
        const cleaned = raw.replace(/```json|```/g, '').trim();

        try {
            const parsed = JSON.parse(cleaned);
            return {
                ...parsed,
                recommendations: parsed.recommendations?.slice(0, 3) ?? []
            };
        } catch {
            return {
                score: 0,
                issues: ['Invalid JSON returned from LLM'],
                recommendations: ['Regenerate the result']
            };
        }
    }
}
