"""Export src/styles/field-notes/tokens.json to tokens.css (standard library only).

tokens.json is the single source for the Field Notes type, shape, spacing,
layout, frame, motion and the site-only colours (the red action, syntax colours).
The surface, text, brand and band colours come from DISTROS[].look through
src/lib/look.ts, not from here. Run this after editing it:

    python3 scripts/export-tokens.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src/styles/field-notes"
data = json.loads((ROOT / "tokens.json").read_text())


def rem(px):
    return f"{px / 16:g}rem"


def block(selector, props, extra=""):
    body = "\n".join(f"  {name}: {value};" for name, value in props.items())
    return f"{selector} {{\n{extra}{body}\n}}"


t = data["type"]
layout = data["layout"]
frame = data["frame"]

site_colors = {f"--fn-{key}": value for key, value in data["site_colors"].items()}

static = {
    "--fn-font-editorial": '"Newsreader", Georgia, serif',
    "--fn-font-ui": '"Instrument Sans", Arial, sans-serif',
    "--fn-font-code": 'ui-monospace, "SFMono-Regular", "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
    "--fn-text-hero": t["hero"]["size"],
    "--fn-leading-hero": t["hero"]["line_height"],
    "--fn-tracking-hero": f"{t['hero']['tracking_em']}em",
    "--fn-text-headline": f"clamp({rem(t['headline']['min_px'])}, 5vw, {rem(t['headline']['max_px'])})",
    "--fn-leading-headline": t["headline"]["line_height"],
    "--fn-tracking-headline": f"{t['headline']['tracking_em']}em",
    "--fn-text-section": f"clamp({rem(t['section']['min_px'])}, 4.1vw, {rem(t['section']['max_px'])})",
    "--fn-leading-section": t["section"]["line_height"],
    "--fn-tracking-section": f"{t['section']['tracking_em']}em",
    "--fn-text-body": rem(t["body"]["size_px"]),
    "--fn-leading-body": t["body"]["line_height"],
    "--fn-text-lead": rem(t["lead_px"]),
    "--fn-text-action": rem(t["action_px"]),
    "--fn-text-support": rem(t["support_px"]),
    "--fn-text-label": rem(t["label_px"]),
    "--fn-text-kicker": rem(t["kicker_px"]),
    "--fn-radius": f"{data['shape']['radius_px']}px",
    "--fn-rule-width": f"{data['shape']['boundary_width_px']}px",
    "--fn-control-min": f"{data['shape']['control_min_px']}px",
    **{f"--fn-space-{i + 1}": f"{px}px" for i, px in enumerate(data["spacing_px"])},
    "--fn-page-padding": f"{layout['page_padding_px']}px",
    "--fn-index-width": f"{layout['index_px']}px",
    "--fn-index-gutter": f"{layout['index_gutter_px']}px",
    "--fn-reading-max": f"{layout['reading_max_px']}px",
    "--fn-deck-max": f"{layout['deck_max_px']}px",
    "--fn-hero-leaf": f"{layout['hero_leaf_px']}px",
    "--fn-frame-image": f'url("{frame["asset"]}")',
    "--fn-frame-width": frame["width"],
    "--fn-frame-slice": frame["slice"],
    "--fn-duration-control": f"{data['motion']['control_ms']}ms",
    "--fn-ease": data["motion"]["easing"],
    "--fn-lockup-height": f"{data['assets']['lockup_header_height_px']}px",
    "--fn-lockup-height-compact": f"{data['assets']['lockup_compact_height_px']}px",
}

out = [
    "/* Generated from tokens.json by scripts/export-tokens.py. Do not edit by hand. */",
    "/* Surface, text, brand and band colours are emitted per flavour by src/lib/look.ts. */",
    block(":root", {**static, **site_colors, "--fn-brand": "var(--fn-levitate)"}),
    block('[data-product="levitate"]', {"--fn-brand": "var(--fn-levitate)"}),
    block('[data-product="acorn"]', {"--fn-brand": "var(--fn-acorn)"}),
    "@media (prefers-reduced-motion: reduce) {\n"
    + block(":root", {"--fn-duration-control": "0ms"})
    + "\n}",
    "",
]
(ROOT / "tokens.css").write_text("\n".join(out))
print("Exported src/styles/field-notes/tokens.css")
