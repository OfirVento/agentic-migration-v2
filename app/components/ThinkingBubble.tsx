"use client";
import React from 'react';

export const ThinkingBubble = ({ label }: { label?: string }) => (
    <div className="flex gap-3 animate-pulse">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <div className="flex gap-0.5">
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
            </div>
        </div>
        <div className="text-sm text-gray-400 pt-1.5 italic">{label || "Thinking..."}</div>
    </div>
);
