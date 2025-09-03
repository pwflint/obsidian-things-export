# Things 3 Project Export Plugin for Obsidian

An enhanced Obsidian plugin that exports notes to Things 3 as complete projects, including tasks, tags, notes, and metadata. This plugin builds upon the original [obsidian-things-link](https://github.com/pwflint/obsidian-things-link) plugin with significantly expanded functionality.

## Features

### Core Functionality
- **Export Notes as Projects**: Convert Obsidian notes into complete Things 3 projects
- **Task Parsing**: Automatically parse markdown checkboxes into Things 3 tasks
- **Tag Integration**: Extract and apply tags from frontmatter and inline content
- **Bidirectional Linking**: Maintain links between Obsidian notes and Things 3 projects
- **Metadata Support**: Export project metadata including dates, status, and descriptions

### Advanced Features
- **Nested Tasks**: Support for subtasks through indentation
- **Due Dates**: Parse and set due dates for tasks
- **Notes Export**: Include note content as project notes in Things 3
- **Tag Mapping**: Map Obsidian tags to Things 3 tags
- **Auto-sync**: Automatically sync changes when notes are saved
- **Custom Settings**: Configurable export behavior and preferences

## Installation

### Quick Installation (Recommended)
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `./scripts/update-plugin.sh` to build and install the plugin
4. Enable the plugin in Obsidian's Community Plugins settings

### Manual Installation
1. Download the latest release from the [releases page](https://github.com/pwflint/obsidian-things-project-export/releases)
2. Extract the files to your Obsidian vault's `.obsidian/plugins/obsidian-things-project-export/` directory
3. Enable the plugin in Obsidian's Community Plugins settings

### Development Installation
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to build the plugin in development mode
4. Use `./scripts/update-plugin.sh` to deploy to Obsidian

## Usage

### Basic Export
1. Open a note in Obsidian that contains your project information
2. Use the Command Palette (Ctrl/Cmd + P) and search for "Export Note as Things Project"
3. The plugin will parse your note and create a corresponding project in Things 3

### Note Structure
Your Obsidian notes should follow this structure for optimal results:

```markdown
---
title: Project Name
start date: 2025-01-15
end date: 2025-02-15
status: In Progress
keywords: ["project", "work"]
tags: ["work", "important"]
aliases: ["Project Alias"]
---

# Project Name

Project description and context information.

## Tasks
- [ ] Create project plan
- [ ] Set up development environment
- [ ] Implement core features
- [x] Complete initial research

## Notes
Additional project notes and information.
```

### Commands
- **Export Note as Things Project**: Export the current note as a Things 3 project
- **Export Selected Tasks**: Export only selected tasks (coming soon)
- **Sync Project Status**: Sync changes between Obsidian and Things 3 (coming soon)

## Configuration

Access the plugin settings through Obsidian's Settings → Community Plugins → Things 3 Project Export.

### Available Settings
- **Default Project Area**: Set the default area in Things 3 for new projects
- **Tag Mapping**: Map Obsidian tags to Things 3 tags
- **Date Format**: Configure date parsing format
- **Auto-sync**: Enable automatic syncing on note save
- **Include Notes**: Include note content as project notes
- **Create Tags**: Automatically create new tags in Things 3
- **Preserve Formatting**: Maintain markdown formatting in exports

## Project Structure

```
obsidian-things-project-export/
├── src/                    # Source code (TypeScript)
├── docs/                   # Documentation and guides
├── scripts/                # Build and utility scripts
├── tests/                  # Test files (future)
├── main.ts                 # Plugin entry point
├── manifest.json           # Obsidian plugin configuration
└── package.json            # Dependencies and scripts
```

### Key Documentation
- **Installation**: `docs/PLUGIN_READY.md`
- **Testing**: `docs/TESTING_GUIDE.md`
- **Development**: `docs/DEVELOPMENT_PLAN.md`
- **Quick Reference**: `docs/QUICK_REFERENCE.md`

## Requirements

- **Obsidian**: Version 0.15.0 or higher
- **Things 3**: macOS/iOS app installed and accessible
- **Desktop Only**: This plugin requires desktop access for Things 3 integration

## How It Works

The plugin uses Things 3's URL scheme to create projects and tasks. When you export a note:

1. **Parse Content**: The plugin extracts metadata, tasks, tags, and notes from your Obsidian note
2. **Create Project**: A new project is created in Things 3 with the extracted metadata
3. **Add Tasks**: Individual tasks are created within the project
4. **Apply Tags**: Tags are created and applied to the project and tasks
5. **Generate Links**: Bidirectional links are created between Obsidian and Things 3

## Troubleshooting

### Common Issues

**Things 3 doesn't open when exporting**
- Ensure Things 3 is installed and accessible
- Check that the Things 3 URL scheme is working
- Try manually opening Things 3 first

**Tasks aren't being parsed correctly**
- Ensure your tasks use the standard checkbox format: `- [ ]` or `- [x]`
- Check that tasks are properly indented for subtasks
- Verify your note structure matches the expected format

**Tags aren't being created**
- Check your tag mapping settings
- Ensure tags follow the expected format
- Verify Things 3 can create new tags

### Getting Help

If you encounter issues:
1. Check the [troubleshooting guide](docs/troubleshooting.md)
2. Review the [FAQ](docs/faq.md)
3. Open an issue on [GitHub](https://github.com/pwflint/obsidian-things-project-export/issues)

## Development

### Building the Plugin
```bash
npm install
npm run build
```

### Development Mode
```bash
npm run dev
```

### Project Structure
```
obsidian-things-project-export/
├── manifest.json          # Plugin manifest
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── esbuild.config.mjs     # Build configuration
├── main.ts               # Main plugin file
├── styles.css            # Plugin styles
├── src/                  # Source code
│   ├── types.ts          # Type definitions
│   ├── Settings.ts       # Settings management
│   ├── NoteParser.ts     # Note content parsing
│   ├── ThingsExporter.ts # Things 3 integration
│   ├── TaskManager.ts    # Task management
│   ├── TagHandler.ts     # Tag handling
│   └── LinkGenerator.ts  # Link generation
└── README.md             # This file
```

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built upon the original [obsidian-things-link](https://github.com/pwflint/obsidian-things-link) plugin
- Inspired by the Obsidian and Things 3 communities
- Thanks to all contributors and users for feedback and suggestions

## Changelog

### Version 1.0.0
- Initial release
- Basic project export functionality
- Task parsing and creation
- Tag integration
- Bidirectional linking
- Settings and configuration