// import { Injectable } from '@nestjs/common';
// import { SeoAnalyzer } from './analyzers/seo.analyzer';
// import { SerpAnalyzer } from './analyzers/serp.analyzer';
// import { AeoAnalyzer } from './analyzers/aeo.analyzer';
// import { HumanizationAnalyzer } from './analyzers/humanization.analyzer';
// import { DifferentiationAnalyzer } from './analyzers/differentiation.analyzer';
// import { ReadabilityAnalyzer } from './analyzers/readability.analyzer';
// import { GrammarAnalyzer } from './analyzers/grammar.analyzer';
// import { ClarityAnalyzer } from './analyzers/clarity.analyzer';
// import { StructureAnalyzer } from './analyzers/structure.analyzer';
// import { Repository } from 'typeorm';
// import { Audit } from './entities/audit.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { PlaywrightScraper } from './scraper/url-scraper';
// import { ValidatorAnalyzer } from './analyzers/validator.analyzer';

// @Injectable()
// export class AuditService {
//     constructor(
//         @InjectRepository(Audit)
//         private auditRepo: Repository<Audit>,
//         private readonly seoAnalyzer: SeoAnalyzer,
//         private readonly serpAnalyzer: SerpAnalyzer,
//         private readonly aeoAnalyzer: AeoAnalyzer,
//         private readonly humanizationAnalyzer: HumanizationAnalyzer,
//         private readonly differentiationAnalyzer: DifferentiationAnalyzer,
//         private readonly readabilityAnalyzer: ReadabilityAnalyzer,
//         private readonly grammarAnalyzer: GrammarAnalyzer,
//         private readonly clarityAnalyzer: ClarityAnalyzer,
//         private readonly structureAnalyzer: StructureAnalyzer,
//         private readonly validator: ValidatorAnalyzer,
//         private readonly scraper: PlaywrightScraper
//     ) { }

//     async analyze(input: { content?: string; url?: string; keyword?: string }) {
//         let { content, url, keyword = '' } = input;

//         // ✅ If URL provided → scrape
//         if (url && !content) {
//             const scraped = await this.scraper.scrape(url);

//             content = `
//                 ${scraped.title}

//                 ${scraped.paragraphs.join('\n\n')}
//                 `;
//         }

//         // ✅ Validate content exists
//         if (!content || !content.trim()) {
//             throw new Error("No content found to analyze.");
//         }

//         const [
//             seo,
//             serp,
//             aeo,
//             humanization,
//             differentiation,
//             readability,
//             grammar,
//             clarity,
//             structure,
//         ] = await Promise.all([
//             this.seoAnalyzer.analyze(content, keyword),
//             this.serpAnalyzer.analyze(content, keyword),
//             this.aeoAnalyzer.analyze(content),
//             this.humanizationAnalyzer.analyze(content),
//             this.differentiationAnalyzer.analyze(content, keyword),
//             this.readabilityAnalyzer.analyze(content),
//             this.grammarAnalyzer.analyze(content),
//             this.clarityAnalyzer.analyze(content),
//             this.structureAnalyzer.analyze(content),
//         ]);

//         const overallScore =
//             (seo.score +
//                 serp.score +
//                 aeo.score +
//                 humanization.score +
//                 differentiation.score +
//                 readability.score +
//                 grammar.score +
//                 clarity.score +
//                 structure.score) / 9;

//         const audit = this.auditRepo.create({
//             url,
//             content,
//             keyword,
//             seo,
//             serp,
//             aeo,
//             humanization,
//             differentiation,
//             readability,
//             grammar,
//             clarity,
//             structure,
//             overallScore,
//         });

//         return this.auditRepo.save(audit);
//     }
// }











import { Injectable } from '@nestjs/common';
import { SeoAnalyzer } from './analyzers/seo.analyzer';
import { SerpAnalyzer } from './analyzers/serp.analyzer';
import { AeoAnalyzer } from './analyzers/aeo.analyzer';
import { HumanizationAnalyzer } from './analyzers/humanization.analyzer';
import { DifferentiationAnalyzer } from './analyzers/differentiation.analyzer';
import { ReadabilityAnalyzer } from './analyzers/readability.analyzer';
import { GrammarAnalyzer } from './analyzers/grammar.analyzer';
import { ClarityAnalyzer } from './analyzers/clarity.analyzer';
import { StructureAnalyzer } from './analyzers/structure.analyzer';
import { ValidatorAnalyzer } from './analyzers/validator.analyzer';
import { Repository } from 'typeorm';
import { Audit } from './entities/audit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaywrightScraper } from './scraper/url-scraper';

@Injectable()
export class AuditService {
    constructor(
        @InjectRepository(Audit)
        private auditRepo: Repository<Audit>,
        private readonly seoAnalyzer: SeoAnalyzer,
        private readonly serpAnalyzer: SerpAnalyzer,
        private readonly aeoAnalyzer: AeoAnalyzer,
        private readonly humanizationAnalyzer: HumanizationAnalyzer,
        private readonly differentiationAnalyzer: DifferentiationAnalyzer,
        private readonly readabilityAnalyzer: ReadabilityAnalyzer,
        private readonly grammarAnalyzer: GrammarAnalyzer,
        private readonly clarityAnalyzer: ClarityAnalyzer,
        private readonly structureAnalyzer: StructureAnalyzer,
        private readonly validator: ValidatorAnalyzer,
        private readonly scraper: PlaywrightScraper
    ) { }

    async analyze(input: { content?: string; url?: string; keyword?: string }) {
        let { content, url, keyword = '' } = input;

        // ✅ Scrape content if URL provided
        if (url && !content) {
            const scraped = await this.scraper.scrape(url);
            content = `
            ${scraped.title}

            ${scraped.paragraphs.join('\n\n')}
            `;
        }

        // ✅ Validate content exists
        if (!content || !content.trim()) {
            throw new Error("No content found to analyze.");
        }

        // Run all analyzers in parallel
        const [
            seoRaw,
            serpRaw,
            aeoRaw,
            humanizationRaw,
            differentiationRaw,
            readabilityRaw,
            grammarRaw,
            clarityRaw,
            structureRaw,
        ] = await Promise.all([
            this.seoAnalyzer.analyze(content, keyword),
            this.serpAnalyzer.analyze(content, keyword),
            this.aeoAnalyzer.analyze(content),
            this.humanizationAnalyzer.analyze(content),
            this.differentiationAnalyzer.analyze(content, keyword),
            this.readabilityAnalyzer.analyze(content),
            this.grammarAnalyzer.analyze(content),
            this.clarityAnalyzer.analyze(content),
            this.structureAnalyzer.analyze(content),
        ]);

        // ✅ Validate each analyzer's result
        const [
            seo,
            serp,
            aeo,
            humanization,
            differentiation,
            readability,
            grammar,
            clarity,
            structure,
        ] = await Promise.all([
            this.validator.validate('SEO', content, seoRaw),
            this.validator.validate('SERP', content, serpRaw),
            this.validator.validate('AEO', content, aeoRaw),
            this.validator.validate('Humanization', content, humanizationRaw),
            this.validator.validate('Differentiation', content, differentiationRaw),
            this.validator.validate('Readability', content, readabilityRaw),
            this.validator.validate('Grammar', content, grammarRaw),
            this.validator.validate('Clarity', content, clarityRaw),
            this.validator.validate('Structure', content, structureRaw),
        ]);

        const overallScore = Number(
            (
                (seo.score +
                    serp.score +
                    aeo.score +
                    humanization.score +
                    differentiation.score +
                    readability.score +
                    grammar.score +
                    clarity.score +
                    structure.score) /
                9
            ).toFixed(2)
        );

        const audit = this.auditRepo.create({
            url,
            content,
            keyword,
            seo,
            serp,
            aeo,
            humanization,
            differentiation,
            readability,
            grammar,
            clarity,
            structure,
            overallScore,
        });

        return this.auditRepo.save(audit);
    }
}
