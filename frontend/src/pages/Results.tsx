import { useLocation, useNavigate } from "react-router-dom";
import ScoreMeter from "../components/ScoreMeter";

const Results = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) return <div className="p-6">No results found.</div>;

    const {
        seo,
        serp,
        aeo,
        humanization,
        differentiation,
        readability,
        grammar,
        clarity,
        structure,
        overallScore,
    } = state;

    const scoreData = [
        { label: "SEO", score: seo.score },
        { label: "SERP", score: serp.score },
        { label: "AEO", score: aeo.score },
        { label: "Humanization", score: humanization.score },
        { label: "Differentiation", score: differentiation.score },
        { label: "Readability", score: readability.score },
        { label: "Grammar", score: grammar.score },
        { label: "Clarity", score: clarity.score },
        { label: "Structure", score: structure.score },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Audit Results</h1>

            <div className="grid md:grid-cols-3 gap-6">
                {scoreData.map((item) => (
                    <ScoreMeter key={item.label} label={item.label} score={item.score} />
                ))}
            </div>

            <div className="mt-8 bg-[#161b22] p-6 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-semibold mb-3">Overall Score</h2>
                <div className="text-cyan-400 text-5xl font-bold">{overallScore}%</div>
            </div>

            <button
                onClick={() => navigate("/")}
                className="mt-8 bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-3 px-6 rounded-xl"
            >
                Go Back
            </button>
        </div>
    );
};

export default Results;
