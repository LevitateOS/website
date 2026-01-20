# Contributing to LevitateOS Website

Thanks for your interest in contributing!

## Development Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/LevitateOS/website.git
   cd website
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the dev server:
   ```bash
   bun run dev
   ```

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run type checking (`bun run typecheck`)
5. Run a production build (`bun run build`)
6. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Code style (formatting, etc.)
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

## Code Style

- Use TypeScript for type safety
- Follow existing patterns in the codebase
- Keep components focused and single-purpose

## Questions?

Open an issue or reach out via the main [LevitateOS repository](https://github.com/LevitateOS/LevitateOS).
