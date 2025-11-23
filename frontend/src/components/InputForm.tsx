import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeContent } from "../services/api";
import Loader from "./Loader";

const InputForm = () => {
    const [content, setContent] = useState("");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAnalyze = async () => {
        if (!content.trim()) return alert("Please paste some content.");

        setLoading(true);
        try {
            const res = await analyzeContent({ content, keyword });
            navigate("/results", { state: res });
        } catch (err) {
            alert("Error analyzing content.");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <textarea
                className="w-full h-60 bg-[#161b22] text-gray-200 p-4 rounded-xl border border-gray-700 outline-none focus:border-cyan-400"
                placeholder="Paste your article/content here..."
                onChange={(e) => setContent(e.target.value)}
            />

            <input
                className="bg-[#161b22] text-gray-200 p-3 rounded-xl border border-gray-700 outline-none focus:border-cyan-400"
                placeholder="Keyword (optional)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <button
                onClick={handleAnalyze}
                className="p-3 font-bold bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition"
            >
                {loading ? <Loader /> : "Analyze Content"}
            </button>
        </div>
    );
};

export default InputForm;










// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Search, Link, FileText, Zap } from 'lucide-react'

// const InputForm = ({ onAnalyze, isLoading }) => {
//     const [inputType, setInputType] = useState('text')
//     const [content, setContent] = useState('')
//     const [isFocused, setIsFocused] = useState(false)

//     const handleSubmit = (e: any) => {
//         e.preventDefault()
//         if (!content.trim()) return

//         const analysisData = {
//             type: inputType,
//             content: content.trim()
//         }

//         onAnalyze(analysisData)
//     }

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="max-w-4xl mx-auto"
//         >
//             <div className="text-center mb-12">
//                 <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.2, type: "spring" }}
//                     className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl mb-6"
//                 >
//                     <Zap className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <h1 className="text-5xl font-bold bg-gradient-to-r from-dark-800 to-dark-600 bg-clip-text text-transparent mb-4">
//                     Content Quality Audit
//                 </h1>
//                 <p className="text-xl text-dark-600 max-w-2xl mx-auto">
//                     Analyze your content across SEO, SERP performance, AEO optimization, humanization, and differentiation metrics
//                 </p>
//             </div>

//             <div className="glass rounded-3xl p-8 shadow-2xl">
//                 {/* Input Type Selector */}
//                 <div className="flex space-x-4 mb-8">
//                     {[
//                         { id: 'text', icon: FileText, label: 'Paste Text' },
//                         { id: 'url', icon: Link, label: 'URL Analysis' }
//                     ].map((type) => (
//                         <motion.button
//                             key={type.id}
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={() => setInputType(type.id)}
//                             className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-200 flex-1 ${inputType === type.id
//                                 ? 'bg-primary-500 text-white shadow-lg pulse-glow'
//                                 : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
//                                 }`}
//                         >
//                             <type.icon className="w-5 h-5" />
//                             <span>{type.label}</span>
//                         </motion.button>
//                     ))}
//                 </div>

//                 {/* Input Form */}
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <motion.div
//                         animate={{ height: 'auto' }}
//                         className={`relative transition-all duration-300 ${isFocused ? 'ring-2 ring-primary-500/50' : ''
//                             }`}
//                     >
//                         {inputType === 'text' ? (
//                             <textarea
//                                 value={content}
//                                 onChange={(e) => setContent(e.target.value)}
//                                 onFocus={() => setIsFocused(true)}
//                                 onBlur={() => setIsFocused(false)}
//                                 placeholder="Paste your content here... (Minimum 200 characters recommended)"
//                                 className="w-full h-64 px-6 py-4 bg-dark-100 border border-dark-300 rounded-2xl text-dark-800 placeholder-dark-400 resize-none focus:outline-none focus:border-primary-500 transition-all duration-200"
//                                 required
//                                 minLength={50}
//                             />
//                         ) : (
//                             <div className="relative">
//                                 <input
//                                     type="url"
//                                     value={content}
//                                     onChange={(e) => setContent(e.target.value)}
//                                     onFocus={() => setIsFocused(true)}
//                                     onBlur={() => setIsFocused(false)}
//                                     placeholder="https://example.com/your-blog-post"
//                                     className="w-full px-6 py-4 bg-dark-100 border border-dark-300 rounded-2xl text-dark-800 placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-all duration-200 pr-12"
//                                     required
//                                 />
//                                 <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
//                             </div>
//                         )}
//                     </motion.div>

//                     <motion.button
//                         type="submit"
//                         disabled={isLoading || !content.trim()}
//                         whileHover={{ scale: isLoading ? 1 : 1.02 }}
//                         whileTap={{ scale: isLoading ? 1 : 0.98 }}
//                         className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-200 ${isLoading || !content.trim()
//                             ? 'bg-dark-300 text-dark-500 cursor-not-allowed'
//                             : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl pulse-glow'
//                             }`}
//                     >
//                         {isLoading ? (
//                             <div className="flex items-center justify-center space-x-3">
//                                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                                 <span>Analyzing Content...</span>
//                             </div>
//                         ) : (
//                             <div className="flex items-center justify-center space-x-3">
//                                 <Zap className="w-5 h-5" />
//                                 <span>Start Content Audit</span>
//                             </div>
//                         )}
//                     </motion.button>
//                 </form>

//                 {/* Features Grid */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-dark-300"
//                 >
//                     {[
//                         {
//                             icon: Search,
//                             title: 'SEO Analysis',
//                             description: 'Keyword density, readability, header structure'
//                         },
//                         {
//                             icon: FileText,
//                             title: 'SERP Performance',
//                             description: 'Compare against top-ranking competitors'
//                         },
//                         {
//                             icon: Zap,
//                             title: 'AI Optimization',
//                             description: 'AEO score and humanization metrics'
//                         }
//                     ].map((feature, index) => (
//                         <motion.div
//                             key={feature.title}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.7 + index * 0.1 }}
//                             className="text-center p-4"
//                         >
//                             <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-xl mb-3">
//                                 <feature.icon className="w-6 h-6 text-primary-500" />
//                             </div>
//                             <h3 className="font-semibold text-dark-800 mb-2">{feature.title}</h3>
//                             <p className="text-sm text-dark-600">{feature.description}</p>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>
//         </motion.div>
//     )
// }

// export default InputForm