import { NextResponse } from 'next/server';
import { db, isFirebaseEnabled } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agentId, status, task, value } = body;

    if (!agentId || !status) {
      return NextResponse.json({ error: 'Missing agentId or status' }, { status: 400 });
    }

    if (isFirebaseEnabled && db) {
      const docRef = await addDoc(collection(db, 'telemetry'), {
        agentId,
        status,
        task: task || 'Background Processing',
        value: value || 0,
        timestamp: serverTimestamp(),
      });
      
      return NextResponse.json({ success: true, id: docRef.id });
    }

    // Fallback if Firebase isn't configured for the demo
    console.log('Telemetry Received (No Persistence):', body);
    return NextResponse.json({ success: true, note: 'Simulation Mode Only' });

  } catch (error) {
    console.error('Sensor API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
