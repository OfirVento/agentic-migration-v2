"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useDemo, ChatMessage } from './DemoContext';
import { ChatMessageItem } from './ChatMessageItem';
import { ArrowRight } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { ThinkingBubble } from './ThinkingBubble';

export interface ChatAreaProps {
    messages?: ChatMessage[];
    onSendMessage?: (text: string) => void;
    // Allow overriding context values
}

const ChatInput = ({ onSend }: { onSend: (text: string) => void }) => {
    const { isTyping } = useDemo();
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        onSend(inputValue);
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
        </div>
    );
};

export const ChatArea = ({ messages, onSendMessage }: ChatAreaProps) => {
    const demo = useDemo();
    const history = messages || demo.chatHistory;
    const handleSend = onSendMessage || demo.handleUserMessage;

    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, demo.isTyping, demo.currentTask]);

    return (
        <div className="flex flex-col h-full overflow-hidden bg-white">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                {history.map((msg, index) => (
                    <ChatMessageItem
                        key={msg.id}
                        msg={msg}
                        isLast={index === history.length - 1}
                    />
                ))}

                {/* Only show TaskCard if using default demo history AND tasks exist */}
                {!messages && demo.currentTask && !history.some(m => m.meta?.taskId === demo.currentTask?.id) && (
                    <TaskCard task={demo.currentTask} />
                )}

                {demo.isTyping && <ThinkingBubble label={demo.typingLabel || "Thinking..."} />}
                <div ref={bottomRef} />
            </div>

            <ChatInput onSend={handleSend} />
        </div>
    );
};
