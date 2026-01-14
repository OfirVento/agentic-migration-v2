"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useDemo } from './DemoContext';
import { ChatMessageItem } from './ChatMessageItem';
import { ArrowRight } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { ThinkingBubble } from './ThinkingBubble';

const ChatInput = () => {
    const { handleUserMessage, isTyping } = useDemo();
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        handleUserMessage(inputValue);
        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Anything"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                    disabled={isTyping}
                />
                <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-2 top-2 p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-0 disabled:pointer-events-none transition-all"
                >
                    <ArrowRight size={16} />
                </button>
            </form>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-2 pointer-events-none">
                {/* Optional: Floating scroll to bottom indicator could go here */}
            </div>
        </div>
    );
};

export const ChatArea = () => {
    const { chatHistory, isTyping, currentTask, typingLabel } = useDemo();
    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to bottom when new messages arrive
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isTyping, currentTask]);

    return (
        <div className="flex flex-col h-full overflow-hidden bg-white">
            {/* Messages List */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">

                {/* 1. Render all messages */}
                {chatHistory.map((msg, index) => (
                    <ChatMessageItem
                        key={msg.id}
                        msg={msg}
                        isLast={index === chatHistory.length - 1}
                    />
                ))}

                {/* 2. Render the Active Task Card at the bottom ONLY if it is NOT already rendered inline */}
                {currentTask && !chatHistory.some(m => m.meta?.taskId === currentTask.id) && (
                    <TaskCard task={currentTask} />
                )}

                {isTyping && <ThinkingBubble label={typingLabel || "Thinking..."} />}
                <div ref={bottomRef} />
            </div>

            {/* Sticky Input Area */}
            <ChatInput />
        </div>
    );
};
