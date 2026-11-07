"""Export the canonical JSON tokens to CSS; standard library only."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src/styles/field-notes"
data = json.loads((ROOT / "tokens.json").read_text())

def declarations(values, prefix=""):
    return "\n".join(f"  --fn-{prefix}{key}: {value};" for key, value in values.items())

lines = ["/* Generated from tokens.json by scripts/export-tokens.py. */", ":root {"]
for group in ["font", "space", "radius", "layout", "motion", "control", "shadow"]:
    lines.append(declarations(data[group], group + "-"))
for role, props in data["type"].items():
    lines.append(declarations({"size": props["size"], "leading": props["lineHeight"], "tracking": props["tracking"], "weight": props["weight"], "family": f"var(--fn-font-{props['family']})"}, "type-" + role + "-"))
lines.extend(["}", ":root, [data-theme=\"light\"] {", "  color-scheme: light;", declarations(data["theme"]["light"]), "}"])
lines.extend(["[data-theme=\"dark\"] {", "  color-scheme: dark;", declarations(data["theme"]["dark"]), "}"])
lines.extend(["@media (prefers-color-scheme: dark) {", "  :root:not([data-theme=\"light\"]):not([data-theme=\"dark\"]), [data-theme=\"system\"] {", "    color-scheme: dark;", declarations(data["theme"]["dark"]), "  }", "}"])
lines.extend(["@media (prefers-reduced-motion: reduce) {", "  :root {", "    --fn-motion-fast: 0ms;", "    --fn-motion-normal: 0ms;", "    --fn-motion-panel: 0ms;", "  }", "}", ""])
(ROOT / "tokens.css").write_text("\n".join(lines))
print("Exported src/styles/field-notes/tokens.css")
