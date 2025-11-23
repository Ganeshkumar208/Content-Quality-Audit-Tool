import { motion } from "framer-motion";

const ScoreMeter = ({ label, score }) => {
    const circumference = 2.82 * score;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#161b22] p-6 rounded-2xl shadow-xl border border-gray-700 text-center"
        >
            <h3 className="text-lg font-semibold mb-4">{label}</h3>

            <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke="#2d333b"
                        strokeWidth="10"
                        fill="none"
                    />

                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke="#00e5ff"
                        strokeWidth="10"
                        strokeDasharray={`${circumference} 282`}
                        strokeLinecap="round"
                        fill="none"
                        className="transition-all duration-700"
                    />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                    {score}%
                </div>
            </div>
        </motion.div>
    );
};

export default ScoreMeter;
