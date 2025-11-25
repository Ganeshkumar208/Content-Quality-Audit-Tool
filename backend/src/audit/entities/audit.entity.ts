import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit_reports')
export class Audit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('longtext')
    content: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    keyword: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    url?: string;

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
