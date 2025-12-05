import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    innerClassName?: string; // New prop for inner wrapper styling
    onClick?: (e?: React.MouseEvent) => void;
    href?: string;
    target?: string;
    rel?: string;
}

const MagneticButton = (props: MagneticButtonProps) => {
    const {
        children,
        className = "",
        innerClassName = "",
        onClick,
        href,
        target,
        rel,
        ...rest
    } = props;

    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const content = (
        <motion.div
            className={innerClassName} // Apply innerClassName here
            style={{ position: "relative" }}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );

    if (href) {
        return (
            <motion.a
                ref={ref as any}
                href={href}
                target={target}
                rel={rel}
                className={className}
                onMouseMove={handleMouse}
                onMouseLeave={reset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                {...(rest as any)}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: "pointer" }}
            {...rest}
        >
            {content}
        </motion.div>
    );
};

export default MagneticButton;
