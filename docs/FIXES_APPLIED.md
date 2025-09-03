# Fixes Applied to Things 3 Project Export Plugin

## Issue 1: "The parameter 'id' must be provided" Error

### Problem
The Things 3 URL scheme was incorrectly formatted, causing the error "The parameter 'id' must be provided."

### Root Cause
- Using wrong URL scheme commands (`/add` instead of `/add-project` for projects)
- Incorrect parameter names (`type=project` instead of using `/add-project`)
- Wrong parameter names for tasks (`project` instead of `list-id`)
- **NEW**: Missing authentication token for update commands
- **NEW**: Trying to update items that don't exist yet (using placeholder IDs)

### Fixes Applied

#### 1. Fixed Project Creation URL
**Before:**
```javascript
return `things:///add?title=${project.title}&type=project&...`;
```

**After:**
```javascript
return `things:///add-project?title=${project.title}&...`;
```

#### 2. Fixed Task Creation URL
**Before:**
```javascript
params.append('project', task.projectId);
```

**After:**
```javascript
params.append('list-id', task.projectId);
```

#### 3. Fixed Update URLs
**Before:**
```javascript
`things:///update?project=${projectId}&tags=${tag}`
```

**After:**
```javascript
`things:///update-project?id=${projectId}&add-tags=${tag}`
```

#### 4. Fixed Parameter Names
- Changed `start-date` to `when` for project start dates
- Used correct parameter names according to Things 3 URL scheme documentation

#### 5. **MAJOR FIX**: Adopted Working Plugin's Approach
- **Removed authentication token** - The working plugin doesn't use one
- **Added x-success callbacks** - Uses `x-success=obsidian://project-id` and `x-success=obsidian://task-id`
- **Simplified URL structure** - Matches the working plugin's simple approach
- **Added protocol handlers** - Registers handlers for `project-id` and `task-id` callbacks
- **Removed complex update methods** - No longer needed since tags are included in creation URLs

#### 6. Key Changes from Working Plugin
- **URL Format**: `things:///add-project?title=${title}&notes=${notes}&tags=${tags}&x-success=obsidian://project-id`
- **No auth token needed** - The working plugin proves this isn't required
- **Callback-based ID retrieval** - Gets real Things 3 IDs via x-success callbacks
- **Simplified task creation** - No complex project association logic

#### 7. **FIXED**: Task Association and Tag Issues
- **Tasks now associated with project** - Store pending tasks and create them after project ID is received
- **Tags no longer created as tasks** - Modified TagHandler to exclude tags from task lines
- **Project notes now exported** - Added notes extraction and included in project creation
- **Project-level tags only** - Removed task-level tag extraction to keep tags at project level

## Issue 2: Hotkey Support

### Problem
No keyboard shortcuts were available for the export commands.

### Solution
Added hotkeys to all three main commands:

- **Export Note as Things Project**: `Cmd/Ctrl + Shift + E`
- **Export Selected Tasks**: `Cmd/Ctrl + Shift + T`  
- **Sync Project Status**: `Cmd/Ctrl + Shift + S`

### Implementation
```typescript
this.addCommand({
    id: 'export-note-as-project',
    name: 'Export Note as Things Project',
    callback: () => this.exportCurrentNoteAsProject(),
    hotkeys: [
        {
            modifiers: ['Mod', 'Shift'],
            key: 'E',
        },
    ],
});
```

## Testing

### What to Test
1. **Project Export**: Try exporting a note with frontmatter and tasks
2. **Hotkeys**: Test the keyboard shortcuts work
3. **Things 3 Integration**: Verify projects are created correctly in Things 3
4. **Error Handling**: Check console for any remaining errors

### Expected Behavior
- ✅ No "parameter 'id' must be provided" errors
- ✅ Things 3 opens and creates projects correctly
- ✅ Hotkeys work as expected
- ✅ Tasks are added to the created project
- ✅ Bidirectional links are created between Obsidian and Things 3

## Files Modified
- `src/ThingsExporter.ts` - Fixed URL scheme generation
- `main.ts` - Added hotkey support
- `TESTING_GUIDE.md` - Updated with fixes and hotkey info

## Next Steps
1. Test the updated plugin in Obsidian
2. Verify all commands work correctly
3. Test hotkeys don't conflict with other plugins
4. Report any remaining issues

---

**Build Status**: ✅ Successfully built and ready for testing
**Version**: Updated with fixes applied