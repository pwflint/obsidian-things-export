#!/bin/bash

# Define the plugin directory relative to the vault root
PLUGIN_DIR=".obsidian/plugins/obsidian-things-project-export"

echo "🔄 Updating Obsidian plugin files..."

# 1. Build the plugin
echo "📦 Building plugin..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting update."
    exit 1
fi
echo "✅ Build successful!"

# 2. Copy the updated files
echo "📁 Copying files to Obsidian plugins directory..."
cp main.js manifest.json styles.css versions.json "$PLUGIN_DIR/"

if [ $? -ne 0 ]; then
    echo "❌ Failed to copy files. Aborting update."
    exit 1
fi
echo "✅ Plugin files updated successfully!"

echo ""
echo "📋 Next steps:"
echo "1. Open Obsidian"
echo "2. Go to Settings → Community Plugins"
echo "3. Find 'Things 3 Project Export' and toggle it ON (if not already)"
echo "4. Test the export command (Cmd/Ctrl + Shift + E)"
echo ""
echo "🎯 Files updated:"
echo "   - main.js (26KB)"
echo "   - manifest.json"
echo "   - styles.css"
echo "   - versions.json"