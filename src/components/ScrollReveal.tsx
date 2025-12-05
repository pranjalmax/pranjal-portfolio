import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    duration?: number;
    className?: string;
}

const ScrollReveal = ({
    children,
    width = "fit-content",
    delay = 0,
    direction = "up",
    distance = 50, // Increased for visibility
    duration = 0.6, // Increased for visibility
    className = "",
}: ScrollRevealProps) => {
    const ref = useRef(null);
    // Adjusted margin to ensure it triggers when element is well within view
    const isInView = useInView(ref, { once: false, margin: "0px 0px -50px 0px" });

    const getInitial = () => {
        switch (direction) {
            case "up":
                return { opacity: 0, y: distance };
            case "down":
                return { opacity: 0, y: -distance };
            case "left":
                return { opacity: 0, x: distance };
            case "right":
                return { opacity: 0, x: -distance };
            case "none":
                return { opacity: 0 };
            default:
                return { opacity: 0, y: distance };
        }
    };

    const getAnimate = () => {
        switch (direction) {
            case "up":
            case "down":
                return { opacity: 1, y: 0 };
            case "left":
            case "right":
                return { opacity: 1, x: 0 };
            case "none":
                return { opacity: 1 };
            default:
                return { opacity: 1, y: 0 };
        }
    };

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                initial={getInitial()}
                animate={isInView ? getAnimate() : getInitial()}
                transition={{ duration, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
