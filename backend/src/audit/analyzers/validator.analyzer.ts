import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

export interface AnalyzerResult {
    score: number;
    issues: string[];
    goodat?: string[];
    recommendations: string[];
    [key: string]: any;
}
@Injectable()
export class ValidatorAnalyzer {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async validate(
        analyzerName: string,
        content: string,
        analyzerResult: AnalyzerResult,
        keyword?: string
    ) {
        console.log(`\n========================`);
        console.log(`🔍 VALIDATING ANALYZER: ${analyzerName}`);
        console.log(`➡️ Raw Analyzer Result:`, analyzerResult);
        console.log(`========================\n`);

        const prompt = `
You are an expert content analysis validator.

You are given:
Analyzer: ${analyzerName}
Content: """${content}"""
${keyword ? `Keyword: "${keyword}"` : ''}
Analyzer Result: ${JSON.stringify(analyzerResult)}

Task:
1. Validate the analyzer result.
2. Adjust inconsistencies (if any).
3. Return clean corrected JSON ONLY.
`;

        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0,
            });

            const raw = response.choices[0].message.content ?? '{}';
            const cleanedJSON = raw.replace(/```json|```/g, '').trim();

            console.log(`🧠 Validator Raw Response:`, raw);

            let parsed: AnalyzerResult;

            try {
                parsed = JSON.parse(cleanedJSON);
            } catch (e) {
                console.log(`❌ JSON Parse Error in Validator for ${analyzerName}`);
                return {
                    ...analyzerResult,
                    issues: [
                        ...(analyzerResult.issues || []),
                        `Validator returned invalid JSON.`,
                    ],
                };
            }

            // 🆚 --- BEFORE / AFTER COMPARISON ---
            console.log(`\n📊 BEFORE–AFTER COMPARISON FOR: ${analyzerName}`);

            const before = analyzerResult;
            const after = parsed;

            function logDifference(label: string, a: any, b: any) {
                if (JSON.stringify(a) === JSON.stringify(b)) {
                    console.log(`✔️ ${label}: No Change`);
                } else {
                    console.log(`❗ ${label} Changed`);
                    console.log(`   Before:`, a);
                    console.log(`   After:`, b);
                }
            }

            logDifference("Score", before.score, after.score);
            logDifference("Issues", before.issues, after.issues);
            logDifference("GoodAt", before.goodat, after.goodat);
            logDifference("Recommendations", before.recommendations, after.recommendations);

            console.log(`============================\n`);

            console.log(`✅ VALIDATED (${analyzerName}) RESULT:`, parsed);

            return parsed;
        } catch (error) {
            console.error(`❌ Validator Error (${analyzerName}):`, error);

            return {
                ...analyzerResult,
                issues: [
                    ...(analyzerResult.issues || []),
                    'Validation failed or invalid JSON from validator.',
                ],
            };
        }
    }
}
