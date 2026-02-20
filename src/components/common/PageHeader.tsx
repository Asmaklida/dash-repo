import React from "react";
import PageBreadcrumb from "./PageBreadCrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface PageHeaderProps {
    title: string;
    description: string;
    icon: IconDefinition;
    gradient?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    icon,
    gradient = "from-brand-500 via-brand-600 to-purple-600",
}) => {
    return (
        <div className="mb-8">
            <PageBreadcrumb pageTitle={title} />

            <div className={`group relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-8 shadow-theme-lg transition-all duration-300 hover:shadow-theme-xl`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10"></div>
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10"></div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        {/* Premium Icon Container */}
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                            <FontAwesomeIcon
                                icon={icon}
                                className="h-8 w-8 text-white drop-shadow-md"
                            />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                                {title}
                            </h1>
                            <p className="mt-1 text-lg text-white/90 font-medium">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="hidden lg:flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-md border border-white/10">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75"></span>
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success-500"></span>
                        </span>
                        <span className="text-sm font-bold uppercase tracking-wider text-white">Live Monitoring</span>
                    </div>
                </div>

                {/* Decorative Background Icon */}
                <div className="absolute -bottom-10 -right-10 opacity-10 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">
                    <FontAwesomeIcon icon={icon} className="h-64 w-64 text-white" />
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
