import { motion } from "framer-motion";
import InputForm from "../components/InputForm";

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6"
        >
            <div className="bg-[#161b22] p-8 rounded-2xl border border-gray-700 shadow-xl">
                <h1 className="text-3xl font-bold text-white mb-3">
                    Content Quality Audit
                </h1>

                <p className="text-gray-400 mb-6">
                    Paste your article and get an AI-powered audit including SEO, grammar,
                    readability, clarity, SERP factors & more.
                </p>

                <InputForm onAnalyze={undefined} isLoading={undefined} />
            </div>
        </motion.div>
    );
};

export default Home;
