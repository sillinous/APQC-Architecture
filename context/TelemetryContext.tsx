'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, isFirebaseEnabled } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

export interface TelemetryEvent {
  id: string;
  agentId: string;
  status: 'active' | 'idle' | 'error' | 'success';
  task: string;
  timestamp: any;
  value?: number;
}

interface TelemetryContextType {
  events: TelemetryEvent[];
  isLive: boolean;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isFirebaseEnabled || !db) {
      console.warn("Telemetry: Firebase not enabled. Using local simulation.");
      return;
    }

    const q = query(
      collection(db, 'telemetry'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TelemetryEvent[];
      setEvents(newEvents);
      setIsLive(true);
    }, (error) => {
      console.error("Telemetry Stream Error:", error);
      setIsLive(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <TelemetryContext.Provider value={{ events, isLive }}>
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (context === undefined) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
}
