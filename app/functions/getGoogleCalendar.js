import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/[...nextauth]/route.js';

export async function getGoogleCalendarEvents() {
  // This ensures it only runs server-side
  if (typeof window !== 'undefined') {
    return []; // Early return on client-side
  }

  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    throw new Error('Unauthorized');
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: 'v3', auth });

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}