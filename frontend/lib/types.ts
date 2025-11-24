export interface ScoreResult {
  score: number
  issues?: string[]
  recommendations?: string[]
  predictedRanking?: string
}

export interface AuditData {
  content: string
  keyword: string
  seo: ScoreResult
  serp: ScoreResult & { predictedRanking?: string }
  aeo: ScoreResult
  humanization: ScoreResult
  differentiation: ScoreResult
  readability: ScoreResult
  grammar: ScoreResult
  clarity: ScoreResult
  structure: ScoreResult
  overallScore: number
  [key: string]: any
}
