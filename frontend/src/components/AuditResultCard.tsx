const AuditResultCard = ({ title, score, description }) => {
    return (
        <div className="bg-[#161b22] p-5 rounded-xl border border-gray-700 shadow-lg">
            <div className="text-xl font-semibold text-white mb-2">{title}</div>
            <div className="text-cyan-400 text-3xl font-bold mb-3">{score}%</div>
            <div className="text-gray-400">{description}</div>
        </div>
    );
};

export default AuditResultCard;
