"use client";

import { useEffect, useState } from "react";
import {
    Bolt,
    Clock3,
    Copy,
    History,
    Instagram,
    Linkedin,
    Loader2,
    Twitter,
    X,
} from "lucide-react";
import axios from "axios";

export default function ContentGenerator() {
    const [prompt, setPrompt] = useState("");
    const [platform, setPlatform] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [contentArray, setContentArray] = useState<Array<{
        title: string;
        createdAt: string;
        platform: string;
        content: string;
    }>>([]);
    const [points, setPoints] = useState<number | null>(null);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [selectedContent, setSelectedContent] = useState<string | null>(null);

    useEffect(() => {
        setLoadingHistory(true);
        axios
            .get("/api/v1/history")
            .then((res) => {
                setLoadingHistory(false);
                setPoints(res.data.remainingPoints);
                setContentArray(res.data.content);
            })
            .catch((err) => {
                setLoadingHistory(false);
                console.error("Error fetching history:", err);
            });
    }, []);

    const copyToClipboard = () => {
        const text = document.getElementById("contentCopy")?.innerText;
        if (text) {
            navigator.clipboard.writeText(text).catch((err) => {
                console.error("Error copying text:", err);
            });
        }
    };

    const handleThreadClick = (contentValue: string) => {
        setSelectedContent(contentValue);
        setIsContentVisible(true);
    };

    async function onClickHandler() {
        if (!prompt.trim() || !platform) {
            setError("Please provide both a prompt and platform");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/v1/generate", { prompt, platform });

            if (response.data?.content) {
                setContent(response.data.content);
                setPoints(response.data.remainingPoints);
            } else {
                throw new Error("No content received from API");
            }
        } catch (error) {
            console.error("Generation error:", error);
            setError("Failed to generate content");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="container mx-auto py-6">
                {isContentVisible && selectedContent && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Generated Content
                                </h2>
                                <button
                                    onClick={() => setIsContentVisible(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div
                                className="prose dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: selectedContent }}
                            />
                            <button
                                onClick={() => {
                                    const text = document.querySelector(".prose")?.textContent;
                                    if (text) {
                                        navigator.clipboard.writeText(text);
                                    }
                                }}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                            >
                                <Copy className="h-4 w-4" />
                                Copy Content
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                Generate Content
                            </h2>
                            <div className="flex items-center gap-2 mb-4">
                                <Bolt className="text-yellow-500" />
                                {points !== null ? (
                                    <span className="text-lg font-semibold">{points} Credits</span>
                                ) : (
                                    <Loader2 className="animate-spin size-5" />
                                )}
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                                        Your Prompt
                                    </label>
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                                        rows={4}
                                        placeholder="Enter your content prompt..."
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                                        Platform
                                    </label>
                                    <select
                                        value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}
                                        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                                    >
                                        <option value="">Select platform</option>
                                        <option value="X">Twitter</option>
                                        <option value="LinkedIn">LinkedIn</option>
                                        <option value="Instagram">Instagram</option>
                                    </select>
                                </div>

                                {error && (
                                    <div className="p-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <button
                                    onClick={onClickHandler}
                                    disabled={!prompt.trim() || !platform || loading}
                                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                                            Generating...
                                        </span>
                                    ) : (
                                        "Generate Content"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {content && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Generated Content
                            </h2>
                            <button
                                onClick={copyToClipboard}
                                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                title="Copy to clipboard"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                        <div
                            className="prose dark:prose-invert max-w-none"
                            id="contentCopy"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-fit sticky top-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">History</h2>
                    <History className="w-5 h-5" />
                </div>

                {loadingHistory && contentArray.length === 0 && (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="animate-spin size-6" />
                    </div>
                )}

                <div className="space-y-4">
                    {contentArray.map((thread, index) => (
                        <div
                            key={index}
                            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            onClick={() => handleThreadClick(thread.content)}
                        >
                            <div className="flex items-center gap-2 font-bold mb-2">
                                {thread.platform === "X" ? (
                                    <Twitter />
                                ) : thread.platform === "Instagram" ? (
                                    <Instagram />
                                ) : thread.platform === "LinkedIn" ? (
                                    <Linkedin />
                                ) : (
                                    ""
                                )}
                                <div>{thread.platform}</div>
                            </div>
                            <div className="mb-2 line-clamp-2">{thread.title}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Clock3 className="w-3 h-3" />
                                <div>{new Date(thread.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
