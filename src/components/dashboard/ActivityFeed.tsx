import { useData } from "../../context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCirclePlus,
    faTriangleExclamation,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const ActivityFeed: React.FC = () => {
    const { activities } = useData();

    const getIcon = (type: string) => {
        switch (type) {
            case "success":
                return { icon: faCircleCheck, color: "text-success-500" };
            case "add":
                return { icon: faCirclePlus, color: "text-brand-500" };
            case "warning":
                return { icon: faTriangleExclamation, color: "text-warning-500" };
            case "info":
                return { icon: faInfoCircle, color: "text-blue-500" };
            default:
                return { icon: faInfoCircle, color: "text-gray-500" };
        }
    };

    const formatTime = (date: Date) => {
        const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        if (diff < 60) return "Just now";
        if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
        return `${Math.floor(diff / 3600)} hours ago`;
    };

    return (
        <div className="rounded-3xl border border-gray-200/50 bg-white p-8 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80 h-full transition-all">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        System Logs
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">Live operational stream</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 dark:border-white/5 dark:bg-white/5">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75"></span>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 dark:text-brand-400">Stream Live</span>
                </div>
            </div>

            <div className="space-y-6">
                {activities.length > 0 ? (
                    activities.map((item) => {
                        const { icon, color } = getIcon(item.type);
                        return (
                            <div key={item.id} className="group flex items-start gap-4 animate-fade-in">
                                <div className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-xs transition-colors group-hover:bg-brand-50 dark:bg-white/5 dark:group-hover:bg-brand-500/10 ${color}`}>
                                    <FontAwesomeIcon icon={icon} />
                                </div>
                                <div className="flex-1 border-b border-gray-50 pb-4 last:border-0 dark:border-white/5">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                        {item.message}
                                    </p>
                                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        {formatTime(item.timestamp)}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 opacity-40">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 dark:bg-white/5">
                            <FontAwesomeIcon icon={faInfoCircle} className="text-gray-400" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">No events detected</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityFeed;
