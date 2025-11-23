// // src/audit/audit.module.ts
// import { Module } from '@nestjs/common';
// import { AuditController } from './audit.controller';
// import { AuditService } from './audit.service';

// @Module({
//   controllers: [AuditController],
//   providers: [AuditService],
//   exports: [AuditService],
// })
// export class AuditModule { }










// import { Module } from '@nestjs/common';
// import { AuditController } from './audit.controller';
// import { AuditService } from './audit.service';

// import { SeoAnalyzer } from './analyzers/seo.analyzer';
// import { SerpAnalyzer } from './analyzers/serp.analyzer';
// import { AeoAnalyzer } from './analyzers/aeo.analyzer';
// import { HumanizationAnalyzer } from './analyzers/humanization.analyzer';
// import { DifferentiationAnalyzer } from './analyzers/differentiation.analyzer';
// import { ReadabilityAnalyzer } from './analyzers/readability.analyzer';
// import { GrammarAnalyzer } from './analyzers/grammar.analyzer';
// import { ClarityAnalyzer } from './analyzers/clarity.analyzer';
// import { StructureAnalyzer } from './analyzers/structure.analyzer';
// import { Audit } from './entities/audit.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Audit])
//   ],
//   controllers: [AuditController],
//   providers: [
//     AuditService,
//     SeoAnalyzer,
//     SerpAnalyzer,
//     AeoAnalyzer,
//     HumanizationAnalyzer,
//     DifferentiationAnalyzer,
//     ReadabilityAnalyzer,
//     GrammarAnalyzer,
//     ClarityAnalyzer,
//     StructureAnalyzer,
//   ],
// })
// export class AuditModule { }












import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './entities/audit.entity';

import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';

import { SeoAnalyzer } from './analyzers/seo.analyzer';
import { SerpAnalyzer } from './analyzers/serp.analyzer';
import { AeoAnalyzer } from './analyzers/aeo.analyzer';
import { HumanizationAnalyzer } from './analyzers/humanization.analyzer';
import { DifferentiationAnalyzer } from './analyzers/differentiation.analyzer';
import { ReadabilityAnalyzer } from './analyzers/readability.analyzer';
import { GrammarAnalyzer } from './analyzers/grammar.analyzer';
import { ClarityAnalyzer } from './analyzers/clarity.analyzer';
import { StructureAnalyzer } from './analyzers/structure.analyzer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Audit])
  ],
  controllers: [AuditController],
  providers: [
    AuditService,
    SeoAnalyzer,
    SerpAnalyzer,
    AeoAnalyzer,
    HumanizationAnalyzer,
    DifferentiationAnalyzer,
    ReadabilityAnalyzer,
    GrammarAnalyzer,
    ClarityAnalyzer,
    StructureAnalyzer,
  ],
})
export class AuditModule { }
