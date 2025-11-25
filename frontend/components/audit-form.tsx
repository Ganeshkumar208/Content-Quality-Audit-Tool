"use client"

import "react-quill-new/dist/quill.snow.css"
import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2, Link2, FileText, CheckCircle2 } from "lucide-react"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

interface AuditFormProps {
  onSubmit: (data: { content?: string; url?: string; keyword?: string }) => void
  isLoading: boolean
}

export default function AuditForm({ onSubmit, isLoading }: AuditFormProps) {
  const [activeTab, setActiveTab] = useState<"text" | "url">("text")
  const [text, setText] = useState("")
  const [keyword, setKeyword] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = () => {
    if (activeTab === "text" && text.trim()) {
      onSubmit({
        content: text,
        keyword: keyword.trim() || undefined
      })
    } else if (activeTab === "url" && url.trim()) {
      onSubmit({
        url: url,
        keyword: keyword.trim() || undefined
      })
    }
  }

  const isValid = activeTab === "text"
    ? text.replace(/<[^>]+>/g, "").trim().length > 0
    : url.trim().length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900/50">
      <div className="relative">
        <div className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Content Audit</h2>
                <p className="text-xs text-muted-foreground">Professional analysis engine</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 pt-24">
          <div className="w-full max-w-2xl">
            {/* Hero Section */}
            <div className="text-center mb-12">
              {/* <div className="inline-block bg-gradient-to-br from-primary/20 to-primary/10 text-primary rounded-2xl p-4 mb-6">
                <FileText className="w-12 h-12" />
              </div> */}
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-12 h-12 text-foreground" style={{ marginLeft: '100px' }} />
                <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight text-balance">
                  Analyze Your Content
                </h1>
              </div>

              <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Get comprehensive insights across 9 dimensions including SEO, SERP performance, readability, and more
              </p>
            </div>

            <Card className="border border-border shadow-2xl bg-card overflow-hidden">
              <div className="p-8">
                <div className="flex gap-2 mb-8 bg-muted p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab("text")}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === "text"
                      ? "bg-card text-primary shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <FileText className="w-4 h-4" />
                    Text Content
                  </button>
                  <button
                    onClick={() => setActiveTab("url")}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === "url"
                      ? "bg-card text-primary shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <Link2 className="w-4 h-4" />
                    URL
                  </button>
                </div>

                <div className="mb-8">
                  {activeTab === "text" ? (
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Paste your content
                      </label>
                      <div className="bg-muted border border-border rounded-xl">
                        <ReactQuill
                          value={text}
                          onChange={setText}
                          theme="snow"
                          placeholder="Paste your article, blog post, or content here..."
                          className="min-h-72"
                        />
                      </div>

                      <label className="block text-sm font-semibold text-foreground mt-4 mb-2">
                        Target Keyword (Optional)
                      </label>
                      <Input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Enter keyword to analyze (e.g. AI business adoption)"
                        className="h-12 border border-border bg-muted text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary rounded-xl"
                      />

                      <p className="text-xs text-muted-foreground mt-2">
                        Minimum 100 characters recommended
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">Enter article URL</label>
                      <Input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/article"
                        className="h-12 border border-border bg-muted text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary rounded-xl"
                      />

                      <label className="block text-sm font-semibold text-foreground mt-4 mb-2">
                        Target Keyword (Optional)
                      </label>
                      <Input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Enter keyword to analyze (e.g. AI business adoption)"
                        className="h-12 border border-border bg-muted text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary rounded-xl"
                      />

                      <p className="text-xs text-muted-foreground mt-2">
                        We'll fetch and analyze the content from this URL
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!isValid || isLoading}
                  className="w-full h-12 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Analyze Content
                    </>
                  )}
                </Button>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: "SEO Score", icon: "📊" },
                    { label: "SERP Analysis", icon: "🔍" },
                    { label: "Readability", icon: "📖" },
                    { label: "Grammar Check", icon: "✓" },
                    { label: "Humanization", icon: "👥" },
                    { label: "Structure", icon: "🏗️" },
                  ].map((feature) => (
                    <div key={feature.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{feature.icon}</span>
                      <span>{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-8">
              Your content is analyzed securely and privately
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}