// // "use client";
// // import { useEffect, useState } from "react";
// // import {
// //   FaClockRotateLeft,
// //   FaInstagram,
// //   FaLinkedinIn,
// //   FaRegClock,
// //   FaXTwitter,
// // } from "react-icons/fa6";
// // import axios from "axios";
// // import { FaRegCopy } from "react-icons/fa";
// // import { PiSpinnerLight } from "react-icons/pi";
// // import { response } from "express";

// // export default function DashboardPage() {
// //   const [prompt, setPrompt] = useState("");
// //   const [platform, setPlatform] = useState("");
// //   const [content, setContent] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [loadingHistory, setLoadingHistory] = useState(false);
// //   const [contentArray, setContentArray] = useState<any[]>([]);

// //   useEffect(() => {
// //     setLoadingHistory(true);
// //     axios.get("/api/v1/history")
// //       .then((res) => {
// //         setContentArray(res.data.content || []);
// //       })
// //       .catch(console.error)
// //       .finally(() => setLoadingHistory(false));
// //   }, []);

// //   const copyToClipboard = () => {
// //     const text = document.getElementById("contentCopy")?.textContent;
// //     if (text) {
// //       navigator.clipboard.writeText(text);
// //     }
// //   };

// //   const generateContent = async () => {
// //     if (!prompt.trim() || !platform) {
// //       setError("Please provide both a prompt and platform");
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const response = await axios.post("/api/v1/generate", { prompt, platform });
// //       setContent(response.data?.content || "");
// //     } catch (err) {
// //       setError("Failed to generate content");
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// // console.log(response)
// //   return (
// //     <div className="container mx-auto py-8">
// //       <h1 className="text-3xl  font-bold mb-8">Content Generator</h1>

// //       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //         {/* Main content area */}
// //         <div className="lg:col-span-3 space-y-6">
// //           <div className="bg-card p-6 rounded-lg border">
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block mb-2 font-medium">Your Prompt</label>
// //                 <textarea
// //                   value={prompt}
// //                   onChange={(e) => setPrompt(e.target.value)}
// //                   className="w-full p-3 border rounded-lg bg-background"
// //                   rows={4}
// //                   placeholder="What content would you like to generate?"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block mb-2 font-medium">Platform</label>
// //                 <select
// //                   value={platform}
// //                   onChange={(e) => setPlatform(e.target.value)}
// //                   className="w-full p-2 border rounded-lg bg-background"
// //                 >
// //                   <option value="">Select platform</option>
// //                   <option value="X">Twitter</option>
// //                   <option value="LinkedIn">LinkedIn</option>
// //                   <option value="Instagram">Instagram</option>
// //                 </select>
// //               </div>

// //               {error && (
// //                 <div className="p-3 text-red-600 bg-red-50 rounded-lg">
// //                   {error}
// //                 </div>
// //               )}

// //               <button
// //                 onClick={generateContent}
// //                 disabled={!prompt.trim() || !platform || loading}
// //                 className="w-full px-4 py-3  text-white rounded-lg bg-gray-600 disabled:opacity-50"
// //               >
// //                 {loading ? "Generating..." : "Generate Content 10 Points"}
// //               </button>
// //             </div>
// //           </div>

// //           {content && (
// //             <div className="bg-card p-6 rounded-lg border ">
// //               <div className="flex justify-between items-center mb-4">
// //                 <h2 className="text-xl font-bold">Generated Content </h2>
// //                 <button
// //                   onClick={copyToClipboard}
// //                   className="p-2 hover:bg-accent rounded-full"
// //                   title="Copy to clipboard"
// //                 >
// //                   <FaRegCopy className="w-5 h-5" />
// //                 </button>
// //               </div>
// //               <div
// //                 id="contentCopy"
// //                 className="prose dark:prose-invert max-w-none"
// //                 dangerouslySetInnerHTML={{ __html: content }}
// //               />
// //             </div>
// //           )}
// //         </div>

// //         {/* History sidebar */}
// //         <div className="bg-card p-6 rounded-lg border h-fit sticky top-24">
// //           <div className="flex items-center justify-between mb-6">
// //             <h2 className="text-xl font-bold">History</h2>
// //             <FaClockRotateLeft className="w-5 h-5" />
// //           </div>

// //           {loadingHistory ? (
// //             <div className="flex justify-center py-8">
// //               <PiSpinnerLight className="animate-spin size-6" />
// //             </div>
// //           ) : (
// //             <div className="space-y-4">
// //               {contentArray.map((item, index) => (
// //                 <div key={index} className="p-4 bg-accent rounded-lg">
// //                   <div className="flex items-center gap-2 font-bold mb-1">
// //                     {item.platform === "X" ? (
// //                       <FaXTwitter />
// //                     ) : item.platform === "Instagram" ? (
// //                       <FaInstagram />
// //                     ) : (
// //                       <FaLinkedinIn />
// //                     )}
// //                     <span>{item.platform}</span>
// //                   </div>
// //                   <p className="line-clamp-2 mb-2">{item.title}</p>
// //                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                     <FaRegClock className="w-3 h-3" />
// //                     <span>{new Date(item.createdAt).toLocaleDateString()}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";
// import { useEffect, useState } from "react";
// import {
//   FaBolt,
//   FaClockRotateLeft,
//   FaInstagram,
//   FaLinkedinIn,
//   FaRegClock,
//   FaXTwitter,
// } from "react-icons/fa6";
// import axios from "axios";
// import { FaRegCopy } from "react-icons/fa6";
// import { PiSpinnerLight } from "react-icons/pi";

// export default function ContentGenerator() {
//   const [prompt, setPrompt] = useState("");
//   const [platform, setPlatform] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loadingHistory, setLoadingHistory] = useState(false);
//   const [contentArray, setContentArray] = useState([]);
//    const [points, setPoints] = useState<number | null>(null);
//   useEffect(() => {
//     setLoadingHistory(true);
//     axios.get("/api/v1/history")
//       .then((res) => {
//         setLoadingHistory(false);
//         setPoints(res.data.remainingPoints)
//         setContentArray(res.data.content);
//       })
//       .catch((err) => {
//         setLoadingHistory(false);
//         console.error("Error fetching history:", err);
//       });
//   }, []);

//   const copyToClipboard = () => {
//     const text = document.getElementById("contentCopy")?.innerText;
//     if (text) {
//       navigator.clipboard.writeText(text).catch((err) => {
//         console.error("Error copying text:", err);
//       });
//     }
//   };

//   async function onClickHandler() {
//     if (!prompt.trim() || !platform) {
//       setError("Please provide both a prompt and platform");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post("/api/v1/generate", { prompt, platform });

//       if (response.data?.content) {
//         setContent(response.data.content);
//       } else {
//         throw new Error("No content received from API");
//       }
//     } catch (error) {
//       console.error("Generation error:", error);
//       setError("Failed to generate content");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="container mx-auto py-6">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main content generation area */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
//               Generate Content
//             </h2>
//              <div className="flex items-center gap-2">
//                 <FaBolt className="text-yellow-500" />
//                 {points !== null ? (
//                   <span className="text-lg font-semibold">{points} Points</span>
//                 ) : (
//                   <PiSpinnerLight className="animate-spin size-5" />
//                 )}
//               </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
//                   Your Prompt
//                 </label>
//                 <textarea
//                   value={prompt}
//                   onChange={(e) => setPrompt(e.target.value)}
//                   className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
//                   rows={4}
//                   placeholder="Enter your content prompt..."
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
//                   Platform
//                 </label>
//                 <select
//                   value={platform}
//                   onChange={(e) => setPlatform(e.target.value)}
//                   className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
//                 >
//                   <option value="">Select platform</option>
//                   <option value="X">Twitter</option>
//                   <option value="LinkedIn">LinkedIn</option>
//                   <option value="Instagram">Instagram</option>
//                 </select>
//               </div>

//               {error && (
//                 <div className="p-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
//                   {error}
//                 </div>
//               )}

//               <button
//                 onClick={onClickHandler}
//                 disabled={!prompt.trim() || !platform || loading}
//                 className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
//                     Generating...
//                   </span>
//                 ) : (
//                   "Generate Content 10 Points"
//                 )}
//               </button>
//             </div>
//           </div>

//           {content && (
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                   Generated Content
//                 </h2>
//                 <button
//                   onClick={copyToClipboard}
//                   className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
//                   title="Copy to clipboard"
//                 >
//                   <FaRegCopy className="w-5 h-5" />
//                 </button>
//               </div>
//               <div
//                 className="prose dark:prose-invert max-w-none"
//                 id="contentCopy"
//                 dangerouslySetInnerHTML={{ __html: content }}
//               />
//             </div>
//           )}
//         </div>

//         {/* History sidebar */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-fit sticky top-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//               History
//             </h2>
//             <FaClockRotateLeft className="w-5 h-5" />
//           </div>

//           {loadingHistory && contentArray.length === 0 && (
//             <div className="flex items-center justify-center py-8">
//               <PiSpinnerLight className="animate-spin size-6" />
//             </div>
//           )}

//           <div className="space-y-4">
//             {contentArray.map(
//               (
//                 thread: {
//                   title: string;
//                   createdAt: string;
//                   platform: string;
//                   content: string;
//                 },
//                 index
//               ) => (
//                 <div
//                   key={index}
//                   className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
//                 >
//                   <div className="flex items-center gap-2 font-bold mb-2">
//                     {thread.platform === "X" ? (
//                       <FaXTwitter />
//                     ) : thread.platform === "Instagram" ? (
//                       <FaInstagram />
//                     ) : thread.platform === "LinkedIn" ? (
//                       <FaLinkedinIn />
//                     ) : (
//                       ""
//                     )}
//                     <div>{thread.platform}</div>
//                   </div>
//                   <div className="mb-2 line-clamp-2">{thread.title}</div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                     <FaRegClock className="w-3 h-3" />
//                     <div>{new Date(thread.createdAt).toLocaleDateString()}</div>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";
import { useEffect, useState } from "react";
import {
    FaBolt,
    FaClockRotateLeft,
    FaInstagram,
    FaLinkedinIn,
    FaRegClock,
    FaXTwitter,
} from "react-icons/fa6";
import axios from "axios";
import { FaRegCopy } from "react-icons/fa6";
import { PiSpinnerLight } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";

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
        axios.get("/api/v1/history")
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

    const handleThreadClick = (content: string) => {
        setSelectedContent(content);
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
                {/* Content Modal */}
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
                                    <IoMdClose className="w-6 h-6" />
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
                                <FaRegCopy />
                                Copy Content
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content generation area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                Generate Content
                            </h2>
                            <div className="flex items-center gap-2 mb-4">
                                <FaBolt className="text-yellow-500" />
                                {points !== null ? (
                                    <span className="text-lg font-semibold">{points} Points</span>
                                ) : (
                                    <PiSpinnerLight className="animate-spin size-5" />
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
                                        "Generate Content 10 Points"
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Current generated content */}
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
                                <FaRegCopy className="w-5 h-5" />
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
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        History
                    </h2>
                    <FaClockRotateLeft className="w-5 h-5" />
                </div>

                {loadingHistory && contentArray.length === 0 && (
                    <div className="flex items-center justify-center py-8">
                        <PiSpinnerLight className="animate-spin size-6" />
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
                                    <FaXTwitter />
                                ) : thread.platform === "Instagram" ? (
                                    <FaInstagram />
                                ) : thread.platform === "LinkedIn" ? (
                                    <FaLinkedinIn />
                                ) : (
                                    ""
                                )}
                                <div>{thread.platform}</div>
                            </div>
                            <div className="mb-2 line-clamp-2">{thread.title}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <FaRegClock className="w-3 h-3" />
                                <div>{new Date(thread.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>

    );
}



// "use client"

// import TwitterEmbed from "@/components/sections/TwitterEmbed"

// export default function () {
//     <div>

//         <h2>Featured Tweet</h2>
//         <TwitterEmbed
//             tweetId="1952805999230009832"
//             className="my-4"
//         />
//     </div>
// }


// 'use client'
// import { useEffect } from 'react'
// import Script from 'next/script'
// import LinkedInPostEmbed from '@/components/sections/LinkedInPostEmbed'
// import InstagramPostEmbed from '@/components/sections/InstagramPostEmbed'
// import { FaLinkedin, FaInstagram } from 'react-icons/fa'
// import { SiX } from 'react-icons/si'

// const SocialMediaEmbeds = () => {
//   useEffect(() => {
//     if (window.twttr) {
//       window.twttr.widgets.load()
//     }
//   }, [])

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       {/* Twitter Widgets Script */}
//       <Script
//         src="https://platform.twitter.com/widgets.js"
//         strategy="lazyOnload"
//         onLoad={() => {
//           if (window.twttr) {
//             window.twttr.widgets.load()
//           }
//         }}
//       />

//       <h1 className="text-3xl font-bold text-center mb-12 text-white">Featured Social Media Posts</h1>
      
//       <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-center">
//         {/* Twitter (X) Embed Card */}
//         <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex-1 min-w-[300px] max-w-[500px]">
//           <div className="p-4 flex items-center space-x-3 border-b border-gray-700">
//             <div className="bg-black p-2 rounded-full">
//               <SiX className="text-white text-xl" />
//             </div>
//             <h2 className="text-xl font-semibold text-white">X Post</h2>
//           </div>
//           <div className="p-4">
//             <blockquote className="twitter-tweet" data-lang="en" data-theme="dark">
//               <a href="https://twitter.com/ig_raunit/status/1952738867200877000"></a>
//             </blockquote>
//           </div>
//         </div>

//         {/* Instagram Embed Card */}
//         <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex-1 min-w-[300px] max-w-[400px]">
//           <div className="p-4 flex items-center space-x-3 border-b border-gray-700">
//             <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-2 rounded-full">
//               <FaInstagram className="text-white text-xl" />
//             </div>
//             <h2 className="text-xl font-semibold text-white">Instagram Post</h2>
//           </div>
//           <div className="p-4">
//             <InstagramPostEmbed postUrl="https://www.instagram.com/p/DMUx-xiTNsc/" />
//           </div>
//         </div>

//         {/* LinkedIn Embed Card */}
//         <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex-1 min-w-[300px] max-w-[500px]">
//           <div className="p-4 flex items-center space-x-3 border-b border-gray-700">
//             <div className="bg-blue-600 p-2 rounded-full">
//               <FaLinkedin className="text-white text-xl" />
//             </div>
//             <h2 className="text-xl font-semibold text-white">LinkedIn Post</h2>
//           </div>
//           <div className="p-4">
//             <LinkedInPostEmbed
//               postUrl="https://www.linkedin.com/posts/sampleuser_post-id"
//               profileName="Saumya"
//               postImage="https://media.licdn.com/dms/image/v2/D5622AQHPX7dCZjoCfA/feedshare-shrink_1280/B56ZhhVKTAG4Ak-/0/1753979600091?e=1757548800&v=beta&t=uJFGvPzyloX8IRwykKTsGH-cM9_9eTL33tRS4gCS-9U"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SocialMediaEmbeds