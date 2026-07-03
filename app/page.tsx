import Clock from "@/components/Clock";
import Dispersion from "@/components/Dispersion";
import GlitchWord from "@/components/GlitchWord";
import Marquee from "@/components/Marquee";
import NavLinks from "@/components/NavLinks";
import PlaceholderLink from "@/components/PlaceholderLink";
import Prism from "@/components/Prism";
import Reveal from "@/components/Reveal";
import {
  capstones,
  changelog,
  credentials,
  principles,
  site,
  wavelengths,
  type BandKey,
} from "@/lib/site";

function BandTags({ lit }: { lit: BandKey[] }) {
  return (
    <span className="tags">
      {wavelengths.map((w) => {
        const on = lit.includes(w.nm);
        return (
          <span key={w.nm} className={`tag t${w.nm}${on ? "" : " off"}`}>
            <i />
            {w.nm}
          </span>
        );
      })}
    </span>
  );
}

export default function Page() {
  return (
    <>
      <header>
        <div className="nav">
          <a className="brand" href="#top">
            {site.brand}
          </a>
          <NavLinks />
          <div className="nav-right">
            <Clock />
            <span className="ver">{site.version} {site.directionName}</span>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ================= HERO — centred, full viewport ================= */}
        <div className="hero">
          <div className="prism-wrap" aria-hidden="true">
            <Prism
              animationType="rotate"
              timeScale={0.35}
              scale={4.0}
              glow={0.85}
              noise={0.15}
              bloom={1.2}
              transparent={true}
              suspendWhenOffscreen={true}
            />
          </div>

          <p className="eyebrow">{site.eyebrow}</p>
          <h1>
            Idea to production,
            <br />
            one engineer,
            <br />
            full <GlitchWord word="SPECTRUM" /><span className="period">.</span>
          </h1>
          <p className="lede">
            I design, build and ship production software <strong>end to end</strong> —
            the interface people touch, the systems underneath, and the cloud and
            intelligence layers bolted on top. Seven-plus years in production. Currently
            building two capstone products in the open to prove the whole pipeline, solo.
          </p>
          <div className="hero-cta">
            <a className="btn primary" href="#capstones">
              View the capstones
            </a>
            <a className="btn" href="#contact">
              Book Q3 2026 →
            </a>
          </div>
          <div className="chips" aria-label="Status">
            {site.chips.map((c, i) => (
              <span key={c} className="chip">
                {i === 0 && <i />}
                {c}
              </span>
            ))}
          </div>

          <a className="scroll-cue" href="#fig01" aria-label="Scroll to the operating spectrum">
            <span className="b" aria-hidden="true" />
            SCROLL DOWN <span className="cue-arrow">↓</span>
          </a>
        </div>

        {/* ================= MARQUEE ================= */}
        <Marquee />

        {/* ================= DISPERSION ================= */}
        <div className="container legend" id="fig01">
          <Dispersion />
        </div>

        {/* ================= CAPSTONES ================= */}
        <section id="capstones">
          <div className="container">
            <Reveal className="sec-head">
              <h2>Capstones</h2>
              <span className="idx">MOD.02 / PROOF OF PIPELINE · BUILT IN THE OPEN</span>
            </Reveal>
            <div className="cap-grid">
              {capstones.map((c) => (
                <Reveal
                  key={c.id}
                  as="article"
                  className="cap"
                  style={{ ["--cap-hue" as never]: `var(--l${c.hue})` }}
                >
                  <div className="cap-meta">
                    <span>{c.id}</span>
                    <span className="status">
                      <i />
                      {c.status}
                    </span>
                  </div>
                  <h3>{c.title}</h3>
                  {c.workingTitle && <p className="wt">WORKING TITLE — NAME PENDING</p>}
                  <p>{c.body}</p>
                  <dl className="spec">
                    <div className="spec-row">
                      <dt>PROVES</dt>
                      <dd>{c.proves}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>EDGE</dt>
                      <dd>{c.edge}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>BANDS</dt>
                      <dd>
                        <BandTags lit={c.bands} />
                      </dd>
                    </div>
                  </dl>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CREDENTIALS ================= */}
        <section id="work">
          <div className="container">
            <Reveal className="sec-head">
              <h2>Credentials</h2>
              <span className="idx">MOD.03 / CERTIFIED · EXAMINED · UPSKILLED</span>
            </Reveal>
            <Reveal className="cred-list">
              {credentials.map((c) => (
                <PlaceholderLink key={c.id} href={c.url} className="cred-row">
                  <span className="cred-id">{c.id}</span>
                  <div>
                    <p className="cred-provider">{c.provider}</p>
                    <h3>
                      {c.title}
                      <span className="cred-type">{c.type}</span>
                    </h3>
                  </div>
                  <span className="cred-year">{c.year}</span>
                  <BandTags lit={c.bands} />
                </PlaceholderLink>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ================= AUGMENTED STACK ================= */}
        <section id="stack">
          <div className="container">
            <Reveal className="sec-head">
              <h2>The augmented stack</h2>
              <span className="idx">MOD.04 / CORE + MODULES</span>
            </Reveal>
            <Reveal className="stack-frame">
              <svg
                viewBox="0 0 760 240"
                role="img"
                aria-label="Diagram: a fullstack core with cloud and AI modules docked on top, plus one empty dock for the next module"
              >
                <g>
                  <rect x="150" y="34" width="170" height="64" rx="6" fill="none" stroke="var(--l470)" strokeWidth="1.2" />
                  <text className="st-label" x="235" y="62" textAnchor="middle">CLOUD</text>
                  <text className="st-sub" x="235" y="80" textAnchor="middle">IaC · CI/CD · ops</text>
                  <line x1="235" y1="98" x2="235" y2="128" stroke="var(--l470)" strokeWidth="1.2" />
                </g>
                <g>
                  <rect x="360" y="34" width="170" height="64" rx="6" fill="none" stroke="var(--l405)" strokeWidth="1.2" />
                  <text className="st-label" x="445" y="62" textAnchor="middle">AI / LLM</text>
                  <text className="st-sub" x="445" y="80" textAnchor="middle">retrieval · agents · evals</text>
                  <line x1="445" y1="98" x2="445" y2="128" stroke="var(--l405)" strokeWidth="1.2" />
                </g>
                <g opacity="0.55">
                  <rect x="570" y="34" width="150" height="64" rx="6" fill="none" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="5 5" />
                  <text className="st-sub" x="645" y="62" textAnchor="middle">NEXT MODULE</text>
                  <text className="st-sub" x="645" y="80" textAnchor="middle">dock reserved</text>
                  <line x1="645" y1="98" x2="645" y2="128" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="4 5" />
                </g>
                <rect x="40" y="128" width="680" height="76" rx="8" fill="var(--bg)" stroke="var(--line)" strokeWidth="1.4" />
                <rect x="40" y="128" width="680" height="3" fill="var(--l520)" opacity="0.8" />
                <text className="st-label" x="72" y="162">FULLSTACK CORE — 7+ YEARS IN PRODUCTION</text>
                <text className="st-sub" x="72" y="184">Next.js · React · TypeScript · Python · SQL / NoSQL · APIs · testing · shipping</text>
              </svg>
              <p className="stack-note">{site.stackNote}</p>
            </Reveal>
          </div>
        </section>

        {/* ================= PRINCIPLES ================= */}
        <section id="principles">
          <div className="container">
            <Reveal className="sec-head">
              <h2>Principles</h2>
              <span className="idx">MOD.05 / HOW I OPERATE</span>
            </Reveal>
            <div className="prin-grid">
              {principles.map((p) => (
                <Reveal key={p.id} className="prin">
                  <span className="num">{p.id}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CHANGELOG ================= */}
        <section id="log">
          <div className="container">
            <Reveal className="sec-head">
              <h2>Changelog</h2>
              <span className="idx">MOD.06 / THIS SITE IS A VERSIONED PRODUCT</span>
            </Reveal>
            <Reveal className="log">
              {changelog.map((l) => (
                <div key={l.v} className={`log-row${l.current ? " current" : ""}`}>
                  <span className="v">{l.v}</span>
                  <span className="d">{l.date}</span>
                  <span className="m">{l.msg}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact">
          <div className="container">
            <Reveal className="contact-frame">
              <div>
                <h2>Booking Q3 2026.</h2>
                <p className="sub">
                  If you need one engineer who can take the whole thing — brief to
                  production — let&apos;s talk scope.
                </p>
                <div className="hero-cta">
                  <PlaceholderLink href={site.links.email} className="btn primary">
                    Email me
                  </PlaceholderLink>
                  <PlaceholderLink href={site.links.linkedin} className="btn">
                    LinkedIn
                  </PlaceholderLink>
                </div>
              </div>
              <div className="op-panel mono">
                {site.opPanel.map((r) => (
                  <div key={r.k} className="op-row">
                    <span className="k">{r.k}</span>
                    <span className={`val${r.hot ? " hot" : ""}`}>{r.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div className="container foot">
          <span>© 2026 ENRIC TRILLO · METASYDE — BUILT AS A VERSIONED PRODUCT</span>
          <span className="links">
            <PlaceholderLink href={site.links.github}>GITHUB</PlaceholderLink>
            <PlaceholderLink href={site.links.x}>X</PlaceholderLink>
            <a href="#top">TOP ↑</a>
          </span>
        </div>
      </footer>
    </>
  );
}
