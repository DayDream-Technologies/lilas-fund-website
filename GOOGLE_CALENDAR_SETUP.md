# Google Calendar Integration - Setup Guide

This guide walks you through creating a Google Calendar for Lila's Fund events and connecting it to the website.

## Overview

The website displays events from a Google Calendar in two ways:

1. **Event Cards**: Structured, styled cards showing upcoming events with ticket/RSVP links
2. **Calendar Embed**: An embedded Google Calendar widget for a traditional calendar view

When the Google Calendar is not configured, the site falls back to static event data in `src/data/events.json`.

## Step 1: Create a Google Calendar

1. Go to [calendar.google.com](https://calendar.google.com)
2. Sign in with the Lila's Fund Google account (or create one)
3. On the left sidebar, click **+** next to "Other calendars"
4. Click **Create new calendar**
5. Name it: **Lila's Fund Events**
6. Description: **Upcoming events for Lila's Fund nonprofit**
7. Time zone: **Eastern Time (US & Canada)** or your preferred timezone
8. Click **Create calendar**

## Step 2: Make the Calendar Public

1. In Google Calendar, find "Lila's Fund Events" in the left sidebar
2. Click the **three dots** next to it > **Settings and sharing**
3. Scroll to **Access permissions for events**
4. Check **Make available to public**
5. Set to **See all event details**
6. Scroll to **Integrate calendar**
7. Copy the **Calendar ID** (looks like `abc123@group.calendar.google.com`)

## Step 3: Get a Google Calendar API Key

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or select existing): **Lila's Fund Website**
3. Go to **APIs & Services > Library**
4. Search for **Google Calendar API** and enable it
5. Go to **APIs & Services > Credentials**
6. Click **Create Credentials > API Key**
7. Copy the API key
8. **Restrict the API key** (important for security):
   - Click the API key to edit it
   - Under **Application restrictions**, select **HTTP referrers**
   - Add your domains:
     - `https://www.lilasfund.org/*`
     - `https://your-github-username.github.io/*`
     - `http://localhost:3000/*` (for local development)
   - Under **API restrictions**, select **Restrict key**
   - Select only **Google Calendar API**
   - Click **Save**

## Step 4: Add Events to the Calendar

For each event, include:

- **Title**: Event name (e.g., "Lila's Fund 3rd Annual Golf Outing")
- **Date & Time**: Event date and start/end times
- **Location**: Venue name and address (enables Google Maps links)
- **Description**: Include these details:
  - Brief event description
  - Ticket/registration URL
  - Event type (fundraiser, walk, etc.)
  - Any special notes

### Event Description Template

```
Join us for [event description]!

Ticket Link: https://example.com/tickets
Type: fundraiser
Cost: $XX per person/team

All proceeds support families with hospitalized children at Ronald McDonald House Charities and C.S. Mott Children's Hospital.
```

## Step 5: Configure the Website

### Environment Variables

Add these to your GitHub repository secrets (Settings > Secrets and variables > Actions):

```
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
GOOGLE_CALENDAR_API_KEY=your-api-key
```

For local development, create a `.env.local` file:

```
NEXT_PUBLIC_GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=your-api-key
```

### Deploy

After setting the secrets, trigger a new deployment:
- Push any change to the `main` branch, or
- Go to Actions > Deploy to GitHub Pages > Run workflow

## Step 6: Managing Events

### Adding New Events

1. Open Google Calendar
2. Click on the date or click **+** to create a new event
3. Switch to the **Lila's Fund Events** calendar
4. Fill in all details per the template above
5. The website will display the event automatically on the next build

### For Real-Time Updates

Since the site is statically generated, new events appear after a rebuild. Options:

1. **Manual**: Push a change to trigger a rebuild
2. **Scheduled**: Add a cron job to the GitHub Actions workflow:

```yaml
on:
  push:
    branches: [main]
  schedule:
    # Rebuild every day at 6 AM UTC to pick up new events
    - cron: '0 6 * * *'
```

3. **Webhook**: Use Google Calendar push notifications to trigger a rebuild via GitHub Actions webhook

## Updating Static Fallback Events

If the Google Calendar API is not configured, the site uses `src/data/events.json`. To update:

1. Edit `src/data/events.json`
2. Add or modify events following the existing format
3. Commit and push to trigger a deployment

### Event JSON Format

```json
{
  "id": "unique-event-id",
  "title": "Event Name",
  "date": "2026-05-16",
  "time": "10:00 AM",
  "location": "Venue Name, City",
  "description": "Brief description of the event.",
  "ticketUrl": "https://example.com/tickets",
  "type": "fundraiser",
  "image": "/images/events/event-photo.jpg"
}
```

## Troubleshooting

### Events not showing up

- Verify the calendar is set to **public**
- Check the API key restrictions allow your domain
- Ensure the Calendar API is enabled in Google Cloud Console
- Check browser console for API errors

### Calendar embed not loading

- Make sure the Calendar ID is correct
- Verify the calendar's sharing settings are public
- Some ad blockers may block the Google Calendar iframe

### API key errors

- Confirm the API key is not restricted to wrong domains
- Check that the Google Calendar API is enabled
- Verify you haven't exceeded the free tier quota (usually 1M requests/day)

## Resources

- [Google Calendar API Documentation](https://developers.google.com/calendar/api/v3/reference)
- [Google Cloud Console](https://console.cloud.google.com)
- [Calendar API Quickstart](https://developers.google.com/calendar/api/quickstart/js)
