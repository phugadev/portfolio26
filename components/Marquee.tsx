"use client";

const ITEMS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "PostgreSQL", "Redis", "REST · GraphQL", "AWS", "GCP",
  "Docker", "Terraform", "CI / CD", "OpenAI API", "Anthropic SDK",
  "Audio DSP", "LLM Agents", "Figma", "Playwright", "Vitest",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-outer" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
