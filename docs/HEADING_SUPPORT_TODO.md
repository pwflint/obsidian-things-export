# Project Heading Support - Implementation Plan

## Overview
Add support for creating project headings in Things 3 when exporting from Obsidian notes. This will allow users to structure their projects with organized sections.

## Current Status
- **Status**: Not Implemented
- **Priority**: Medium
- **Estimated Effort**: 2-3 days

## Technical Requirements

### 1. Markdown Parsing Enhancement
- [ ] Detect heading structure in markdown (e.g., `## Phase 1`, `### Sub-phase`)
- [ ] Parse heading hierarchy and associate tasks with headings
- [ ] Handle nested headings (multiple levels)

### 2. Data Structure Updates
- [ ] Add `Heading` interface to `src/types.ts`
- [ ] Update `Task` interface to include `heading` property
- [ ] Create `HeadingManager` class to handle heading logic

### 3. Things 3 Integration
- [ ] Implement JSON-based export using Things 3's `json` command
- [ ] Create project structure with headings and associated tasks
- [ ] Handle heading creation and task association

### 4. Error Handling
- [ ] Handle JSON parsing errors
- [ ] Validate heading structure
- [ ] Provide fallback to simple export if JSON fails

## Implementation Details

### Markdown Structure Support
```markdown
# Project Title

Project description...

## Phase 1: Planning
- [ ] Create project plan
- [ ] Set up development environment

## Phase 2: Development
- [ ] Implement core features
- [ ] Write tests

### Phase 2.1: Backend
- [ ] Set up database
- [ ] Create API endpoints
```

### Things 3 JSON Structure
```json
{
  "type": "project",
  "attributes": {
    "title": "Project Title",
    "notes": "Project description...",
    "items": [
      {
        "type": "heading",
        "attributes": {
          "title": "Phase 1: Planning"
        }
      },
      {
        "type": "to-do",
        "attributes": {
          "title": "Create project plan",
          "heading": "Phase 1: Planning"
        }
      }
    ]
  }
}
```

## Files to Modify

### New Files
- [ ] `src/HeadingManager.ts` - Handle heading parsing and management
- [ ] `src/JsonExporter.ts` - JSON-based export functionality

### Modified Files
- [ ] `src/types.ts` - Add heading interfaces
- [ ] `src/TaskManager.ts` - Associate tasks with headings
- [ ] `src/NoteParser.ts` - Parse heading structure
- [ ] `src/ThingsExporter.ts` - Add JSON export option
- [ ] `main.ts` - Integrate heading support

## Testing Requirements

### Test Cases
- [ ] Simple project with one heading
- [ ] Project with multiple headings
- [ ] Project with nested headings
- [ ] Project with tasks under headings
- [ ] Project with mixed tasks (some under headings, some not)
- [ ] Error handling for malformed headings

### Test Data
- [ ] Create test markdown files with various heading structures
- [ ] Verify Things 3 project creation with headings
- [ ] Test heading hierarchy preservation

## User Experience

### Settings
- [ ] Add option to enable/disable heading support
- [ ] Add option to choose between simple and JSON export
- [ ] Add heading parsing options (markdown levels to use)

### Documentation
- [ ] Update README with heading support
- [ ] Add examples of heading usage
- [ ] Update testing guide

## Dependencies

### Things 3 Requirements
- Things 3 must support JSON command (available in all versions)
- User must have URL scheme enabled

### Technical Dependencies
- No additional npm packages required
- Uses existing Things 3 URL scheme

## Risks and Considerations

### Technical Risks
- JSON export is more complex than simple URL scheme
- Error handling for malformed JSON
- Things 3 JSON command limitations

### User Experience Risks
- More complex export process
- Potential for export failures
- Need for fallback mechanisms

## Success Criteria
- [ ] Users can export projects with headings
- [ ] Heading hierarchy is preserved in Things 3
- [ ] Tasks are correctly associated with headings
- [ ] Export process is reliable and user-friendly
- [ ] Fallback to simple export works if JSON fails

## Future Enhancements
- [ ] Support for heading notes/descriptions
- [ ] Heading-specific tags
- [ ] Heading templates
- [ ] Import headings from Things 3 back to Obsidian