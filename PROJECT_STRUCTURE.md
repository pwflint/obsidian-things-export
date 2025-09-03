# Obsidian Things 3 Project Export Plugin - Project Structure

## Directory Overview

```
obsidian-things-project-export/
├── src/                          # Source code
│   ├── types.ts                  # TypeScript interfaces and types
│   ├── Settings.ts               # Plugin settings and UI
│   ├── NoteParser.ts             # Markdown parsing logic
│   ├── TaskManager.ts            # Task extraction and management
│   ├── TagHandler.ts             # Tag processing and conversion
│   ├── ThingsExporter.ts         # Things 3 URL scheme integration
│   └── LinkGenerator.ts          # Bidirectional linking
├── docs/                         # Documentation
│   ├── DEVELOPMENT_PLAN.md       # Original development plan
│   ├── PROJECT_SUMMARY.md        # Project status summary
│   ├── TESTING_GUIDE.md          # Testing instructions
│   ├── FIXES_APPLIED.md          # Bug fixes and changes log
│   ├── PLUGIN_READY.md           # Installation and setup guide
│   └── HEADING_SUPPORT_TODO.md   # Future heading support plan
├── scripts/                      # Build and utility scripts
│   ├── update-plugin.sh          # Plugin update script
│   └── version-bump.mjs          # Version management
├── tests/                        # Test files (future)
├── main.ts                       # Main plugin entry point
├── manifest.json                 # Obsidian plugin manifest
├── package.json                  # Node.js dependencies
├── tsconfig.json                 # TypeScript configuration
├── esbuild.config.mjs            # Build configuration
├── styles.css                    # Plugin styles
├── versions.json                 # Obsidian version compatibility
├── .eslintrc                     # ESLint configuration
├── .eslintignore                 # ESLint ignore patterns
├── .gitignore                    # Git ignore patterns
├── README.md                     # Project overview
└── PROJECT_STRUCTURE.md          # This file
```

## File Descriptions

### Source Code (`src/`)
- **`types.ts`**: Defines all TypeScript interfaces for the plugin
- **`Settings.ts`**: Handles plugin settings UI and configuration
- **`NoteParser.ts`**: Parses Obsidian markdown notes and extracts metadata
- **`TaskManager.ts`**: Processes markdown checkboxes into Things 3 tasks
- **`TagHandler.ts`**: Manages tag extraction and conversion for Things 3
- **`ThingsExporter.ts`**: Core export logic using Things 3 URL scheme
- **`LinkGenerator.ts`**: Creates bidirectional links between Obsidian and Things 3

### Documentation (`docs/`)
- **`DEVELOPMENT_PLAN.md`**: Original development roadmap and phases
- **`PROJECT_SUMMARY.md`**: Current project status and accomplishments
- **`TESTING_GUIDE.md`**: Step-by-step testing instructions
- **`FIXES_APPLIED.md`**: Log of bugs fixed and improvements made
- **`PLUGIN_READY.md`**: Installation and setup instructions
- **`HEADING_SUPPORT_TODO.md`**: Detailed plan for future heading support

### Scripts (`scripts/`)
- **`update-plugin.sh`**: Automated script to build and install plugin
- **`version-bump.mjs`**: Utility to update version numbers across files

### Configuration Files
- **`manifest.json`**: Obsidian plugin metadata and requirements
- **`package.json`**: Node.js project configuration and dependencies
- **`tsconfig.json`**: TypeScript compiler settings
- **`esbuild.config.mjs`**: Build system configuration
- **`.eslintrc`**: Code quality and style rules
- **`.eslintignore`**: Files to exclude from linting
- **`.gitignore`**: Files to exclude from version control

### Build Output
- **`main.js`**: Compiled plugin code (generated)
- **`styles.css`**: Plugin styles (copied to Obsidian)

## Development Workflow

### Building the Plugin
```bash
npm run build          # Production build
npm run dev            # Development build with watch
```

### Updating the Plugin
```bash
./scripts/update-plugin.sh    # Build and install to Obsidian
```

### Version Management
```bash
node scripts/version-bump.mjs # Update version numbers
```

## Installation Structure

When installed in Obsidian, the plugin files are copied to:
```
.obsidian/plugins/obsidian-things-project-export/
├── main.js
├── manifest.json
├── styles.css
└── versions.json
```

## Future Structure

### Planned Additions
- **`tests/`**: Unit and integration tests
- **`src/HeadingManager.ts`**: Heading support functionality
- **`src/JsonExporter.ts`**: JSON-based export for complex projects
- **`docs/API.md`**: API documentation
- **`docs/CONTRIBUTING.md`**: Contribution guidelines

### Testing Structure
```
tests/
├── unit/               # Unit tests
├── integration/        # Integration tests
├── fixtures/           # Test data and markdown files
└── helpers/            # Test utilities
```

## Maintenance

### Regular Tasks
- Update dependencies in `package.json`
- Update version compatibility in `versions.json`
- Update documentation in `docs/`
- Run tests before releases
- Update `PROJECT_STRUCTURE.md` when adding new files

### Code Organization
- Keep related functionality in the same file
- Use clear, descriptive file names
- Maintain consistent code style with ESLint
- Document complex logic with comments
- Update types in `types.ts` when adding new interfaces