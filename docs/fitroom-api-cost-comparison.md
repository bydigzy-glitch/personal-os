# Virtual Try-On / Fashion Image API — Cost & Model Comparison

**Researched:** 2026-08-31
**Question:** cheapest good API for Nano Banana Pro, Seedream, Kling/Veo class models for a virtual fitting-room ("fitroom") use case.

> Prices below were gathered from public pricing pages and comparison write-ups in Aug 2026.
> This market re-prices roughly monthly — re-verify on the provider's own pricing page before you
> commit to a plan or hard-code a budget.

---

## TL;DR

There are **two different products** being compared here, and they are not priced the same way:

1. **Dedicated try-on (VTON) models** — Kling Kolors, FASHN, FitRoom, CatVTON.
   Purpose-built garment→person transfer. Cheap, fast, predictable. Weak at preserving
   printed graphics, logos and text on the garment.
2. **General image models** — Nano Banana Pro / 2, Seedream 5.0, Qwen Image Edit.
   Do try-on via reference images + prompting. More expensive per image, higher variance,
   but far better at keeping a front print legible and at producing full campaign imagery
   (scene, lighting, colourways, angles) rather than just "garment on person".

**For a graphic-led streetwear brand, the print is the product**, so garment-detail fidelity
matters more than headline price. The metric that matters is **cost per *usable* image**, not
cost per generation.

**Recommended split stack:**

| Job | Model | ~Cost/image |
|---|---|---|
| Bulk try-on, catalogue fills, colourway variants | Kling Kolors v1.5 | ~$0.07 |
| Bulk edits, background swaps, cheap variants | Nano Banana 2 Lite / Seedream 5.0 Lite | ~$0.034 / $0.035 |
| Hero + campaign shots where the graphic must read | Nano Banana Pro (batch mode) | $0.067–$0.134 |
| Motion / social clips | Kling 2.5 Turbo | ~$0.062/sec |

---

## A. Dedicated virtual try-on APIs

| Service | Model | Price per image | Notes |
|---|---|---|---|
| **Kling Kolors VTON** | v1.5 | **$0.07** (fal, PiAPI, eachlabs); $0.06 (useapi); $0.14 (pixazo) | Cheapest true VTON. Standard rate across most resellers. |
| **FASHN** | v1.6 | **$0.075** on-demand, **<$0.04** at volume / commitment | Best fabric realism in 2026 benchmarks (sequins, silk, one-pieces). Volume tier makes it the cheapest at scale. |
| **FitRoom** | try-on standard | 1 credit = **$0.099–$0.18** | HD = 2 credits. Clothes-checker / model-checker = 0.5 credit each. API access starts at the Pro plan ($29/mo). |
| **CatVTON** | open source | self-host compute only | Best pose preservation in benchmark; flattens fabric texture. |

**FitRoom plan tiers:** Free $0 (10 credits) · Starter $9/mo (50 cr, $0.18/cr) · Pro $29/mo
(200 cr, $0.145/cr) · Business $99/mo (1000 cr, $0.099/cr) · Enterprise custom.
One credit per image regardless of resolution or mode — simpler to forecast than FASHN's
2-credits-per-image on its cheapest setting, but **the most expensive per image of the three**
unless you land an enterprise rate.

---

## B. General image models (try-on via reference images)

### Google — Nano Banana family

| Model | Resolution | Official price | Batch / Flex |
|---|---|---|---|
| **Nano Banana Pro** (Gemini 3 Pro Image) | 1K–2K | $0.134 | $0.067 |
| | 4K | $0.24 | $0.12 |
| **Nano Banana 2** (Gemini 3.1 Flash Image) | 0.5K | $0.045 | $0.022 |
| | 1K | $0.067 | $0.034 |
| | 2K | $0.101 | $0.050 |
| | 4K | $0.151 | $0.076 |
| **Nano Banana 2 Lite** (3.1 Flash-Lite Image) | 1K | **~$0.034** | — |

Third-party resale of Nano Banana Pro: kie.ai $0.09 (1–2K) / $0.12 (4K) · pixazo $0.08 / $0.12 ·
laozhang.ai ~$0.05 flat. See the reseller warning below.

**Batch mode roughly halves the price** and is the single biggest legitimate saving available on
the Pro model — it turns Nano Banana Pro into a $0.067/image model, cheaper than Kling try-on.
Use it for anything that isn't interactive.

**Nano Banana 2 Lite** is the price/quality sweet spot for single-step local edits (recolour,
background swap, small object changes) — ~4s generation vs ~20s for full Nano Banana 2, and it
beats the original full-size Nano Banana on quality. It degrades on multi-reference workflows
and long edit chains; those need Nano Banana 2 or Pro.

### ByteDance — Seedream family

| Model | Provider | Price per image |
|---|---|---|
| **Seedream 5.0 Pro** | OpenRouter | $0.045 std · $0.09 hi-res · $0.003 image input |
| | fal | ~$0.0675 (≤1536²) · $0.135 (≤2048²) |
| **Seedream 5.0 Lite** | OpenRouter | **$0.035** |
| **Seedream 4.0** | kie.ai | **$0.0175** |
| | fal | $0.03 |
| | BytePlus (first-party) | $0.035 |

Seedream 4.0 on kie.ai at $0.0175 is the outright cheapest name-brand option in this list.
Seedream 5.0 Pro trades blows with Nano Banana Pro on realism in 2026 head-to-heads at roughly
a third of the official Google price.

### Others worth knowing

| Model | Provider | Price per image |
|---|---|---|
| Qwen Image Edit | WaveSpeedAI | $0.020 |
| Qwen Image Edit | PiAPI | $0.025 |
| Qwen Image Edit Plus | — | $0.03 |
| FLUX.2 Klein 9B | — | ~$0.015 |
| FLUX Schnell | fal | ~$0.003 |

---

## C. Video ("Kling / Veo")

| Model | Price | Per 5s clip |
|---|---|---|
| **Kling 2.5 Turbo** | ~$0.062/sec | ~$0.31 |
| Kling (range across tiers) | $0.084–$0.168/sec | $0.42–$0.84 |
| **Veo 3.1 Fast** | $0.15/sec | $0.75 |
| **Veo 3.1 Standard** | $0.40/sec | $2.00 |

Kling is **2.4×–6× cheaper** than Veo. Veo's justification is native synchronised audio — if
you're cutting your own music and captions over the clip (which a streetwear brand almost always
is), you're paying a large premium for a soundtrack you'll mute. **Default to Kling 2.5 Turbo.**

---

## D. Worked example — 100 products × 4 images = 400 images

| Option | Cost |
|---|---|
| Seedream 4.0 (kie.ai) | $7.00 |
| Nano Banana 2 Lite | $13.44 |
| Seedream 5.0 Lite | $14.00 |
| Seedream 5.0 Pro | $18.00 |
| Nano Banana Pro (**batch**) | $26.80 |
| Kling Kolors VTON | $28.00 |
| FASHN v1.6 (on-demand) | $30.00 |
| FitRoom (Business) | $39.60 + $99/mo |
| Nano Banana Pro (standard) | $53.60 |
| Nano Banana Pro (4K standard) | $96.00 |

The entire spread here is **under $100**. At this volume, choosing on price is optimising the
wrong variable — a 20% retry rate costs more than the gap between the cheapest and most
expensive option on the list.

---

## E. Quality findings (2026 VTON benchmark, 160 outfit combinations)

Models tested: Kling, FASHN, CatVTON, Qwen, Nano Banana Pro.

- **FASHN** — best on one-pieces and on sequin/silk fabric realism. Can lose patchwork patterns.
- **CatVTON** — the only model that reliably preserves the original pose; flattens fabric into a
  painted look.
- **Nano Banana Pro** — highest variance of the set: some of the best individual results in the
  whole benchmark sitting next to some of the most off-script. Holds texture and sparkle well;
  can subtly warp proportions (e.g. shoes).
- Nano Banana Pro blends up to 14 reference images and leads on text/logo rendering — the
  decisive factor for garments where a front print carries the design.

**Practical consequence:** dedicated VTON models tend to warp printed graphics and text. If the
garment is a plain silhouette, use the cheap VTON. If it carries a print, use Nano Banana Pro
with a reference sheet and accept the retry rate.

---

## F. Provider / routing notes

- **fal.ai** — best try-on catalogue, typically 30–50% cheaper than Replicate, reliable. Good default.
- **OpenRouter** — one key across Seedream + Gemini image models; easiest for A/B testing models.
- **kie.ai / WaveSpeed / PiAPI / CometAPI** — cheaper again; WaveSpeed advertises 99.99% uptime
  and SOC 2 Type II. Reasonable for production if you keep a fallback.
- **Google AI Studio / Vertex direct** — highest price, but batch mode halves it and you get a
  real SLA and data-handling terms.

**Reseller warning:** the sub-$0.06 Nano Banana Pro offers (laozhang.ai, aifreeapi and similar)
are grey-market proxy resellers. No SLA, unclear data handling, prices and availability that move
without notice, and they can breach the upstream provider's terms. Fine for experimentation;
do not put customer-facing brand infrastructure behind them.

**Architecture advice:** route everything through one aggregator behind a thin internal wrapper
so switching models is a config change, not a rewrite. This market re-prices monthly — the ability
to swap providers cheaply is worth more than any single provider's current discount.

---

## Sources

- https://www.myarchitectai.com/blog/nano-banana-api-pricing
- https://pricepertoken.com/pricing-page/model/google-gemini-3-pro-image-preview
- https://openrouter.ai/google/gemini-3.1-flash-image
- https://openrouter.ai/bytedance-seed/seedream-5-0-pro
- https://openrouter.ai/bytedance-seed/seedream-5-0-lite
- https://www.eesel.ai/blog/nano-banana-2-lite-pricing
- https://www.eesel.ai/blog/nano-banana-2-lite-review
- https://deepmind.google/models/gemini-image/flash-lite/
- https://fal.ai/models/fal-ai/bytedance/seedream/v4/text-to-image
- https://fal.ai/models/fal-ai/kling/v1-5/kolors-virtual-try-on
- https://fal.ai/models/fal-ai/fashn/tryon/v1.6
- https://fal.ai/learn/tools/best-virtual-try-on-apis-2026
- https://fashn.ai/blog/pricing-update-for-developer-api
- https://fitroom.app/api-pricing
- https://www.ionio.ai/blog/vton
- https://piapi.ai/docs/kling-api/virtual-try-on-api
- https://renderful.ai/blog/kling-api-pricing
- https://www.aifreeapi.com/en/posts/veo-3-1-pricing
- https://costbench.com/software/ai-media-apis/kling-api/
- https://wavespeed.ai/models/wavespeed-ai/qwen-image/edit
- https://www.atlascloud.ai/blog/guides/cheapest-ai-image-generation-api-2026
