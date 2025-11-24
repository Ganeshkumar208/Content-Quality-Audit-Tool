"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"

interface ScoreCardProps {
  label: string
  score: number
  icon: string
  issues: string[]
  recommendations: string[]
}

export default function ScoreCard({ label, score, icon, issues, recommendations }: ScoreCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const scorePercentage = (score / 100) * 100

  const getScoreStatus = (score: number) => {
    if (score >= 85)
      return {
        status: "Excellent",
        color: "from-emerald-500 to-teal-600",
        bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
        textColor: "text-emerald-700 dark:text-emerald-300",
        borderColor: "border-emerald-200 dark:border-emerald-800/50",
      }
    if (score >= 70)
      return {
        status: "Very Good",
        color: "from-blue-500 to-cyan-600",
        bgColor: "bg-blue-50 dark:bg-blue-950/40",
        textColor: "text-blue-700 dark:text-blue-300",
        borderColor: "border-blue-200 dark:border-blue-800/50",
      }
    if (score >= 50)
      return {
        status: "Good",
        color: "from-yellow-500 to-orange-600",
        bgColor: "bg-yellow-50 dark:bg-yellow-950/40",
        textColor: "text-yellow-700 dark:text-yellow-300",
        borderColor: "border-yellow-200 dark:border-yellow-800/50",
      }
    if (score >= 30)
      return {
        status: "Fair",
        color: "from-orange-500 to-red-600",
        bgColor: "bg-orange-50 dark:bg-orange-950/40",
        textColor: "text-orange-700 dark:text-orange-300",
        borderColor: "border-orange-200 dark:border-orange-800/50",
      }
    return {
      status: "Needs Improvement",
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50 dark:bg-red-950/40",
      textColor: "text-red-700 dark:text-red-300",
      borderColor: "border-red-200 dark:border-red-800/50",
    }
  }

  const { status, color, bgColor, textColor, borderColor } = getScoreStatus(score)

  return (
    <Card
      onClick={() => setIsOpen(!isOpen)}
      className={`border shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden bg-card hover:border-primary/40 group ${borderColor}`}
    >
      <div
        className={`h-2 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
      />

      <div className="p-6">
        {/* Header with Icon and Label */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3 flex-1">
            <div className={`${bgColor} p-2.5 rounded-lg text-xl flex items-center justify-center w-10 h-10`}>
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm leading-tight">{label}</h3>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Score Display Section */}
        <div className="mb-5">
          <div className="flex items-end justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-bold text-foreground">{score}</span>
              <span className={`text-xs font-semibold mt-1.5 ${textColor}`}>{status}</span>
            </div>
            {score >= 70 && <TrendingUp className={`w-5 h-5 ${textColor}`} />}
          </div>

          <div className="relative w-full bg-border rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className={`h-full bg-gradient-to-r ${color} transition-all duration-700 ease-out shadow-lg`}
              style={{ width: `${scorePercentage}%` }}
            />
            <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3 py-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{issues.length}</p>
            <p className="text-xs text-muted-foreground">Issues</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{recommendations.length}</p>
            <p className="text-xs text-muted-foreground">Suggestions</p>
          </div>
        </div>

        {isOpen && (
          <div className="pt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Issues Section */}
            {issues.length > 0 && (
              <div className="bg-muted/40 rounded-lg p-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  Issues Found
                </h4>
                <ul className="space-y-2.5">
                  {issues.slice(0, 3).map((issue, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground leading-relaxed flex gap-3">
                      <span className="text-red-500 dark:text-red-400 flex-shrink-0 font-bold">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                  {issues.length > 3 && (
                    <li className="text-xs text-muted-foreground/60 italic pt-1">
                      +{issues.length - 3} more {issues.length - 3 === 1 ? "issue" : "issues"}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Top Recommendations
                </h4>
                <ul className="space-y-2.5">
                  {recommendations.slice(0, 3).map((rec, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground leading-relaxed flex gap-3">
                      <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 font-bold">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                  {recommendations.length > 3 && (
                    <li className="text-xs text-muted-foreground/60 italic pt-1">
                      +{recommendations.length - 3} more{" "}
                      {recommendations.length - 3 === 1 ? "suggestion" : "suggestions"}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
