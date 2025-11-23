// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity('audit')
// export class Audit {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ type: 'text' })
//     inputContent: string;

//     @Column({ type: 'float', nullable: true })
//     grammarScore: number;

//     @Column({ type: 'text', nullable: true })
//     grammarIssues: string;

//     @Column({ type: 'text', nullable: true })
//     grammarSuggestions: string;

//     @Column({ type: 'float', nullable: true })
//     readabilityScore: number;

//     @Column({ type: 'text', nullable: true })
//     readabilityIssues: string;

//     @Column({ type: 'text', nullable: true })
//     readabilitySuggestions: string;

//     @Column({ type: 'float', nullable: true })
//     clarityScore: number;

//     @Column({ type: 'text', nullable: true })
//     clarityIssues: string;

//     @Column({ type: 'text', nullable: true })
//     claritySuggestions: string;

//     @Column({ type: 'float', nullable: true })
//     structureScore: number;

//     @Column({ type: 'text', nullable: true })
//     structureIssues: string;

//     @Column({ type: 'text', nullable: true })
//     structureSuggestions: string;

//     @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//     createdAt: Date;
// }















// src/entities/audit.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit_reports')
export class Audit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('longtext')
    content: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    keyword: string;

    @Column({ type: 'json' })
    seo: any;

    @Column({ type: 'json' })
    serp: any;

    @Column({ type: 'json' })
    aeo: any;

    @Column({ type: 'json' })
    humanization: any;

    @Column({ type: 'json' })
    differentiation: any;

    @Column({ type: 'json' })
    readability: any;

    @Column({ type: 'json' })
    grammar: any;

    @Column({ type: 'json' })
    clarity: any;

    @Column({ type: 'json' })
    structure: any;

    @Column({ type: 'int' })
    overallScore: number;

    @CreateDateColumn()
    createdAt: Date;
}

