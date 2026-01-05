# Documentation Generator

**Category**: Build/Dev Tool

An intelligent documentation generator that extracts Python docstrings and enhances them with AI-generated explanations and examples.

## Features (Planned)
- Parse Python files for docstrings
- AI-enhanced documentation with examples
- Multiple output formats (Markdown, HTML, JSON)
- API reference generation
- Usage example generation
- Cross-reference linking
- Searchable documentation site

## Installation

```bash
npm install -g doc-generator
```

## Usage

```bash
dg generate ./src        # Generate docs
dg enhance ./docs        # AI-enhance existing docs
dg serve                 # Serve docs locally
dg build                 # Build static site
```

## Tech Stack
- Node.js + AST parsing
- Workers AI for documentation enhancement
- Marked for Markdown rendering
- Highlight.js for code blocks

## Project Structure

```
DG/
├── src/
│   ├── cli.js          # Entry point
│   ├── parser.js       # Python parser
│   ├── generator.js    # Doc generator
│   └── enhancer.js     # AI enhancer
├── templates/          # Output templates
├── bin/
│   └── dg              # Executable
└── package.json
```

## License

MIT
