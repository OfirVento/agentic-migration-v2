"use client";
import React, { useState } from 'react';
import { KnowledgeItem } from './KnowledgeBacklog';
import { MessageSquare, Upload, Code2, AlertTriangle, FileText, UserCheck, ArrowRight } from 'lucide-react';
import { useDemo } from '../DemoContext';

interface KnowledgeWorkbenchProps {
    item: KnowledgeItem | null;
}

export const KnowledgeWorkbench = ({ item }: KnowledgeWorkbenchProps) => {
    const { handleExpertAction } = useDemo();
    const [actionState, setActionState] = useState<'idle' | 'human' | 'evidence' | 'codify'>('idle');

    if (!item) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-white text-gray-400 p-8 text-center h-full">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <FileText size={32} className="opacity-20" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select an Item</h3>
                <p className="max-w-xs text-sm">Choose an item from the backlog to begin analysis and verification.</p>
            </div>
        );
    }

    // --- Action Handlers ---
    const handleActionClick = (action: 'human' | 'evidence' | 'codify') => {
        setActionState(action);
        // In a real app, this might trigger a modal or change the view
        // For demo, we can just log or use handleExpertAction to simulate agent response
        if (action === 'human') handleExpertAction('ask_human');
    };

    return (
        <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
            {/* Workbench Header */}
            <div className="px-8 py-6 border-b border-gray-100 shrink-0 bg-white">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-gray-100 text-xs font-bold text-gray-600 uppercase tracking-wide">
                        {item.type}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">ID: {item.id}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{item.title}</h2>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>

            {/* Analysis Area / Middle Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30">
                {/* Agent Insight Block */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <UserCheck size={100} />
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-blue-900 mb-2">System Insight</h4>
                            <p className="text-sm text-blue-800/80 leading-relaxed">
                                "I noticed this pattern occurs in 45% of Quote Lines for EMEA region.
                                It deviates from the standard 'Global Discount' matrix.
                                High probability of being a localized 'Shadow Policy'."
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-blue-600/70 uppercase tracking-wide">
                                <span>Confidence: Low (42%)</span>
                                <span className="w-1 h-1 rounded-full bg-blue-400" />
                                <span>Source: Transaction Logs</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Evidence / Context Placeholder */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Related Context</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="text-xs text-gray-400 mb-1">Impacted Quotes</div>
                            <div className="text-xl font-mono text-gray-900">1,240</div>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="text-xs text-gray-400 mb-1">Revenue at Risk</div>
                            <div className="text-xl font-mono text-gray-900">$4.2M</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar (Bottom) */}
            <div className="p-6 border-t border-gray-200 bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-10">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Recommended Actions</h4>
                <div className="grid grid-cols-3 gap-4">
                    <button
                        onClick={() => handleActionClick('human')}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all group text-gray-500 hover:text-blue-700"
                    >
                        <MessageSquare size={24} className="group-hover:scale-110 transition-transform mb-1" />
                        <span className="text-sm font-bold">Ask a Human</span>
                        <span className="text-[10px] opacity-70">Verify via Slack/Email</span>
                    </button>

                    <button
                        onClick={() => handleActionClick('evidence')}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-all group text-gray-500 hover:text-purple-700"
                    >
                        <Upload size={24} className="group-hover:scale-110 transition-transform mb-1" />
                        <span className="text-sm font-bold">Upload Evidence</span>
                        <span className="text-[10px] opacity-70">Drag & Drop Docs</span>
                    </button>

                    <button
                        onClick={() => handleActionClick('codify')}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all group text-gray-500 hover:text-emerald-700"
                    >
                        <Code2 size={24} className="group-hover:scale-110 transition-transform mb-1" />
                        <span className="text-sm font-bold">Codify as Rule</span>
                        <span className="text-[10px] opacity-70">Convert to Logic</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
