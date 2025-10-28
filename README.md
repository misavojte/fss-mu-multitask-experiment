# FSS MU Multitask Experiment

A Svelte-based experiment application for studying media multitasking behavior, developed for the Faculty of Social Studies at Masaryk University.

## Overview

This application simulates a typical digital environment where "media multitasking" is often required, helping researchers understand how well people handle multiple tasks simultaneously. The experiment includes:

- **Mathematical tasks**: Pattern matching exercises
- **Social media interaction**: Responses to posts on a fictional social network
- **Documentary watching**: Video monitoring with specific word detection (MISSING IN OCTOBER 2025 VARIANTS)

## URL Parameters

The experiment accepts URL parameters to configure the session and return behavior:

### Required Parameters

- `sessionId` - Unique identifier for the experiment session (required)
- `returnUrl` - URL to redirect to after experiment completion (required)
- `endpoint` - HTTP endpoint for data logging (required)
- `priority` - Experiment priority type: `math`, `social`, or `none` (optional, defaults to `none`)

### Optional Parameters

- `priority` - If not provided, defaults to `none` (equal priority for all tasks)

### URL Format

```
https://your-domain.com/?sessionId=[ID]&returnUrl=[URL]&endpoint=[ENDPOINT]&priority=[PRIORITY]
```

### Examples

#### Math priority:
```
https://experiment.example.com/?sessionId=participant-123&returnUrl=https://survey.example.com/complete&endpoint=https://your-server.com/api/logs&priority=math
```

#### Social priority:
```
https://experiment.example.com/?sessionId=participant-456&returnUrl=https://survey.example.com/complete&endpoint=https://your-server.com/api/logs&priority=social
```

#### Equal priority (default):
```
https://experiment.example.com/?sessionId=participant-789&returnUrl=https://survey.example.com/complete&endpoint=https://your-server.com/api/logs&priority=none
```

#### URL-encoded parameters:
```
https://experiment.example.com/?sessionId=participant-789&returnUrl=https%3A%2F%2Fsurvey.example.com%2Fcomplete%3Ftoken%3Dabc123&endpoint=https%3A%2F%2Fyour-server.com%2Fapi%2Flogs&priority=math
```

## Experiment Variants

The experiment supports three priority configurations controlled by the `priority` parameter:

### Math Priority (`priority=math`)
- Mathematical tasks are prioritized (3 points each)
- Social media tasks worth 1 point each
- No documentary video

### Social Priority (`priority=social`)
- Social media tasks are prioritized (3 points each)
- Mathematical tasks worth 1 point each
- No documentary video

### Equal Priority (`priority=none` or omitted)
- All tasks worth equal points (1 point each)
- No documentary video

## Return URL Behavior

The `returnUrl` parameter is **mandatory** and controls post-experiment behavior:

1. **Automatic redirect**: After experiment completion, users are automatically redirected after a 10-second countdown
2. **Manual redirect**: Users can click "Redirect Now" to go immediately
3. **Security**: Only HTTP and HTTPS URLs are allowed for security

**Note**: If any of `sessionId`, `returnUrl`, or `endpoint` is missing, the experiment will show an error message and refuse to load. If `priority` is invalid, an error will also be shown.

## Data Logging

The experiment logs detailed interaction data via HTTP POST requests to a configurable endpoint.

### Endpoint Configuration

The logging endpoint is **mandatory** and must be provided via the `endpoint` parameter in the experiment URLs:

```
https://experiment.example.com/?sessionId=participant-123&returnUrl=https://survey.example.com/complete&endpoint=https://your-server.com/api/logs&priority=math
```

**Note**: The `endpoint` parameter is required - there is no default endpoint.

### POST Request Format

All logged data is sent as JSON via POST requests with the following structure:

```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "sessionId": "participant-123",
  "type": "action-type",
  "value": "action-value-or-data"
}
```

### Action Types Logged

#### Task Management
- `task-load-start` - Task initialization begins
- `task-load-finish` - Task initialization completes
- `task-sentiment` - Task sentiment configuration (`negative` or `positive`)
- `task-points-pattern` - Points awarded for pattern matching tasks
- `task-points-social` - Points awarded for social media tasks
- `task-points-documentary` - Points awarded for documentary tasks

#### Stimuli Configuration
- `task-stimuli-social-media-ordered` - Ordered list of social media stimuli IDs
- `task-stimuli-social-media-buttons` - Social media button configuration
- `task-stimuli-pattern-matching` - Pattern matching stimuli IDs
- `task-stimuli-video` - Video configuration (if applicable)

#### Pattern Matching Tasks
- `pattern-matching-response` - User response to pattern matching task
- `pattern-matching-next` - User advances to next pattern matching task
- `pattern-matching-completed` - Pattern matching task sequence completed

#### Social Media Tasks
- `social-media-interactors-show` - Social media post displayed (includes post ID)
- `social-media-interactors-click` - User clicked on social media post (includes button ID)
- `social-media-interactors-hidden` - Social media post hidden
- `social-media-interactors-timeout` - Social media post timed out
- `social-media-interactors-completed` - Social media task sequence completed

#### Documentary Tasks (if applicable)
- `documentary-response` - User response to documentary word detection
  - Value format: `{"correctness": "correct|incorrect", "videoTime": 123.45, "timestampTime": 120.0}`

#### Questionnaire Data
- `questionnaire-start` - Questionnaire begins
- `questionnaire-[question-id]` - Individual question responses
- `questionnaire-end` - Questionnaire completed

#### Gaze Tracking (if enabled)
- `gaze-init` - Gaze tracking initialization
- `gaze-connect` - Gaze tracker connected
- `gaze-start` - Gaze tracking started
- `gaze-end` - Gaze tracking ended
- `gaze-validation` - Gaze tracking validation results
- `gaze-disconnect` - Gaze tracker disconnected
- `gaze-error` - Gaze tracking error

#### Display Counts
- `task-stimuli-displayed-social-media` - Number of social media stimuli displayed
- `task-stimuli-displayed-pattern-matching` - Number of pattern matching stimuli displayed
- `task-stimuli-displayed-documentary` - Number of documentary stimuli displayed

### Server Requirements

Your logging server should:

1. **Accept POST requests** to the configured endpoint
2. **Handle JSON payloads** with the structure shown above
3. **Return HTTP 200** for successful logging
4. **Be resilient** - the experiment continues even if logging fails

### Example Server Implementation

```javascript
// Express.js example
app.post('/api/logs', (req, res) => {
  const { timestamp, sessionId, type, value } = req.body;
  
  // Store in database
  await database.logs.create({
    timestamp: new Date(timestamp),
    sessionId,
    type,
    value
  });
  
  res.status(200).json({ success: true });
});
```

## Development

Once you've created a project and installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Integration with External Surveys

This experiment is designed to be integrated with external survey platforms (like Qualtrics, LimeSurvey, etc.):

1. **Survey Setup**: Create your survey with a redirect to this experiment
2. **URL Construction**: Build the experiment URL with the participant's session ID and your survey's completion URL
3. **Automatic Return**: Participants are automatically returned to your survey after completing the experiment

### Example Integration Flow

```
Survey Platform → Experiment → Return to Survey
     ↓              ↓              ↓
  Generate      Complete        Continue
  sessionId     experiment      survey
```
