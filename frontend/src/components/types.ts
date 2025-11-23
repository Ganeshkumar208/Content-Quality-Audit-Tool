// Analysis data types
export interface AnalysisData {
    type: string;
    content: string;
}

export interface AuditResult {
    overallScore: number;
    seoScore: number;
    serpScore: number;
    aeoScore: number;
    humanizationScore: number;
    differentiationScore: number;
    targetKeyword?: string;
    serpAnalysis?: {
        avgWordCount: string;
        avgTopicCoverage: string;
    };
    issues?: {
        seo: string[];
        serp: string[];
        aeo: string[];
        humanization: string[];
        differentiation: string[];
    };
    recommendations?: {
        seo: string[];
        serp: string[];
        aeo: string[];
        humanization: string[];
        differentiation: string[];
    };
    predictedPerformance?: string;
    contentSummary?: string;
}

// Component prop types
export interface InputFormProps {
    onAnalyze: (analysisData: AnalysisData) => void;
    isLoading: boolean;
}

export interface ScoreMeterProps {
    score: number;
    label: string;
    size?: 'small' | 'medium' | 'large';
}

export interface AuditResultCardProps {
    metric: string;
    score: number;
    issues?: string[];
    recommendations?: string[];
    targetKeyword?: string;
    serpAnalysis?: {
        avgWordCount: string;
        avgTopicCoverage: string;
    };
    predictedPerformance?: string;
}

export interface LocationState {
    auditResult: AuditResult;
}