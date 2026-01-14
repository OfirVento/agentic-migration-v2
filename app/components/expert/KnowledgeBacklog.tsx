"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, Clock, CheckCircle2, ChevronRight, FileText, Settings, ShieldAlert } from 'lucide-react';

export type KnowledgeStatus = 'detected' | 'verifying' | 'codified';

export interface KnowledgeItem {
    id: string;
    title: string;
    description: string;
    type: 'rule' | 'process' | 'ambiguity';
    status: KnowledgeStatus;
    detectedAt: string;
    source: string;
}

interface KnowledgeBacklogProps {
    items: KnowledgeItem[];
    selectedId: string | null;
    onSelect: (item: KnowledgeItem) => void;
}

export const KnowledgeBacklog = ({ items, selectedId, onSelect }: KnowledgeBacklogProps) => {

    const getStatusIcon = (status: KnowledgeStatus) => {
        switch (status) {
            case 'detected': return <AlertCircle size={14} className="text-red-500" />;
            case 'verifying': return <Clock size={14} className="text-amber-500" />;
            case 'codified': return <CheckCircle2 size={14} className="text-green-500" />;
        }
    };

    const getStatusBadge = (status: KnowledgeStatus) => {
        switch (status) {
            case 'detected':
                return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 text-[10px] font-bold text-red-600 uppercase tracking-wide border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Detected
                </span>;
            case 'verifying':
                return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-[10px] font-bold text-amber-600 uppercase tracking-wide border border-amber-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Verifying
                </span>;
            case 'codified':
                return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 text-[10px] font-bold text-green-600 uppercase tracking-wide border border-green-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Codified
                </span>;
        }
    };

    return (
        <div className="w-[35%] border-r border-gray-200 bg-white flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                        <ShieldAlert size={16} className="text-indigo-600" />
                        The Backlog
                    </h3>
                    <span className="text-xs font-mono text-gray-400">{items.length} Items</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-tight">
                    Prioritized list of Unknowns & Ambiguities detected by the system.
                </p>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50/50">
                {items.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className={cn(
                            "w-full text-left p-4 rounded-xl border transition-all relative group shadow-sm",
                            selectedId === item.id
                                ? "bg-white border-blue-500 shadow-md ring-1 ring-blue-500/10 z-10"
                                : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                        )}
                    >
                        <div className="flex justify-between items-start mb-2">
                            {getStatusBadge(item.status)}
                            <span className="text-[10px] text-gray-400 font-mono">{item.source}</span>
                        </div>

                        <h4 className={cn("text-sm font-bold mb-1 line-clamp-2",
                            selectedId === item.id ? "text-blue-700" : "text-gray-800"
                        )}>
                            {item.title}
                        </h4>

                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {item.description}
                        </p>

                        {selectedId === item.id && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">
                                <ChevronRight size={16} />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};
