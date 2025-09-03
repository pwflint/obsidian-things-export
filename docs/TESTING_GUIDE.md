# Things 3 Project Export Plugin - Testing Guide

## 🎉 Build Success!

The plugin has been successfully built! Here's what we accomplished:

### ✅ Build Results
- **TypeScript compilation**: ✅ Successful
- **Bundle creation**: ✅ `main.js` (25KB) created
- **Dependencies**: ✅ All installed in `node_modules/`
- **Development server**: ✅ Running in watch mode

## 📁 Plugin Files Ready for Testing

The following files are ready to be installed in Obsidian:

```
obsidian-things-project-export/
├── manifest.json    ← Plugin manifest
├── main.js         ← Compiled plugin (25KB)
├── styles.css      ← Plugin styles
└── versions.json   ← Version compatibility
```

## 🧪 How to Test the Plugin

### Step 1: Plugin Files Ready

✅ **Plugin files are already installed** in `.obsidian/plugins/obsidian-things-project-export/`

The following files are ready for testing:
- `main.js` (26KB) - Compiled plugin with latest fixes
- `manifest.json` - Plugin manifest
- `styles.css` - Plugin styles  
- `versions.json` - Version compatibility

### Step 1a: Enable Plugin in Obsidian

1. **Open Obsidian**
2. **Go to Settings** → **Community Plugins**
3. **Turn off Safe Mode** (if enabled)
4. **Find "Things 3 Project Export"** in the installed plugins list
5. **Toggle it ON** (if not already enabled)

### Step 2: Update Plugin (When Making Changes)

When you make changes to the plugin code, use the update script:

```bash
./update-plugin.sh
```

This script will:
1. Build the plugin (`npm run build`)
2. Copy the updated files to the Obsidian plugins directory
3. Show you the next steps

### Step 3: Test Basic Functionality

#### Test 1: Plugin Loading
- ✅ Plugin should appear in the list
- ✅ No error messages in console
- ✅ Settings tab should be available

#### Test 2: Commands Available
1. **Open Command Palette** (Ctrl/Cmd + P)
2. **Search for "Things"**
3. **You should see these commands**:
   - "Export Note as Things Project" (Hotkey: Cmd/Ctrl + Shift + E)
   - "Export Selected Tasks" (Hotkey: Cmd/Ctrl + Shift + T)
   - "Sync Project Status" (Hotkey: Cmd/Ctrl + Shift + S)

#### Test 3: Settings Panel
1. **Go to Settings** → **Community Plugins**
2. **Click the gear icon** next to "Things 3 Project Export"
3. **Verify settings are accessible**:
   - Default Project Area
   - Tag Mapping
   - Date Format
   - Auto-sync options

### Step 4: Test with Sample Note

#### Create a Test Note
Create a new note with this content:

```markdown
---
title: Test Project
start date: 2025-01-15
end date: 2025-02-15
status: In Progress
tags: ["test", "project"]
---

# Test Project

This is a test project for the Things 3 export plugin.

## Tasks
- [ ] Create project plan
- [ ] Set up development environment
- [ ] Test the plugin functionality
- [x] Complete initial setup

## Notes
This project tests the basic export functionality.
```

#### Test Export Command
1. **Open the test note**
2. **Run Command Palette** (Ctrl/Cmd + P) OR use hotkey (Cmd/Ctrl + Shift + E)
3. **Select "Export Note as Things Project"**
4. **Expected behavior**:
   - Things 3 should open (if installed)
   - A new project should be created
   - Tasks should be added to the project
   - A link should be added back to the Obsidian note

## 🔍 What to Look For

### ✅ Success Indicators
- Plugin loads without errors
- Commands appear in Command Palette
- Settings panel is accessible
- Export command executes without crashing
- Things 3 opens when export is run

### ⚠️ Potential Issues
- **Things 3 not opening**: Check if Things 3 is installed
- **Export fails**: Check console for error messages
- **"The parameter 'id' must be provided" error**: This has been fixed in the latest build
- **Settings not saving**: Check file permissions
- **Commands not appearing**: Plugin may not be properly enabled
- **Hotkeys not working**: Check if hotkeys conflict with other plugins

## 🐛 Debugging

### Check Console for Errors
1. **Open Developer Tools** (Ctrl/Cmd + Shift + I)
2. **Go to Console tab**
3. **Look for error messages** when using the plugin

### Common Issues and Solutions

#### Issue: "Things 3 not found"
- **Solution**: Install Things 3 from the Mac App Store
- **Test**: Try opening `things:///show` in a browser

#### Issue: "Export command not working"
- **Solution**: Check if the note has proper frontmatter
- **Test**: Try with the sample note provided above

#### Issue: "Plugin not loading"
- **Solution**: Check file permissions and ensure all files are copied
- **Test**: Restart Obsidian and try again

## 📊 Testing Checklist

### Basic Functionality
- [ ] Plugin loads successfully
- [ ] Commands appear in Command Palette
- [ ] Settings panel is accessible
- [ ] No console errors on startup

### Export Functionality
- [ ] Export command executes
- [ ] Things 3 opens when export runs
- [ ] Project is created in Things 3
- [ ] Tasks are added to project
- [ ] Link is added back to Obsidian note

### Settings
- [ ] Settings can be modified
- [ ] Settings are saved
- [ ] Settings persist after restart

## 🚀 Next Steps

Once basic testing is complete:

1. **Test with different note formats**
2. **Test tag mapping functionality**
3. **Test date parsing**
4. **Test with complex project structures**
5. **Test error handling**

## 📝 Reporting Issues

If you encounter issues:

1. **Note the exact error message**
2. **Check the browser console** for detailed errors
3. **Try with the sample note** provided above
4. **Document the steps** that led to the issue

## 🎯 Success Criteria

The plugin is working correctly if:
- ✅ All commands are available
- ✅ Export opens Things 3
- ✅ No console errors
- ✅ Settings are functional
- ✅ Basic export works with sample note

---

**Ready to test!** 🚀

The plugin is built and ready for installation in Obsidian. Follow the steps above to test the basic functionality and let me know what you discover!