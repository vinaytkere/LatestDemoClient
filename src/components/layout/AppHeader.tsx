import type { FC } from "react";
import { AppButton } from "../ui/AppButton";

export const AppHeader: FC = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-[#1F1F1F] shadow-md">
            <nav className="flex items-center justify-between px-4 py-3 max-w-screen-xl mx-auto">
                {/* Left: Logo and Navigation Links */}
                <div className="flex items-center space-x-6">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#2B2E33] text-white font-bold text-lg font-sans select-none">
                        B
                    </div>

                    {["Home", "Features", "Pricing", "FAQs", "About"].map((label, idx) => (
                        <a
                            key={idx}
                            href="#"
                            className={`text-sm font-normal transition ${label === "Features" ? "text-white hover:underline" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Right: Search Input + AppButtons */}
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-[#2B2E33] text-gray-400 text-sm rounded px-3 py-1 w-36 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />

                    <AppButton
                        label="Login"
                        className="p-button-outlined p-button-sm border border-gray-500 text-white hover:bg-gray-700 transition"
                    />

                    <AppButton
                        label="Sign-up"
                        className="p-button-sm bg-yellow-500 text-black hover:bg-yellow-600 transition"
                    />
                </div>
            </nav>
        </header>
    );
};