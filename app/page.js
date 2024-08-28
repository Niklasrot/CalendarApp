"use client"

import { getGoogleCalendar } from './functions/getGoogleCalendar.js';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function HomePage() {
 /*  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      </div>
    );
  }

  const fetchEvents = async () => {
    const events = await getGoogleCalendar();
    console.log('Fetched events:', events);
  }; */

  return (
    <div>
      <button onClick={() => signOut()}>Sign out</button>
      <h1>Your Google Calendar Events</h1>
      <button onClick={fetchEvents}>Load Events</button>
    </div>
  );
}