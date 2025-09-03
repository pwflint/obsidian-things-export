# Quick Reference Guide

## Project Organization

### Key Directories
- **`src/`** - Source code (TypeScript files)
- **`docs/`** - Documentation and guides
- **`scripts/`** - Build and utility scripts
- **`tests/`** - Test files (future)

### Important Files
- **`main.ts`** - Plugin entry point
- **`manifest.json`** - Obsidian plugin configuration
- **`package.json`** - Dependencies and scripts
- **`README.md`** - Project overview and installation

## Common Commands

### Development
```bash
npm run dev            # Start development build with watch
npm run build          # Production build
npm run lint           # Check code quality
```

### Plugin Management
```bash
./scripts/update-plugin.sh    # Build and install to Obsidian
node scripts/version-bump.mjs # Update version numbers
```

### Testing
```bash
# Manual testing steps in docs/TESTING_GUIDE.md
# 1. Open Obsidian
# 2. Enable plugin in Community Plugins
# 3. Test export command (Cmd/Ctrl + Shift + E)
```

## File Locations

### Documentation
- **Installation**: `docs/PLUGIN_READY.md`
- **Testing**: `docs/TESTING_GUIDE.md`
- **Development**: `docs/DEVELOPMENT_PLAN.md`
- **Bug Fixes**: `docs/FIXES_APPLIED.md`
- **Future Features**: `docs/HEADING_SUPPORT_TODO.md`

### Source Code
- **Main Logic**: `main.ts`
- **Types**: `src/types.ts`
- **Settings**: `src/Settings.ts`
- **Parsing**: `src/NoteParser.ts`, `src/TaskManager.ts`, `src/TagHandler.ts`
- **Export**: `src/ThingsExporter.ts`, `src/LinkGenerator.ts`

### Scripts
- **Update Plugin**: `scripts/update-plugin.sh`
- **Version Bump**: `scripts/version-bump.mjs`

## Current Status

### ✅ Implemented
- Basic project export
- Task parsing from checkboxes
- Tag extraction and conversion
- Bidirectional linking
- Settings UI
- Hotkey support

### 🚧 In Progress
- Field testing and feedback collection

### 📋 Planned
- Project heading support
- Enhanced error handling
- Additional export options

## Troubleshooting

### Build Issues
- Check Node.js version (requires Node 16+)
- Run `npm install` to update dependencies
- Check TypeScript errors with `npm run build`

### Plugin Issues
- Verify plugin is enabled in Obsidian
- Check console for error messages
- Ensure Things 3 URL scheme is enabled
- Test with simple markdown file first

### Export Issues
- Verify Things 3 is installed and accessible
- Check that tags exist in Things 3 before export
- Ensure note has proper frontmatter structure
- Test with minimal note content first

## Support

### Getting Help
1. Check `docs/TESTING_GUIDE.md` for setup issues
2. Review `docs/FIXES_APPLIED.md` for known issues
3. Check console logs for error messages
4. Test with simple markdown file

### Reporting Issues
- Include Obsidian version
- Include plugin version from manifest.json
- Include error messages from console
- Include sample markdown file that fails