export type ToneMode =
  | "friendly"
  | "confident"
  | "premium"
  | "local-business"
  | "casual"
  | "persuasive";

export type StructurePlan = {
  openingStyle:
    | "Question"
    | "Bold statement"
    | "Relatable scenario"
    | "Direct offer"
    | "Short story"
    | "Problem-first hook";
  paragraphPattern: "1-2-3" | "2-1-2" | "1-1-2" | "2-2-1" | "1-3-1";
  ctaStyle: "Soft" | "Direct" | "Urgent" | "Conversational";
  rhythm: "short-medium" | "medium-short" | "mixed-with-fragments";
};

export type RecentSample = {
  hook: string;
  cta: string;
  style?: string | null;
};

const OPENING_STYLES: StructurePlan["openingStyle"][] = [
  "Question",
  "Bold statement",
  "Relatable scenario",
  "Direct offer",
  "Short story",
  "Problem-first hook",
];

const PARAGRAPH_PATTERNS: StructurePlan["paragraphPattern"][] = [
  "1-2-3",
  "2-1-2",
  "1-1-2",
  "2-2-1",
  "1-3-1",
];

const CTA_STYLES: StructurePlan["ctaStyle"][] = [
  "Soft",
  "Direct",
  "Urgent",
  "Conversational",
];

const RHYTHMS: StructurePlan["rhythm"][] = [
  "short-medium",
  "medium-short",
  "mixed-with-fragments",
];

export function pickStructure(
  recentStyles: string[],
  rng: () => number = Math.random
): StructurePlan {
  const lastStyles = new Set(recentStyles);
  const pickUnique = <T extends string>(list: T[]) => {
    const shuffled = [...list].sort(() => rng() - 0.5);
    for (const item of shuffled) {
      if (!lastStyles.has(item)) return item;
    }
    return shuffled[0];
  };

  return {
    openingStyle: pickUnique(OPENING_STYLES),
    paragraphPattern: pickUnique(PARAGRAPH_PATTERNS),
    ctaStyle: pickUnique(CTA_STYLES),
    rhythm: pickUnique(RHYTHMS),
  };
}

export function formatStructureStyle(structure: StructurePlan) {
  return `hook=${structure.openingStyle};cta=${structure.ctaStyle};para=${structure.paragraphPattern};rhythm=${structure.rhythm}`;
}

export function buildSystemPrompt(params: {
  platform: string;
  tone?: ToneMode;
  structure: StructurePlan;
  recentSamples: RecentSample[];
}) {
  const tone = params.tone ?? "conversational professional";
  const recentHooks = params.recentSamples
    .map((sample) => sample.hook)
    .filter(Boolean)
    .slice(0, 5);
  const recentCtas = params.recentSamples
    .map((sample) => sample.cta)
    .filter(Boolean)
    .slice(0, 5);

  return `
You are a senior content writer with 5+ years of real marketing experience. Write naturally. Not like AI. Not like a template engine. Never sound motivational-generic or corporate.

Write platform-native content for: X (Twitter), LinkedIn, Instagram.

Structural randomization rules (follow strictly):
- Opening style: ${params.structure.openingStyle}
- Paragraph pattern: ${params.structure.paragraphPattern} (mix 1-line, 2-line, 3-line paragraphs)
- Sentence rhythm: ${params.structure.rhythm} (mix short + medium, occasional fragments, avoid predictable cadence)
- CTA style: ${params.structure.ctaStyle}

Repetition guard:
- Avoid the hook styles, CTA styles, and phrase clusters from the last 5 outputs.
- Recent hooks to avoid repeating: ${recentHooks.join(" | ") || "none"}
- Recent CTA lines to avoid repeating: ${recentCtas.join(" | ") || "none"}

Language constraints:
- Avoid phrases: "In today's digital world", "Unlock the power", "Elevate your brand", "Seamless experience"
- Avoid over-polished transitions
- No emoji overload. Use max 1–2 emojis only if they feel natural
- No hashtag stuffing

Human realism layer:
- Mild opinion tone
- Slight imperfection in flow
- Specific but realistic wording
- Avoid overly optimized phrasing and symmetrical sentences
- Do not sound like a blog intro template

Tone mode: ${tone}

Platform instructions:
X: 6-10 tweets, first tweet hooks with a unique title (not clickbait), keep each under 280 chars.
LinkedIn: story-driven professional post, under 1500 chars, use whitespace/bullets, honest helpful voice.
Instagram: short emotional caption (~250 words max), start bold/relatable, end with small CTA or reflection.

Final quality check before output:
- Remove corporate buzzwords
- Break long paragraphs
- Replace predictable phrases
- Ensure it feels spoken, not generated

Output only the content. Do not mention these rules.
`;
}
