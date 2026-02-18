import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    itemName: string;
    itemType?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteConfirmModal({
    isOpen,
    itemName,
    itemType = "record",
    onConfirm,
    onCancel,
}: DeleteConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <style>{`
        @keyframes modal-backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modal-content-in {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

            {/* Backdrop */}
            <div
                onClick={onCancel}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 100000,
                    background: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    animation: "modal-backdrop-in 0.2s ease forwards",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* Modal Card */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: "rgba(15, 23, 42, 0.92)",
                        borderRadius: "24px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 40px 80px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
                        padding: "40px 36px 32px",
                        width: "100%",
                        maxWidth: "420px",
                        margin: "0 16px",
                        animation: "modal-content-in 0.25s cubic-bezier(0,0,0.2,1) forwards",
                        textAlign: "center",
                        position: "relative",
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={onCancel}
                        style={{
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "rgba(255,255,255,0.04)",
                            color: "#6b7280",
                            cursor: "pointer",
                            transition: "all 0.15s",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                            (e.currentTarget as HTMLButtonElement).style.color = "#f9fafb";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                            (e.currentTarget as HTMLButtonElement).style.color = "#6b7280";
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} style={{ fontSize: "13px" }} />
                    </button>

                    {/* Icon */}
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        background: "rgba(239,68,68,0.12)",
                        marginBottom: "24px",
                    }}>
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{ fontSize: "28px", color: "#ef4444" }}
                        />
                    </div>

                    {/* Title */}
                    <h3 style={{
                        margin: "0 0 12px",
                        fontSize: "20px",
                        fontWeight: 800,
                        color: "#f9fafb",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                    }}>
                        Are you sure?
                    </h3>

                    {/* Subtitle */}
                    <p style={{
                        margin: "0 0 8px",
                        fontSize: "14px",
                        color: "#9ca3af",
                        lineHeight: 1.6,
                    }}>
                        You are about to permanently delete this {itemType}:
                    </p>

                    {/* Item name highlight */}
                    <p style={{
                        margin: "0 0 28px",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#ef4444",
                        letterSpacing: "-0.01em",
                    }}>
                        "{itemName}"
                    </p>

                    <p style={{
                        margin: "-16px 0 28px",
                        fontSize: "12px",
                        color: "#6b7280",
                    }}>
                        This action cannot be undone.
                    </p>

                    {/* Buttons */}
                    <div style={{
                        display: "flex",
                        gap: "12px",
                    }}>
                        {/* Cancel */}
                        <button
                            onClick={onCancel}
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                padding: "13px 20px",
                                borderRadius: "14px",
                                border: "1px solid rgba(255,255,255,0.1)",
                                background: "rgba(255,255,255,0.05)",
                                color: "#d1d5db",
                                fontSize: "14px",
                                fontWeight: 700,
                                cursor: "pointer",
                                transition: "all 0.15s",
                                letterSpacing: "-0.01em",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                                (e.currentTarget as HTMLButtonElement).style.color = "#f9fafb";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                                (e.currentTarget as HTMLButtonElement).style.color = "#d1d5db";
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} style={{ fontSize: "12px" }} />
                            Cancel
                        </button>

                        {/* Delete */}
                        <button
                            onClick={onConfirm}
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                padding: "13px 20px",
                                borderRadius: "14px",
                                border: "none",
                                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                                boxShadow: "0 8px 24px -4px rgba(239,68,68,0.4)",
                                color: "#fff",
                                fontSize: "14px",
                                fontWeight: 700,
                                cursor: "pointer",
                                transition: "all 0.15s",
                                letterSpacing: "-0.01em",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 28px -4px rgba(239,68,68,0.5)";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px -4px rgba(239,68,68,0.4)";
                            }}
                        >
                            <FontAwesomeIcon icon={faTrashCan} style={{ fontSize: "12px" }} />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
