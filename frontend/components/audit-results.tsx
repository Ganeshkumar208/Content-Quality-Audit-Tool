"use client"

import { useRef } from "react"
import { ArrowLeft, TrendingUp, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ScoreCard from "./score-card"
import OverallScore from "./overall-score"
import ChartDimensionScores from "./chart-dimension-scores"
import ChartIssueDistribution from "./chart-issue-distribution"
import ChartPerformanceTrend from "./chart-performance-trend"
import type { AuditData } from "@/lib/types"

interface AuditResultsProps {
  data: AuditData
  onBack: () => void
}

export default function AuditResults({ data, onBack }: AuditResultsProps) {
  const chartsRef = useRef<HTMLDivElement>(null)

  const scrollToCharts = () => {
    chartsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scores = [
    { key: "seo", label: "SEO Score", icon: "📊" },
    { key: "serp", label: "SERP Performance", icon: "🔍" },
    { key: "aeo", label: "AEO Score", icon: "🤖" },
    { key: "humanization", label: "Humanization", icon: "👥" },
    { key: "differentiation", label: "Differentiation", icon: "⭐" },
    { key: "readability", label: "Readability", icon: "📖" },
    { key: "grammar", label: "Grammar", icon: "✓" },
    { key: "clarity", label: "Clarity", icon: "💡" },
    { key: "structure", label: "Structure", icon: "🏗️" },
  ]

  const scoreChartData = scores.map((score) => {
    const scoreData = data[score.key as keyof AuditData] as any
    return {
      name: score.label.split(" ")[0],
      score: scoreData.score,
      fullLabel: score.label,
    }
  })

  const issueDistribution = [
    { name: "SEO", value: data.seo?.issues?.length || 0, fill: "#ef4444" },
    { name: "SERP", value: data.serp?.issues?.length || 0, fill: "#f97316" },
    { name: "AEO", value: data.aeo?.issues?.length || 0, fill: "#eab308" },
    { name: "Human", value: data.humanization?.issues?.length || 0, fill: "#3b82f6" },
    { name: "Clarity", value: data.clarity?.issues?.length || 0, fill: "#8b5cf6" },
  ]

  const performanceTrend = [
    { dimension: "SEO", score: data.seo?.score },
    { dimension: "SERP", score: data.serp?.score },
    { dimension: "AEO", score: data.aeo?.score },
    { dimension: "Human", score: data.humanization?.score },
    { dimension: "Diff", score: data.differentiation?.score },
    { dimension: "Read", score: data.readability?.score },
    { dimension: "Grammar", score: data.grammar?.score },
    { dimension: "Clarity", score: data.clarity?.score },
    { dimension: "Struct", score: data.structure?.score },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const chartVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="bg-background">
      {/* Full Screen Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button - Positioned at top */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <OverallScore score={data.overallScore} onArrowClick={scrollToCharts} />
        </motion.div>
      </section>

      {/* Charts Section - Triggered by scroll */}
      <section
        ref={chartsRef}
        className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Performance Analysis</h2>
            <p className="text-muted-foreground">Deep dive into your content audit metrics</p>
          </motion.div>

          {/* Key Metrics Row */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Primary Keyword Card */}
            <motion.div variants={chartVariants}>
              <Card className="border border-border bg-gradient-to-br from-primary/5 to-transparent p-6 shadow-sm hover:shadow-md transition-all h-full">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Primary Keyword</p>
                  <p className="text-lg sm:text-xl font-semibold text-foreground line-clamp-2">{data.keyword}</p>
                </div>
              </Card>
            </motion.div>

            {/* SERP Prediction */}
            {data.serp?.predictedRanking && (
              <motion.div variants={chartVariants}>
                <Card className="border border-border bg-gradient-to-br from-accent/5 to-transparent p-6 shadow-sm hover:shadow-md transition-all h-full">
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      SERP Prediction
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-foreground">{data.serp.predictedRanking}</p>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Content Status */}
            <motion.div variants={chartVariants}>
              <Card className="border border-border bg-gradient-to-br from-emerald-500/5 to-transparent p-6 shadow-sm hover:shadow-md transition-all h-full">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    {data.overallScore >= 75 ? "Excellent" : data.overallScore >= 50 ? "Good" : "Needs Work"}
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Charts Section */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Dimension Scores Bar Chart */}
              <ChartDimensionScores data={scoreChartData} />
              {/* Issues Distribution Pie Chart */}
              <ChartIssueDistribution data={issueDistribution} />
            </div>

            {/* Full Width Performance Trend */}
            <ChartPerformanceTrend data={performanceTrend} />
          </motion.div>
        </div>
      </section>

      {/* Detailed Scores Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Detailed Scores</h2>
            <p className="text-muted-foreground mb-8">Comprehensive breakdown of each dimension</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {scores.map((score) => {
              const scoreData = data[score.key as keyof AuditData] as any
              return (
                <motion.div key={score.key} variants={chartVariants}>
                  <ScoreCard
                    label={score.label}
                    score={scoreData.score}
                    icon={score.icon}
                    issues={scoreData.issues || []}
                    recommendations={scoreData.recommendations || []}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Lightbulb className="w-8 h-8 text-accent" />
              Key Recommendations
            </h2>
            <p className="text-muted-foreground mb-8">Actionable insights to improve your content</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Critical Issues */}
            <motion.div variants={chartVariants}>
              <Card className="border border-border p-6 shadow-sm hover:shadow-md transition-all h-full">
                <h3 className="text-lg font-semibold text-foreground mb-4">Critical Issues</h3>
                <div className="space-y-3">
                  {data.seo?.issues.slice(0, 3).map((issue, idx) => (
                    <motion.div
                      key={idx}
                      className="flex gap-3 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="text-accent flex-shrink-0">⚠</span>
                      <p className="text-muted-foreground">{issue}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Wins */}
            <motion.div variants={chartVariants}>
              <Card className="border border-border p-6 shadow-sm hover:shadow-md transition-all h-full">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Wins</h3>
                <div className="space-y-3">
                  {data.seo?.recommendations.slice(0, 3).map((rec, idx) => (
                    <motion.div
                      key={idx}
                      className="flex gap-3 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="text-emerald-500 flex-shrink-0">✓</span>
                      <p className="text-muted-foreground">{rec}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer Action */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button
              onClick={onBack}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3"
            >
              Analyze Another Content
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
