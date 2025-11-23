// import { Loader2 } from "lucide-react";

// const Loader = () => (
//     <Loader2 className="animate-spin mx-auto text-black" size={22} />
// );

// export default Loader;



import React from "react";
import { Loader2 } from "lucide-react";

const Loader: React.FC<{ size?: number }> = ({ size = 20 }) => {
    return <Loader2 className="animate-spin" size={size} />;
};

export default Loader;
