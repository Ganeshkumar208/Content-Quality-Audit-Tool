"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface ChartIssueDistributionProps {
  data: Array<{
    name: string
    value: number
    fill: string
  }>
}

export default function ChartIssueDistribution({ data }: ChartIssueDistributionProps) {
  const filteredData = data.filter((d) => d.value > 0)
  const totalIssues = filteredData.reduce((a, b) => a + b.value, 0)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const COLORS = ["#ef4444", "#f97316", "#eab308", "#3b82f6", "#8b5cf6"]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="border border-border p-6 shadow-sm hover:shadow-lg transition-all h-full flex flex-col bg-gradient-to-br from-card to-card/50">
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-accent/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Issue Distribution</h3>
              <p className="text-sm text-muted-foreground">Breakdown of issues by dimension</p>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-96 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => (
                  <text className="text-xs font-semibold" fill="var(--color-foreground)">
                    {`${name} ${value}`}
                  </text>
                )}
                outerRadius={100}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive
                animationDuration={1800}
                animationBegin={200}
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "2px solid var(--color-primary)",
                  borderRadius: "12px",
                  padding: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [`${value} issues`, "Count"]}
                labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => <span className="text-sm font-medium">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{totalIssues}</p>
              <p className="text-xs text-muted-foreground mt-1">Total Issues</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{filteredData.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Categories</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
