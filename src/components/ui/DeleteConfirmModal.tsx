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

        .delete-modal-card {
            background: #ffffff;
            border: 1px solid rgba(0,0,0,0.08);
            box-shadow: 0 40px 80px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.02);
            color: #0f172a;
        }
        .dark .delete-modal-card {
            background: rgba(15, 23, 42, 0.96);
            border: 1px solid rgba(255,255,255,0.12);
            box-shadow: 0 40px 80px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08);
            color: #f9fafb;
        }

        .delete-modal-close {
            background: rgba(0,0,0,0.04);
            border: 1px solid rgba(0,0,0,0.06);
            color: #64748b;
        }
        .dark .delete-modal-close {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            color: #94a3b8;
        }
        .delete-modal-close:hover {
            background: rgba(0,0,0,0.08) !important;
            color: #0f172a !important;
        }
        .dark .delete-modal-close:hover {
            background: rgba(255,255,255,0.1) !important;
            color: #f9fafb !important;
        }

        .delete-modal-icon-bg {
            background: #fef2f2;
        }
        .dark .delete-modal-icon-bg {
            background: rgba(239,68,68,0.12);
        }

        .delete-modal-title {
            color: #0f172a;
        }
        .dark .delete-modal-title {
            color: #f9fafb;
        }

        .delete-modal-desc {
            color: #64748b;
        }
        .dark .delete-modal-desc {
            color: #94a3b8;
        }

        .delete-modal-btn-cancel {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            color: #475569;
        }
        .dark .delete-modal-btn-cancel {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            color: #94a3b8;
        }
        .delete-modal-btn-cancel:hover {
            background: #f1f5f9;
            color: #0f172a;
        }
        .dark .delete-modal-btn-cancel:hover {
            background: rgba(255,255,255,0.08);
            color: #f9fafb;
        }

        .delete-modal-btn-delete {
            background: #ef4444;
            box-shadow: 0 8px 20px -4px rgba(239,68,68,0.35);
            color: #ffffff;
        }
        .delete-modal-btn-delete:hover {
            background: #dc2626;
            transform: scale(1.02);
            box-shadow: 0 12px 24px -4px rgba(239,68,68,0.45);
        }
      `}</style>

            {/* Backdrop */}
            <div
                onClick={onCancel}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 100000,
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    animation: "modal-backdrop-in 0.2s ease forwards",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* Modal Card */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="delete-modal-card"
                    style={{
                        borderRadius: "24px",
                        padding: "44px 36px 32px",
                        width: "100%",
                        maxWidth: "440px",
                        margin: "0 16px",
                        animation: "modal-content-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                        textAlign: "center",
                        position: "relative",
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={onCancel}
                        className="delete-modal-close"
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            outline: "none",
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} style={{ fontSize: "14px" }} />
                    </button>

                    {/* Icon */}
                    <div
                        className="delete-modal-icon-bg"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            marginBottom: "28px",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <div style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: "rgba(239,68,68,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                style={{ fontSize: "24px", color: "#ef4444" }}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h3
                        className="delete-modal-title"
                        style={{
                            margin: "0 0 12px",
                            fontSize: "22px",
                            fontWeight: 800,
                            letterSpacing: "-0.025em",
                            lineHeight: 1.2,
                        }}
                    >
                        Are you sure?
                    </h3>

                    {/* Subtitle */}
                    <p
                        className="delete-modal-desc"
                        style={{
                            margin: "0 0 8px",
                            fontSize: "15px",
                            lineHeight: 1.6,
                            fontWeight: 500,
                        }}
                    >
                        You are about to permanently delete this {itemType}:
                    </p>

                    {/* Item name highlight */}
                    <p style={{
                        margin: "0 0 28px",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#ef4444",
                        letterSpacing: "-0.01em",
                    }}>
                        "{itemName}"
                    </p>

                    <p
                        className="delete-modal-desc"
                        style={{
                            margin: "-16px 0 32px",
                            fontSize: "13px",
                            opacity: 0.8,
                        }}
                    >
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
                            className="delete-modal-btn-cancel"
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                                padding: "14px 20px",
                                borderRadius: "16px",
                                fontSize: "15px",
                                fontWeight: 700,
                                cursor: "pointer",
                                transition: "all 0.2s",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} style={{ opacity: 0.7 }} />
                            Cancel
                        </button>

                        {/* Delete */}
                        <button
                            onClick={onConfirm}
                            className="delete-modal-btn-delete"
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                                padding: "14px 20px",
                                borderRadius: "16px",
                                border: "none",
                                fontSize: "15px",
                                fontWeight: 700,
                                cursor: "pointer",
                                transition: "all 0.2s",
                                letterSpacing: "-0.01em",
                                outline: "none",
                            }}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
