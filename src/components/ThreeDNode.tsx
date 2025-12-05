import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ThreeDNodeProps {
    children: React.ReactNode;
    className?: string;
}

const ThreeDNode = ({ children, className = "" }: ThreeDNodeProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseXVal = e.clientX - rect.left;
            const mouseYVal = e.clientY - rect.top;
            const xPct = mouseXVal / width - 0.5;
            const yPct = mouseYVal / height - 0.5;
            x.set(xPct);
            y.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative perspective-1000 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full"
            >
                {children}

                {/* Glare Effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-50 rounded-3xl mix-blend-overlay"
                    style={{
                        backgroundImage: `radial-gradient(
              circle at ${glareX} ${glareY}, 
              rgba(255,255,255,0.3) 0%, 
              transparent 80%
            )`,
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

export default ThreeDNode;
