"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, ChevronDown, CheckCircle2 } from "lucide-react"

interface OverallScoreProps {
  score: number
  alerts?: number
  maxScore?: number
  onArrowClick?: () => void
}

export default function OverallScore({ score, alerts = 3, maxScore = 100, onArrowClick }: OverallScoreProps) {
  const gaugeData = [
    { name: "score", value: score },
    { name: "remaining", value: 100 - score },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 71) return "#10b981" // Green
    if (score >= 31) return "#f59e0b" // Orange
    return "#ef4444" // Red
  }

  const getScoreLabel = (score: number) => {
    if (score >= 71) return "Excellent"
    if (score >= 31) return "Good"
    return "Needs Improvement"
  }

  const getAlertConfig = (score: number) => {
    if (score >= 71) {
      return {
        color: "#10b981",
        bgColor: "#ecfdf5",
        icon: CheckCircle2,
        message: "Great performance! Keep Going"
      }
    } else if (score >= 31) {
      return {
        color: "#f59e0b",
        bgColor: "#fffbeb",
        icon: AlertCircle,
        message: "Room for improvement"
      }
    } else {
      return {
        color: "#ef4444",
        bgColor: "#fef2f2",
        icon: AlertCircle,
        message: "Needs immediate attention"
      }
    }
  }

  const roundedScoreNumber = Number(score.toFixed(2))
  const roundedScoreString = score.toFixed(2)
  const alertConfig = getAlertConfig(roundedScoreNumber)
  const AlertIcon = alertConfig.icon

  return (
    <div
      className="w-full flex items-center justify-center py-15 px-15 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, #dee2e6 0%, #adb5bd 100%)"
      }}
    >
      <div className="w-full max-w-2xl flex flex-col items-center justify-center p-6">
        {/* Header with dynamic alert */}
        <motion.div
          className="text-center mb-6 w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Content Audit Score</h2>
          <motion.div
            className="flex items-center justify-center gap-2 text-sm rounded-lg py-2 px-4 w-fit mx-auto border"
            style={{
              color: alertConfig.color,
              backgroundColor: alertConfig.bgColor,
              borderColor: alertConfig.color
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AlertIcon className="w-4 h-4" />
            <span className="font-medium">{alertConfig.message}</span>
          </motion.div>
        </motion.div>

        {/* Gauge Chart */}
        <motion.div
          className="w-full h-40 sm:h-48 flex items-center justify-center mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                stroke="none"
                isAnimationActive
                animationDuration={1500}
                animationEasing="ease-out"
              >
                <Cell fill={getScoreColor(roundedScoreNumber)} />
                <Cell fill="#f3f4f6" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Score Display */}
        <motion.div
          className="text-center mb-6 -mt-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-baseline justify-center gap-2">
            <p className="text-5xl sm:text-6xl font-bold text-foreground">{roundedScoreString}</p>
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
          <p
            className="text-lg font-semibold mt-2"
            style={{ color: getScoreColor(roundedScoreNumber) }}
          >
            {getScoreLabel(roundedScoreNumber)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Overall Content Performance Score
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            variant="default"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6"
            size="sm"
          >
            View Details
          </Button>
          <Button variant="outline" className="rounded-full px-6" size="sm">
            Export Report
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-xs text-muted-foreground">Scroll Down for More Details</p>
          <motion.button
            onClick={onArrowClick}
            className="text-gray-600 hover:text-gray-700 transition-colors cursor-pointer focus:outline-none"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}