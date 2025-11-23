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
import { Repository } from 'typeorm';
import { Audit } from './entities/audit.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

    ) { }

    async analyzeContent(content: string, keyword: string = '') {
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

        const overallScore =
            (seo.score +
                serp.score +
                aeo.score +
                humanization.score +
                differentiation.score +
                readability.score +
                grammar.score +
                clarity.score +
                structure.score) /
            9;


        const audit = this.auditRepo.create({
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
        })

        const savedAudit = this.auditRepo.save(audit)
        return savedAudit;
        // return {
        //     seo,
        //     serp,
        //     aeo,
        //     humanization,
        //     differentiation,
        //     readability,
        //     grammar,
        //     clarity,
        //     structure,
        //     overallScore: Math.round(overallScore),
        // };
    }
}
