"use client";
import React from 'react';
import { AppShell } from '../components/AppShell';
import { ChatArea } from '../components/ChatArea';
import { ExpertWorkspace } from '../components/expert/ExpertWorkspace';

export default function ExpertToolsPage() {
    return (
        <AppShell
            title="Knowledge Workspace"
            subtitle="Capture, verify, and codify hidden business logic."
            chat={<ChatArea />}
            canvas={<ExpertWorkspace />}
        />
    );
}
