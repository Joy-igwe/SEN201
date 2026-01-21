# SEN-Assignments
SDLC Documentation: Personal Digital Journal Application

1. Requirements Analysis Phase

Business Requirements

· Create a secure, private digital journal accessible from any device
· Provide users with a convenient way to document thoughts and experiences
· Ensure data persistence and privacy

Functional Requirements

User Requirements:

1. Users can create new journal entries with text content
2. Users can view all past entries in chronological order
3. Entries automatically timestamp when created
4. Data persists across browser sessions
5. Simple, intuitive interface with no learning curve

System Requirements:

1. Web-based application running in modern browsers
2. Client-side data storage using localStorage
3. No server-side dependencies for basic functionality
4. Responsive design for mobile and desktop

Non-Functional Requirements

1. Performance: App must load within 3 seconds
2. Usability: First-time users can start writing within 30 seconds
3. Reliability: No data loss during normal usage
4. Portability: Works on Chrome, Firefox, Safari, Edge
5. Maintainability: Clean, documented code structure

2. Planning Phase

Project Timeline

```
Week 1: Planning & Design
Week 2: Core Development (HTML/CSS/JS)
Week 3: Testing & Debugging
Week 4: Enhancement Features
```

Technology Stack

· Frontend: HTML5, CSS3, Vanilla JavaScript
· Storage: Browser localStorage API
· Version Control: Git/GitHub
· Development Tools: VS Code, Chrome DevTools

Resource Requirements

· Developer: 1 person
· Tools: Text editor, modern web browser
· Testing: Cross-browser testing suite

3. Design Phase

System Architecture

```
User Interface (HTML/CSS)
        ↓
JavaScript Controller (script.js)
        ↓
Data Storage (localStorage)
        ↓
Browser Environment
```

Component Design

1. UI Layer (index.html)
   · Header with application title
   · Text input area for new entries
   · Display area for past entries
   · Action buttons
2. Controller Layer (script.js)
   · Entry creation module
   · Data persistence module
   · Entry retrieval module
   · UI update module
3. Data Layer (localStorage)
   · JSON structure for entries
   · CRUD operations

Data Model

```json
{
  "entries": [
    {
      "id": "timestamp_uuid",
      "content": "Journal entry text",
      "timestamp": "2024-01-15T10:30:00Z",
      "mood": "happy" // Optional enhancement
    }
  ]
}
```

User Interface Design

· Simple, clean aesthetic focusing on readability
· Mobile-first responsive design
· Color scheme: Blue (#3498db) for primary actions, neutral backgrounds
· Typography: Sans-serif for readability

4. Implementation Phase

Code Structure

```
project/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── script.js           # Core application logic
└── README.md           # Documentation
```

Key Implementation Details

1. Entry Creation Logic:

```javascript
// User inputs text → Validate → Create entry object → Save to storage → Update UI
```

2. Data Persistence Strategy:

· Use localStorage with JSON serialization
· Implement error handling for storage limits
· Provide backup/export functionality

3. Error Handling:

· Input validation (empty entries)
· Storage quota exceeded handling
· JSON parsing errors

5. Testing Phase

Test Cases

Unit Tests:

```javascript
// Example test structure
describe('Journal App Tests', () => {
  test('should create entry with timestamp', () => {
    // Test implementation
  });
  
  test('should save entry to localStorage', () => {
    // Test implementation
  });
  
  test('should retrieve entries in reverse chronological order', () => {
    // Test implementation
  });
});
```

Integration Tests:

1. UI ↔ JavaScript integration
2. JavaScript ↔ localStorage integration
3. Cross-browser compatibility

User Acceptance Tests:

1. Can user create and save an entry? ✓
2. Can user view past entries? ✓
3. Does data persist after page refresh? ✓
4. Is the interface intuitive? ✓

Testing Matrix

Test Case Chrome Firefox Safari Edge
Create Entry ✓ ✓ ✓ ✓
View Entries ✓ ✓ ✓ ✓
Data Persistence ✓ ✓ ✓ ✓
Mobile Responsive ✓ ✓ ✓ ✓

6. Deployment Phase

Deployment Strategy

1. Local Development: Direct file access
2. Static Hosting Options:
   · GitHub Pages (free)
   · Netlify (free tier)
   · Vercel (free tier)
   · Simple web server (Apache/nginx)

Deployment Steps

```bash
# 1. Prepare deployment package
mkdir deploy
cp index.html style.css script.js deploy/

# 2. Optional: Minify assets
# 3. Upload to hosting provider
```

Post-Deployment Checklist

· All features work in production
· No console errors
· Mobile responsive verified
· Data persistence confirmed

7. Maintenance Phase

Version History

```
v1.0.0 (Initial Release)
- Basic CRUD operations
- localStorage persistence
- Responsive design

v1.1.0 (Planned)
- Search functionality
- Mood tracking
- Export to PDF/JSON

v1.2.0 (Future)
- Cloud sync
- Image attachments
- Password protection
```

Bug Tracking & Resolution Process

1. User reports issue via GitHub Issues
2. Developer reproduces bug
3. Fix implemented and tested
4. Update deployed

Performance Monitoring

· Console error monitoring
· localStorage usage tracking
· User interaction analytics (optional)

8. Risk Assessment

Identified Risks

1. Data Loss Risk: localStorage can be cleared by user
   · Mitigation: Add export/backup feature
   · Mitigation: Warn users about clearing browser data
2. Storage Limitation: ~5MB limit per domain
   · Mitigation: Implement entry archiving
   · Mitigation: Add entry deletion functionality
3. Security: No encryption (entries visible in DevTools)
   · Mitigation: Add optional password protection
   · Mitigation: Client-side encryption (advanced)
4. Browser Compatibility: localStorage availability
   · Mitigation: Feature detection and fallback
   · Mitigation: Clear unsupported browser message

9. Future Enhancements Roadmap

Phase 2 (Next 3 months)

· Search and filter entries
· Mood/emotion tagging
· Rich text formatting
· Entry categories/tags