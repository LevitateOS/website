"""Export src/styles/field-atlas/tokens.json to tokens.css (standard library only).

tokens.json is the single source for the Field Atlas palette, type, shape,
spacing, layout and motion. Run this after editing it:

    python3 scripts/export-tokens.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src/styles/field-atlas"
data = json.loads((ROOT / "tokens.json").read_text())


def rem(px):
    value = px / 16
    return f"{value:g}rem"


def block(selector, props, extra=""):
    body = "\n".join(f"  {name}: {value};" for name, value in props.items())
    return f"{selector} {{\n{extra}{body}\n}}"


def palette(mode):
    return {f"--fa-{key}": value for key, value in data["palette"][mode].items()}


t = data["type"]
layout = data["layout"]
motion = data["motion"]
shape = data["shape"]

static = {
    "--fa-font-editorial": '"Newsreader", Georgia, serif',
    "--fa-font-ui": '"Instrument Sans", Arial, sans-serif',
    "--fa-font-code": 'ui-monospace, "SFMono-Regular", "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
    "--fa-text-hero": f"clamp({rem(t['headline']['min_px'])}, 5.7vw, {rem(t['headline']['max_px'])})",
    "--fa-leading-hero": t["headline"]["line_height"],
    "--fa-tracking-hero": f"{t['headline']['tracking_em']}em",
    "--fa-weight-hero": t["headline"]["weight"],
    "--fa-text-section": rem(t["section"]["size_px"]),
    "--fa-leading-section": t["section"]["line_height"],
    "--fa-text-reading-section": rem(27),
    "--fa-text-body": rem(t["body"]["size_px"]),
    "--fa-leading-body": t["body"]["line_height"],
    "--fa-text-lead": rem(17),
    "--fa-text-action": rem(t["action"]["size_px"]),
    "--fa-weight-action": t["action"]["weight"],
    "--fa-text-support": rem(t["support_px"]),
    "--fa-text-label": rem(t["label_px"]),
    "--fa-text-eyebrow": rem(t["nonessential_eyebrow_px"]),
    "--fa-radius-control": f"{shape['control_radius_px']}px",
    "--fa-radius-popover": f"{shape['popover_radius_px']}px",
    "--fa-rule-width": f"{shape['boundary_width_px']}px",
    **{f"--fa-space-{i + 1}": f"{px}px" for i, px in enumerate(data["spacing_px"])},
    "--fa-page-padding": f"{layout['desktop_page_padding_px']}px",
    "--fa-index-width": f"{layout['desktop_index_px']}px",
    "--fa-index-gutter": f"{layout['desktop_index_gutter_px']}px",
    "--fa-reading-max": f"{layout['reading_max_px']}px",
    "--fa-duration-control": f"{motion['control_ms']}ms",
    "--fa-duration-reveal": f"{motion['reveal_ms']}ms",
    "--fa-ease": motion["easing"],
    "--fa-lockup-height": f"{data['assets']['lockup_header_height_px']}px",
    "--fa-lockup-height-compact": f"{data['assets']['lockup_mobile_height_px']}px",
}

light = {**palette("paper"), "--fa-brand": "var(--fa-levitate)"}
dark = {**palette("night"), "--fa-brand": "var(--fa-levitate)"}

out = [
    "/* Generated from tokens.json by scripts/export-tokens.py. Do not edit by hand. */",
    block(":root", static),
    block(':root, :root[data-theme="light"]', light, "  color-scheme: light;\n"),
    block(':root[data-theme="dark"]', dark, "  color-scheme: dark;\n"),
    "@media (prefers-color-scheme: dark) {\n"
    + block(':root:not([data-theme="light"]):not([data-theme="dark"])', dark, "  color-scheme: dark;\n")
    + "\n}",
    block('[data-product="acorn"]', {"--fa-brand": "var(--fa-acorn)"}),
    "@media (prefers-reduced-motion: reduce) {\n"
    + block(":root", {"--fa-duration-control": "0ms", "--fa-duration-reveal": "0ms"})
    + "\n}",
    "",
]
(ROOT / "tokens.css").write_text("\n".join(out))
print("Exported src/styles/field-atlas/tokens.css")
