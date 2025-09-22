
// export default Page;
// "use client";
// import { useState } from "react";
// import { useUser, useAuth } from "@clerk/nextjs";
// import axios from "axios";
// import { parseMarkdown } from "../lib/markdownParser";

// function Page() {
//   const [prompt, setPrompt] = useState("");
//   const [platform, setPlatform] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const { user } = useUser();
//   const { getToken } = useAuth();

//   async function onClickHandler() {
    // if (!user) {
    //   setError("Please sign in to generate content");
    //   return;
    // }

//     if (!prompt.trim() || !platform) {
//       setError("Please provide both a prompt and platform");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const token = await getToken();
//       if (!token) {
//         throw new Error("Authentication token not available");
//       }

//       const response = await axios.post(
//         "/api/v1/generate",
//         { prompt, platform },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data?.content) {
//         const parsedContent = await parseMarkdown(response.data.content);
//         setContent(parsedContent);
//       } else {
//         throw new Error("No content received from API");
//       }
//     } catch (error) {
//       console.error("Generation error:", error);
//       setError(
//         "Failed to generate content"
//       );
//     }
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="space-y-4">
//           <div>
//             <label className="block mb-2 font-medium">Your Prompt</label>
//             <textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               className="w-full p-2 border rounded"
//               rows={4}
//               placeholder="Enter your content prompt..."
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">Platform</label>
//             <select
//               value={platform}
//               onChange={(e) => setPlatform(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select platform</option>
//               <option value="X">Twitter</option>
//               <option value="LinkedIn">LinkedIn</option>
//               <option value="Instagram">Instagram</option>
//               <option value="Facebook">Facebook</option>
//             </select>
//           </div>

//           {error && (
//             <div className="p-3 text-red-600 bg-red-50 rounded">
//               {error}
//             </div>
//           )}

//           <button
//             onClick={onClickHandler}
//             disabled={!prompt.trim() || !platform || loading}
//             className="px-4 py-2 bg-blue-600  rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Generating...
//               </span>
//             ) : (
//               "Generate Content"
//             )}
//           </button>

//           {content && (
//             <div className="mt-6 p-4 bg-gray-50 rounded">
//               <div dangerouslySetInnerHTML={{ __html: content }} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;

// "use client";
// import { useEffect, useState } from "react";
// import {
//   FaBolt,
//   FaClockRotateLeft,
//   FaInstagram,
//   FaLinkedinIn,
//   FaRegClock,
//   FaXTwitter,
// } from "react-icons/fa6"
// import axios from "axios";
// import { FaRegCopy } from "react-icons/fa6";
// import { PiSpinnerLight } from "react-icons/pi";



// export default function Page() {
//   const [prompt, setPrompt] = useState("");
//   const [platform, setPlatform] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loadingHistory, setLoadingHistory] = useState(false)
//   const [ContentArray, setContentArray] = useState([]);
  

//   useEffect(() => {
//     setLoadingHistory(true);
//     axios.get("/api/v1/history").then((res) => {
//       setLoadingHistory(false);
//       setContentArray(res.data.content);

//       console.log(res.data.content);
//     });
//   }, []);


//   const copytToClipBord = () => {
//     const text = document.getElementById("contentCopy")?.innerText;
//     console.log(text)
//     if (text) {
//       navigator.clipboard
//         .writeText(text)
//         .catch((err) => {
//           console.error("Error in copy text:", err)
//         })
//     }
//   }

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
//     <div className="container mx-auto p-4">


//       <div className="max-w-2xl mx-auto space-y-4">
//         <div>

//           <label className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
//             Your Prompt
//           </label>
//           <textarea
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
//             rows={4}
//             placeholder="Enter your content prompt..."
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
//             Platform
//           </label>
//           <select
//             value={platform}
//             onChange={(e) => setPlatform(e.target.value)}
//             className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
//           >
//             <option value="">Select platform</option>
//             <option value="X">Twitter</option>
//             <option value="LinkedIn">LinkedIn</option>
//             <option value="Instagram">Instagram</option>
//           </select>
//         </div>

//         {error && (
//           <div className="p-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
//             {error}
//           </div>
//         )}

//         <button
//           onClick={onClickHandler}
//           disabled={!prompt.trim() || !platform || loading}
//           className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//         >
//           {loading ? (
//             <span className="flex items-center justify-center gap-2">
//               <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
//               Generating...
//             </span>
//           ) : (
//             "Generate Content"
//           )}
//         </button>

//         {content && (
//           <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
//             <FaRegCopy onClick={copytToClipBord} className="size-8  cursor-pointer " title="Copy" />
//             <div
//               className=" pt-7 dark:prose-invert max-w-none" id="contentCopy"
//               dangerouslySetInnerHTML={{ __html: content }}
//             />
//           </div>
//         )}
        

      
//           <div className="flex flex-col gap-4 border-2 w-full sm:w-1/3 bg-neutral-100 dark:bg-neutral-900 rounded-lg px-4 py-6">Add commentMore actions
//           <div className="flex items-center justify-between text-xl font-bold px-2 md:px-4">
//             <div className="">History</div>
//             <FaClockRotateLeft />
//           </div>

//           {loadingHistory && ContentArray.length == 0 && (
//             <div className="flex items-center justify-center">
//               <PiSpinnerLight className="animate-spin size-6" />
//             </div>
//           )}

//           {/* items */}
//           {ContentArray &&
//             ContentArray.map(
//               (
//                 thread: {
//                   title: string;
//                   createdAt: string;
//                   platform: string;
//                   content: string;
//                 },
//                 index
//               ) => (
//                 <div key={index} className="flex flex-col gap-4">
//                   {/* item */}
//                   <div className="p-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg mx-4 sm:mx-1 md:mx-4 mt-2 border-2">
//                     {/* platform */}
//                     <div className="flex items-center gap-2 font-bold">
//                       {thread.platform == "X" ? (
//                         <FaXTwitter />
//                       ) : thread.platform == "Instagram" ? (
//                         <FaInstagram />
//                       ) : thread.platform == "LinkedIn" ? (
//                         <FaLinkedinIn />
//                       ) : (
//                         ""
//                       )}
//                       <div>{thread.platform}</div>
//                     </div>
//                     {/* title */}
//                     <div className="my-2">{thread.title}</div>

//                     {/* created at */}
//                     <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm sm:text-xs md:text-sm ">
//                       <FaRegClock />
//                       <div>{thread.createdAt.slice(0, 10)}</div>
//                     </div>
//                   </div>
//                 </div>
//               )
//             )}
//         </div>

//       </div>

//     </div>
//   );




// }
