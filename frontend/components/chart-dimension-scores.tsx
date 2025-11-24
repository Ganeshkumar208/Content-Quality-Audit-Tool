"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

interface ChartDimensionScoresProps {
  data: Array<{
    name: string
    score: number
    fullLabel: string
  }>
}

export default function ChartDimensionScores({ data }: ChartDimensionScoresProps) {
  const getColorByScore = (score: number) => {
    if (score >= 85) return "#10b981" // emerald
    if (score >= 70) return "#3b82f6" // blue
    if (score >= 50) return "#f59e0b" // amber
    if (score >= 30) return "#ef4444" // red
    return "#991b1b" // dark red
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  // Calculate statistics
  const avgScore = Math.round(data.reduce((a, b) => a + b.score, 0) / data.length)
  const excellentCount = data.filter((d) => d.score >= 85).length
  const needsWorkCount = data.filter((d) => d.score < 50).length

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="border border-border p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all h-full flex flex-col bg-gradient-to-br from-card to-card/50">
        {/* Header */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Dimension Scores</h3>
              <p className="text-sm text-muted-foreground">Performance across all audit dimensions</p>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-64 sm:min-h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 80 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12, fontWeight: 500 }}
                interval={0}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                label={{ value: "Score (%)", angle: -90, position: "insideLeft", offset: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "2px solid var(--color-primary)",
                  borderRadius: "12px",
                  padding: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
                formatter={(value) => [`${value}%`, "Score"]}
                cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="square" formatter={() => "Performance Score"} />
              <Bar
                dataKey="score"
                fill="url(#barGradient)"
                radius={[12, 12, 0, 0]}
                isAnimationActive
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColorByScore(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Statistics Footer */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xl sm:text-2xl font-bold text-primary">{avgScore}%</p>
              <p className="text-xs text-muted-foreground mt-1">Average</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xl sm:text-2xl font-bold text-emerald-600">{excellentCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Excellent</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xl sm:text-2xl font-bold text-orange-600">{needsWorkCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Needs Work</p>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
