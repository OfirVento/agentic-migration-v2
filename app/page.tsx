"use client";
import React from 'react';
import { AppShell } from './components/AppShell';
import { ChatArea } from './components/ChatArea';
import { CanvasRegistry } from './components/modules/CanvasRegistry';

export default function Page() {
  return (
    <AppShell
      chat={<ChatArea />}
      canvas={<CanvasRegistry />}
    />
  );
}
