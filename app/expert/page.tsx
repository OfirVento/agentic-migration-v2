"use client";
import React from 'react';
import { AppShell } from '../components/AppShell';
import { ChatArea } from '../components/ChatArea';
import { ExpertWorkspace } from '../components/expert/ExpertWorkspace';
import { useDemo } from '../components/DemoContext';

export default function ExpertToolsPage() {
    const { expertChatHistory } = useDemo();

    return (
        <AppShell
            chat={<ChatArea messages={expertChatHistory} />}
            canvas={
                <div className="flex flex-col h-full">
                    {/* Header Removed as requested */}
                    <div className="flex-1 overflow-hidden">
                        <ExpertWorkspace />
                    </div>
                </div>
            }
        />
    );
}
