import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faExclamationCircle,
    faInfoCircle,
    faTriangleExclamation,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

export type ToastType = "success" | "add" | "error" | "warning" | "info";

interface ToastProps {
    id: string;
    type: ToastType;
    message: string;
    onRemove: (id: string) => void;
    duration?: number;
}

const toastStyles = {
    success: {
        bg: "rgba(16,185,129,0.08)",
        border: "rgba(16,185,129,0.25)",
        icon: faCheckCircle,
        iconColor: "#10b981",
        accent: "#10b981",
        label: "Success",
    },
    add: {
        bg: "rgba(59,130,246,0.08)",
        border: "rgba(59,130,246,0.25)",
        icon: faCheckCircle,
        iconColor: "#3b82f6",
        accent: "#3b82f6",
        label: "Added",
    },
    error: {
        bg: "rgba(239,68,68,0.08)",
        border: "rgba(239,68,68,0.25)",
        icon: faExclamationCircle,
        iconColor: "#ef4444",
        accent: "#ef4444",
        label: "Error",
    },
    warning: {
        bg: "rgba(245,158,11,0.08)",
        border: "rgba(245,158,11,0.25)",
        icon: faTriangleExclamation,
        iconColor: "#f59e0b",
        accent: "#f59e0b",
        label: "Warning",
    },
    info: {
        bg: "rgba(6,182,212,0.08)",
        border: "rgba(6,182,212,0.25)",
        icon: faInfoCircle,
        iconColor: "#06b6d4",
        accent: "#06b6d4",
        label: "Info",
    }
};

export default function Toast({ id, type, message, onRemove, duration = 5000 }: ToastProps) {
    const [isExiting, setIsExiting] = useState(false);
    const style = toastStyles[type] ?? toastStyles.info;

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onRemove(id);
        }, 350);
    };

    return (
        <>
            <style>{`
                @keyframes toast-slide-in {
                    from { transform: translateY(110%); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
                @keyframes toast-out {
                    from { transform: scale(1); opacity: 1; }
                    to   { transform: scale(0.9); opacity: 0; }
                }
                @keyframes toast-progress {
                    from { width: 100%; }
                    to   { width: 0%;   }
                }
            `}</style>

            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "20px",
                    border: `1px solid ${style.border}`,
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)",
                    padding: "16px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    minWidth: "340px",
                    maxWidth: "420px",
                    pointerEvents: "auto",
                    animation: isExiting
                        ? "toast-out 0.2s ease-in forwards"
                        : "toast-slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
            >
                {/* Left accent bar */}
                <div style={{
                    position: "absolute",
                    top: 0, left: 0, bottom: 0,
                    width: "4px",
                    borderRadius: "16px 0 0 16px",
                    background: style.accent,
                }} />

                {/* Icon */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "40px",
                    width: "40px",
                    flexShrink: 0,
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.08)",
                    color: style.iconColor,
                    marginLeft: "8px",
                }}>
                    <FontAwesomeIcon icon={style.icon} style={{ fontSize: "18px" }} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, paddingTop: "2px" }}>
                    <h4 style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--color-text-primary, #111827)",
                        textTransform: "capitalize",
                        letterSpacing: "-0.01em",
                    }}>
                        {style.label}
                    </h4>
                    <p style={{
                        margin: "4px 0 0",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "var(--color-text-secondary, #6b7280)",
                        lineHeight: "1.5",
                    }}>
                        {message}
                    </p>
                </div>

                {/* Close button */}
                <button
                    onClick={handleClose}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "28px",
                        width: "28px",
                        borderRadius: "8px",
                        border: "none",
                        background: "transparent",
                        color: "#9ca3af",
                        cursor: "pointer",
                        flexShrink: 0,
                        transition: "background 0.15s, color 0.15s",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.08)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#374151";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af";
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} style={{ fontSize: "13px" }} />
                </button>

                {/* Progress bar */}
                <div style={{
                    position: "absolute",
                    bottom: 0, left: 0,
                    height: "3px",
                    background: style.accent,
                    opacity: 0.4,
                    animation: `toast-progress ${duration}ms linear forwards`,
                }} />
            </div>
        </>
    );
}
