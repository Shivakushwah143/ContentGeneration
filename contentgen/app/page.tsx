"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  type LucideIcon,
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

type HistoryItem = {
  title: string;
  createdAt: string;
  platform: string;
  content: string;
};

const PLATFORM_META: Record<string, { label: string; Icon: LucideIcon }> = {
  X: { label: "X", Icon: Twitter },
  LinkedIn: { label: "LinkedIn", Icon: Linkedin },
  Instagram: { label: "Instagram", Icon: Instagram },
};

const PROMPT_CATEGORIES = [
  {
    title: "Business Promotion",
    prompts: [
      "Write an Instagram post announcing our new product launch with excitement and a limited-time offer.",
      "Create a Facebook post promoting our weekend discount for local customers.",
      "Write a WhatsApp broadcast message for customers about our new service.",
    ],
  },
  {
    title: "Small Shop / Local Business",
    prompts: [
      "Create a promotional post for my clothing store’s festive sale.",
      "Write a post inviting customers to visit our new café in town.",
      "Write a simple Google My Business update about our new store timings.",
    ],
  },
  {
    title: "Service-Based Business",
    prompts: [
      "Write a LinkedIn post introducing our digital marketing services for small businesses.",
      "Create a professional post promoting our home cleaning services.",
      "Write a short post explaining why customers should choose our repair service.",
    ],
  },
  {
    title: "Engagement / Growth",
    prompts: [
      "Write a post asking followers to share their feedback about our product.",
      "Create a social media giveaway announcement post.",
      "Write a post encouraging customers to leave a review.",
    ],
  },
  {
    title: "Simple & Safe",
    prompts: [
      "Write a professional social media post promoting my business in a friendly tone with a clear call-to-action.",
    ],
  },
];

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [contentArray, setContentArray] = useState<HistoryItem[]>([]);
  const [points, setPoints] = useState<number | null>(null);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [promptSearch, setPromptSearch] = useState("");
  const [plan, setPlan] = useState<"FREE" | "PRO" | "BUSINESS">("FREE");
  const [showLimitModal, setShowLimitModal] = useState(false);

  const quickPrompts = useMemo(
    () => PROMPT_CATEGORIES.flatMap((category) => category.prompts).slice(0, 6),
    []
  );

  const filteredPromptCategories = useMemo(() => {
    const query = promptSearch.trim().toLowerCase();
    if (!query) {
      return PROMPT_CATEGORIES;
    }
    return PROMPT_CATEGORIES.map((category) => ({
      ...category,
      prompts: category.prompts.filter((promptOption) =>
        promptOption.toLowerCase().includes(query)
      ),
    })).filter((category) => category.prompts.length > 0);
  }, [promptSearch]);

  useEffect(() => {
    setLoadingHistory(true);
    axios
      .get("/api/v1/history")
      .then((res) => {
        setLoadingHistory(false);
        setPoints((res.data as any).remainingPoints);
        if ((res.data as any).plan) {
          setPlan((res.data as any).plan);
        }
        setContentArray((res.data as any).content || []);
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

  async function onClickHandler() {
    if (!prompt.trim() || !platform) {
      setError("Please provide both a prompt and platform");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/v1/generate", { prompt, platform });

      if ((response.data as any)?.content) {
        setContent((response.data as any).content);
        if (typeof (response.data as any).remainingPoints === "number") {
          setPoints((response.data as any).remainingPoints);
        }
        if ((response.data as any).plan) {
          setPlan((response.data as any).plan);
        }
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

  useEffect(() => {
    if (points === 0) {
      setShowLimitModal(true);
    }
  }, [points]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10 grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-sm text-muted-foreground">
            Production-ready generator
          </div>
          <h1 className="text-4xl font-semibold">Generate campaign-ready posts in minutes</h1>
          <p className="text-muted-foreground">
            Provide a clear prompt, pick a platform, and get structured content you can publish immediately.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background/70 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Available credits</div>
            <div className="flex items-center gap-2 rounded-full bg-muted/60 px-3 py-1 text-sm font-medium">
              <Bolt className="h-4 w-4 text-amber-500" />
              {points === null ? <Loader2 className="h-4 w-4 animate-spin" /> : `${points} credits`}
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Each generation costs 1 credit. Upgrade for more.
          </div>
          {plan !== "FREE" && points !== null && points <= 10 ? (
            <div className="mt-2 text-xs text-muted-foreground">
              You’re running low on credits. Consider upgrading.
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Generator</h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock3 className="h-4 w-4" />
                Average output in 10s
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Quick prompts
                </div>
                <button
                  type="button"
                  onClick={() => setShowPromptModal(true)}
                  className="text-xs font-medium text-primary hover:opacity-80"
                >
                  View All Prompts
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickPrompts.map((promptOption) => (
                  <button
                    key={promptOption}
                    type="button"
                    onClick={() => setPrompt(promptOption)}
                    className="shrink-0 rounded-full border border-border/60 bg-muted/40 px-4 py-2 text-xs text-muted-foreground transition hover:text-foreground"
                  >
                    {promptOption}
                  </button>
                ))}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Your Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[140px] w-full rounded-xl border border-border/60 bg-background/70 p-4 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Example: Write a LinkedIn post announcing our new AI feature with a confident but friendly tone."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full rounded-xl border border-border/60 bg-background/70 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">Select platform</option>
                  <option value="X">X</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Instagram">Instagram</option>
                </select>
              </div>

              {error ? (
                <div className="rounded-xl border border-red-300/40 bg-red-50/60 p-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {plan === "FREE" && points !== null && points <= 5 ? (
                <div className="rounded-xl border border-border/60 bg-muted/40 p-3 text-sm text-muted-foreground">
                  <div>Only {points} posts left this month.</div>
                  <div>Upgrade to continue generating without limits.</div>
                  <button
                    type="button"
                    onClick={() => setShowLimitModal(true)}
                    className="mt-2 text-sm font-semibold text-primary"
                  >
                    Upgrade Now
                  </button>
                </div>
              ) : null}

              <button
                onClick={onClickHandler}
                disabled={!prompt.trim() || !platform || loading || points === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Content"
                )}
              </button>
            </div>
          </div>

          {content ? (
            <div className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Generated Content</h2>
                <button
                  onClick={copyToClipboard}
                  className="rounded-full border border-border/60 p-2 text-muted-foreground transition hover:text-foreground"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div
                className="prose mt-4 max-w-none dark:prose-invert"
                id="contentCopy"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent History</h2>
              <History className="h-4 w-4 text-muted-foreground" />
            </div>

            {loadingHistory && contentArray.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {contentArray.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border/80 bg-muted/30 p-4 text-sm text-muted-foreground">
                    Your history will appear here after the first generation.
                  </div>
                ) : (
                  contentArray.map((thread, index) => {
                    const meta = PLATFORM_META[thread.platform] || {
                      label: thread.platform,
                      Icon: Twitter,
                    };
                    const Icon = meta.Icon;
                    return (
                      <div
                        key={index}
                        className="rounded-xl border border-border/60 bg-muted/30 p-4 transition hover:bg-muted/50"
                      >
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                          <Icon className="h-4 w-4" />
                          {meta.label}
                        </div>
                        <div className="line-clamp-2 text-sm">{thread.title}</div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {new Date(thread.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Tips for better output</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>Share a clear outcome and desired tone.</li>
              <li>Include target audience and CTA.</li>
              <li>Mention any product features or deadlines.</li>
            </ul>
          </div>
        </div>
      </div>

      {showPromptModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="w-full max-w-3xl rounded-2xl border border-border/60 bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div>
                <h3 className="text-lg font-semibold">Prompt Library</h3>
                <p className="text-sm text-muted-foreground">
                  Click any prompt to prefill the generator.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPromptModal(false)}
                className="rounded-full border border-border/60 p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close prompt library"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4">
              <input
                type="search"
                value={promptSearch}
                onChange={(event) => setPromptSearch(event.target.value)}
                placeholder="Search prompts by outcome, platform, or intent..."
                className="w-full rounded-xl border border-border/60 bg-background/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="mt-6 space-y-6">
              {filteredPromptCategories.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/60 bg-muted/30 p-6 text-sm text-muted-foreground">
                  No prompts match your search. Try a broader keyword like “launch” or “discount”.
                </div>
              ) : (
                filteredPromptCategories.map((category) => (
                  <div key={category.title} className="space-y-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {category.title}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.prompts.map((promptOption) => (
                        <button
                          key={promptOption}
                          type="button"
                          onClick={() => {
                            setPrompt(promptOption);
                            setShowPromptModal(false);
                          }}
                          className="rounded-full border border-border/60 bg-muted/40 px-4 py-2 text-xs text-muted-foreground transition hover:text-foreground"
                        >
                          {promptOption}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}

      {showLimitModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="w-full max-w-md rounded-2xl border border-border/60 bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">You’ve reached your free limit</h3>
              <button
                type="button"
                onClick={() => setShowLimitModal(false)}
                className="rounded-full border border-border/60 p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close limit modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Upgrade your plan to continue generating posts this month.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setShowLimitModal(false);
                  window.location.href = "/pricing";
                }}
                className="w-full rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                Upgrade Now
              </button>
              <button
                type="button"
                onClick={() => setShowLimitModal(false)}
                className="w-full rounded-xl border border-border/60 px-4 py-3 text-sm font-semibold text-muted-foreground"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
