# Base UI React Library Guide

This document summarizes key learnings about Base UI, the unstyled React component library used in this project.

## Overview

Base UI (`@base-ui/react`) is a library of high-quality, unstyled React components designed to be composable and styling agnostic. It provides accessible, customizable primitives that work with any styling approach (Tailwind, CSS Modules, CSS-in-JS, etc.).

## Installation

```bash
npm i @base-ui/react
```

The library is tree-shakable - only imported components are bundled.

## Core Concepts

### 1. Component Assembly Pattern

Base UI uses a composition model where components are assembled from specialized sub-components:

```tsx
<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Content</Popover.Description>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

### 2. The `render` Prop Pattern

The primary method for composing custom components with Base UI. Critical requirements:
- Custom components **must forward the ref**
- Custom components **must spread all received props** onto their underlying DOM node

```tsx
// Using render prop with custom component
<Menu.Trigger render={<MyButton size="md" />}>
  Open menu
</Menu.Trigger>

// Changing default rendered element
<Menu.Item render={<a href="/link" />}>
  Link Item
</Menu.Item>
```

### 3. Render Functions (Performance Optimization)

For performance-critical code, pass a function to access component state:

```tsx
<Switch.Thumb
  render={(props, state) => (
    <span {...props}>
      {state.checked ? <CheckedIcon /> : <UncheckedIcon />}
    </span>
  )}
/>
```

## TypeScript Integration

### Namespace Type Organization

Base UI organizes types using namespaces. Every component exposes:

- **`Component.SubComponent.Props`** - All props accepted by the component
- **`Component.SubComponent.State`** - Internal component state

### Creating Typed Wrapper Components

```tsx
import { Tooltip } from '@base-ui/react/tooltip';

// Use the Props type for full compatibility
function MyTooltip(props: Tooltip.Root.Props) {
  return <Tooltip.Root {...props} />;
}
```

### Event Types

Components export event-related types:
- **`ChangeEventDetails`** - Object passed to `onValueChange`, `onOpenChange` handlers
- **`ChangeEventReason`** - Union of reason strings explaining state changes

### Actions Ref (Imperative Methods)

Popup components expose imperative methods via `actionsRef`:

```tsx
const actionsRef = useRef<Menu.Root.Actions | null>(null);

// Later: actionsRef.current?.open()
```

## Navigation Menu Component

### Sub-Components

| Component | Renders | Purpose |
|-----------|---------|---------|
| `Root` | `<nav>` or `<div>` | Main container, manages state |
| `List` | `<ul>` | Contains navigation items |
| `Item` | `<li>` | Individual menu item |
| `Trigger` | `<button>` | Opens popup on hover/click |
| `Icon` | varies | Visual indicator (chevron) |
| `Content` | varies | Menu item content |
| `Link` | `<a>` | Navigation link |
| `Portal` | portal | Moves popup to different DOM location |
| `Positioner` | `<div>` | Positions popup with collision detection |
| `Popup` | `<nav>` | Visible menu container |
| `Viewport` | `<div>` | Clipping viewport |
| `Arrow` | `<div>` | Directional pointer |

### Example Usage

```tsx
import { NavigationMenu } from '@base-ui/react/navigation-menu';

<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>
        Overview
        <NavigationMenu.Icon>
          <ChevronDownIcon />
        </NavigationMenu.Icon>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        {/* Content */}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

### Positioner CSS Variables

The Positioner exposes CSS variables for animations:
- `--available-height`
- `--available-width`
- `--transform-origin`

## Setup Requirements

### Portal Stacking Context

Add CSS to prevent z-index conflicts:

```css
.root {
  isolation: isolate;
}
```

### iOS Safari Support

For Safari on iOS 26+:

```css
body {
  position: relative;
}
```

## Common Issues & Solutions

### Ref Type Mismatches

Base UI components render specific HTML elements (`<ul>`, `<li>`, `<span>`, etc.) with corresponding ref types. When TypeScript complains about ref incompatibility, it's because the component's internal element type doesn't match what's expected.

**Solution**: Use `@ts-expect-error` for known library type issues, or use the `render` prop to explicitly control the rendered element.

### asChild Pattern (Not Supported)

Base UI does NOT support the Radix-style `asChild` prop. Instead, use the `render` prop:

```tsx
// ❌ Wrong (Radix pattern)
<Button asChild>
  <a href="/link">Link</a>
</Button>

// ✅ Correct (Base UI pattern)
<Button render={<a href="/link" />}>
  Link
</Button>
```

For anchor tags with button styling, apply classes directly:

```tsx
import { buttonVariants } from "@/components/ui/button";

<a href="/link" className={buttonVariants({ variant: "outline" })}>
  Link
</a>
```

## Documentation Resources

- Main docs: https://base-ui.com/react/overview/quick-start
- Each page has "View as Markdown" link for AI assistants
- LLM navigation file: https://base-ui.com/llms.txt

## ESLint Configuration for shadcn/Base UI

### Common Issues with Generated Components

shadcn UI components are generated code that may trigger ESLint errors:

1. **`@typescript-eslint/no-unnecessary-condition`** - "Unnecessary optional chain on a non-nullish value"
   - shadcn uses defensive optional chaining for runtime safety
   - TypeScript's strict analysis may flag these as unnecessary

2. **`no-shadow`** - Variables shadowing outer scope
   - Common in render callbacks where `className` and `props` are reused
   - This is intentional in shadcn's design

### Solution: ESLint Config Override

Add overrides for the UI components folder in `eslint.config.js`:

```javascript
export default [
  ...yourConfig,
  // Relax rules for shadcn UI components (generated code)
  {
    files: ['src/components/ui/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'no-shadow': 'off',
    },
  },
]
```

### Import Order Rules

The project uses strict import ordering. Follow this pattern:

```typescript
// 1. External packages (alphabetical)
import { SomeIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useSomeHook } from "usehooks-ts";

// 2. Internal imports (with blank line separator)
import { MyComponent } from "@/components/MyComponent";
import { buttonVariants } from "@/components/ui/button";
```

### Sort Imports

Within a single import statement, members should be alphabetically sorted:

```typescript
// ✅ Correct
import { Apple, Banana, Cherry } from "fruits";

// ❌ Wrong
import { Cherry, Apple, Banana } from "fruits";
```

## Development Tooling

This project uses modern Rust-based tools for maximum speed:

### Tools Installed

| Tool | Purpose | Speed |
|------|---------|-------|
| **oxlint** | Linting (Rust-based) | 50-100x faster than ESLint |
| **Biome** | Formatting, import organization | 15-20x faster than Prettier |
| **TypeScript** | Type checking | - |

**Note:** ESLint and Prettier have been removed in favor of the faster Rust-based alternatives.

### Package.json Scripts

```bash
npm run lint         # Run oxlint (16ms for 75 files!)
npm run lint:fix     # Fix lint issues
npm run format       # Format code with Biome
npm run format:check # Check formatting without changes
npm run typecheck    # Run TypeScript type checking
npm run check        # Full check: typecheck + lint + format (CI-ready)
npm run check:fix    # Fix all lint and format issues
npm run ci           # CI-optimized check command
```

### Performance

```
oxlint:  16ms for 75 files (90 rules, 16 threads)
Biome:   13ms for 75 files formatting
Total:   ~30ms for full lint + format check
```

### Biome Configuration

The `biome.json` is configured for:
- Tab indentation (matching existing code)
- Double quotes for strings
- Optional semicolons
- Tailwind CSS v4 syntax support (`css.parser.tailwindDirectives: true`)
- Auto-generated files excluded (`routeTree.gen.ts`)

### Why Rust-Based Tools?

1. **oxlint** - 50-100x faster than ESLint, covers most common rules
2. **Biome** - Replaces both ESLint (for some rules) and Prettier
3. **TypeScript** - Full type checking (can't be replaced)

This setup gives you sub-second feedback during development.

## Sources

- [Navigation Menu · Base UI](https://base-ui.com/react/components/navigation-menu)
- [Quick start · Base UI](https://base-ui.com/react/overview/quick-start)
- [Menu · Base UI](https://base-ui.com/react/components/menu)
- [no-unnecessary-condition | typescript-eslint](https://typescript-eslint.io/rules/no-unnecessary-condition/)
- [shadcn/ui ESLint conflicts](https://www.answeroverflow.com/m/1182697169413750804)
- [Oxlint Documentation](https://oxc.rs/docs/guide/usage/linter.html)
- [Biome Getting Started](https://biomejs.dev/guides/getting-started/)
- [Biome vs ESLint Comparison](https://betterstack.com/community/guides/scaling-nodejs/biome-eslint/)
