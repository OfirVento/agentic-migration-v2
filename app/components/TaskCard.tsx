"use client";
import React from 'react';
import { AgentTask } from './DemoContext';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TaskCard = ({ task }: { task: AgentTask }) => {
    if (!task) return null;
    return (
        <div className="mb-6 mx-1 rounded-xl border border-gray-200 bg-white text-gray-900 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-500">
            {/* Header */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-sm font-semibold tracking-wide text-gray-800">{task.title}</span>
                </div>
                <span className="text-xs font-mono text-gray-500">{task.status}</span>
            </div>

            {/* Steps */}
            <div className="p-4 space-y-3">
                {task.steps.map((step) => (
                    <div key={step.id} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                            {step.status === 'completed' && <CheckCircle size={16} className="text-green-500" />}
                            {step.status === 'running' && <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
                            {step.status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
                        </div>
                        <span className={cn(
                            "text-sm transition-colors",
                            step.status === 'completed' ? "text-gray-500" :
                                step.status === 'running' ? "text-blue-700 font-medium" :
                                    "text-gray-400"
                        )}>
                            {step.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
