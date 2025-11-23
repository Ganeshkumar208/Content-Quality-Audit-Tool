// src/audit/analyzers/structure.analyzer.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class StructureAnalyzer {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async analyze(content: string) {
        const prompt = `
You are a content structure expert. Analyze the STRUCTURE of the following blog/article.

Check for:
- Logical flow
- Proper use of headers (H1, H2, H3)
- Section order and transitions
- Paragraph structure
- Organization quality
- Presence of intro + body + conclusion

Return JSON strictly in this format:
{
  "score": number (0-100),
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
