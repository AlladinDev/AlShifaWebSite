import { Heart } from "lucide-react";

const ECG_PATH = `
M0 250
L180 250
L210 250
L225 220
L238 280
L255 150
L275 320
L300 250
L530 250
L550 230
L565 270
L585 250
L1200 250
`;

export const ClinicBackground = ({
    className = "",
}: {
    className?: string;
}) => {
    return (
        <div
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        >
            {/* Very subtle dot grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "radial-gradient(rgb(15 118 110 / .35) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Heart */}

            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <Heart
                    fill="rgb(13 148 136 / .05)"
                    className="h-44 w-44 text-teal-600/15 animate-heartbeat"
                    strokeWidth={1.4}
                />
            </div>

            {/* Static ECG */}

            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1200 500"
                preserveAspectRatio="none"
            >
                <path
                    d={ECG_PATH}
                    stroke="rgb(13 148 136 / .08)"
                    strokeWidth="2"
                    fill="none"
                />

                {/* Animated ECG */}

                <path
                    d={ECG_PATH}
                    stroke="#14B8A6"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="180 1800"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="1980"
                        to="0"
                        dur="3.5s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </div>
    );
};