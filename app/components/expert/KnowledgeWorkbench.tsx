"use client";
import React, { useState, useEffect } from 'react';
import { KnowledgeItem } from './KnowledgeBacklog';
import { MessageSquare, Upload, Code2, FileText, ArrowLeft, Send, CheckCircle2, Loader2, FileJson, FileSpreadsheet } from 'lucide-react';
import { useDemo } from '../DemoContext';

interface KnowledgeWorkbenchProps {
    item: KnowledgeItem | null;
}

export const KnowledgeWorkbench = ({ item }: KnowledgeWorkbenchProps) => {
    const { handleExpertAction } = useDemo();
    const [viewMode, setViewMode] = useState<'detail' | 'ask' | 'upload' | 'codify'>('detail');
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'parsed'>('idle');

    // Reset view when item changes
    useEffect(() => {
        setViewMode('detail');
        setUploadStatus('idle');
    }, [item?.id]);

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

    const handleAction = (mode: 'ask' | 'upload' | 'codify') => {
        setViewMode(mode);
        // Trigger chat message via context
        if (mode === 'ask') handleExpertAction('expert_ask_human');
        if (mode === 'upload') handleExpertAction('expert_upload_evidence');
        if (mode === 'codify') handleExpertAction('expert_codify');
    };

    const handleBack = () => {
        setViewMode('detail');
        setUploadStatus('idle');
    };

    // Sub-renderers
    const renderAskHuman = () => (
        <div className="flex flex-col h-full bg-white">
            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-lg text-gray-500"><ArrowLeft size={18} /></button>
                <h3 className="text-lg font-bold">Ask a Human</h3>
            </div>
            <div className="p-8 max-w-2xl mx-auto w-full">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500 w-16 text-right">To:</span>
                            <span className="font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-xs">Lina (Sales Ops) ×</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500 w-16 text-right">Channel:</span>
                            <div className="flex items-center gap-1 text-gray-700"><MessageSquare size={12} /> Slack</div>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                            Hi Lina, regarding <strong>{item.title}</strong>:
                            {"\n\n"}
                            I detected this pattern in EMEA quotes (1,240 impacted). It differs from the standard price book.
                            {"\n"}
                            Is this a valid shadow policy we should formalize in the new system?
                        </p>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900" onClick={handleBack}>Cancel</button>
                        <button
                            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"
                            onClick={() => {
                                // Trigger send confirmation
                                handleBack();
                            }}
                        >
                            <Send size={14} /> Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderUpload = () => (
        <div className="flex flex-col h-full bg-white">
            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-lg text-gray-500"><ArrowLeft size={18} /></button>
                <h3 className="text-lg font-bold">Upload Evidence</h3>
            </div>
            <div className="p-8 h-full flex flex-col">
                {uploadStatus === 'idle' ? (
                    <div
                        onClick={() => {
                            setUploadStatus('uploading');
                            setTimeout(() => setUploadStatus('parsed'), 2000);
                        }}
                        className="flex-1 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-8 bg-gray-50 hover:bg-blue-50 hover:border-blue-400 cursor-pointer transition-all group"
                    >
                        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Upload size={32} className="text-blue-500" />
                        </div>
                        <p className="font-bold text-lg text-gray-900">Drag & Drop files here</p>
                        <p className="text-sm text-gray-500 mt-2 text-center max-w-sm">
                            Supports Excel, PDF, Email exports (.msg), or Screenshots.
                            <br />The Agent will parse logic instantly.
                        </p>
                        <div className="mt-8 flex gap-4 opacity-50">
                            <FileSpreadsheet size={24} />
                            <FileText size={24} />
                            <MessageSquare size={24} />
                        </div>
                    </div>
                ) : uploadStatus === 'uploading' ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Loader2 className="animate-spin text-blue-600 mb-6" size={48} />
                        <h4 className="text-lg font-bold text-gray-900">Parsing Document...</h4>
                        <p className="text-gray-500 mt-1">Extracting logic rules and entities</p>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600">
                            <CheckCircle2 size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Extraction Complete</h4>
                        <p className="text-gray-500 text-center mb-8">Successfully identified 1 logic pattern and 2 conditions.</p>

                        <div className="bg-gray-50 rounded-xl p-6 w-full border border-gray-200 mb-8 text-left">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Extracted Logic</div>
                            <code className="text-sm text-gray-800 block font-mono bg-white p-3 rounded border border-gray-200">
                                IF (Region == 'EMEA' AND Amount {'>'} 50,000) {"{"} <br />
                                &nbsp;&nbsp; APPLY_DISCOUNT(15%); <br />
                                {"}"}
                            </code>
                        </div>

                        <div className="flex gap-3 w-full">
                            <button className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200" onClick={handleBack}>Cancel</button>
                            <button className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg" onClick={() => handleAction('codify')}>Codify as Rule</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderCodify = () => (
        <div className="flex flex-col h-full bg-white">
            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-lg text-gray-500"><ArrowLeft size={18} /></button>
                <h3 className="text-lg font-bold">Codify as Rule</h3>
            </div>
            <div className="flex-1 p-0 grid grid-cols-2 divide-x divide-gray-100">
                {/* Source */}
                <div className="p-6 bg-gray-50">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Source Pattern</div>
                    <div className="prose prose-sm text-gray-600">
                        <p>Consistent manual override detected.</p>
                        <ul>
                            <li><strong>Region:</strong> EMEA</li>
                            <li><strong>Threshold:</strong> $50,000</li>
                            <li><strong>Action:</strong> 15% Discount</li>
                        </ul>
                    </div>
                </div>
                {/* Target */}
                <div className="p-6 bg-white flex flex-col">
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FileJson size={14} /> Generated Pricing Procedure
                    </div>
                    <div className="flex-1 bg-slate-900 rounded-lg p-4 font-mono text-xs text-blue-300 overflow-auto shadow-inner">
                        <span className="text-purple-400">Resource</span> <span className="text-yellow-300">"EMEA_Volume_Discount"</span> {"{"}<br />
                        &nbsp;&nbsp;<span className="text-purple-400">Type</span>: <span className="text-green-300">PricingProcedure</span>;<br />
                        &nbsp;&nbsp;<span className="text-purple-400">Steps</span>: [<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;{"{"}<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">matcher</span>: <span className="text-yellow-300">"Quote.Region == 'EMEA'"</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">action</span>: <span className="text-yellow-300">"SetDiscount(0.15)"</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br />
                        &nbsp;&nbsp;]<br />
                        {"}"}
                    </div>
                    <button
                        className="mt-6 w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md"
                        onClick={() => {
                            // handleExpertAction('deploy_rule');
                            handleBack();
                        }}
                    >
                        Confirm & Save Rule
                    </button>
                </div>
            </div>
        </div>
    );

    // Main Detail View
    if (viewMode === 'ask') return renderAskHuman();
    if (viewMode === 'upload') return renderUpload();
    if (viewMode === 'codify') return renderCodify();

    return (
        <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
            {/* Standard Detail View */}
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

            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30">
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

            <div className="p-6 border-t border-gray-200 bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-10">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Recommended Actions</h4>
                <div className="grid grid-cols-3 gap-4">
                    <button
                        onClick={() => handleAction('ask')}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all group text-gray-500 hover:text-blue-700"
                    >
                        <MessageSquare size={24} className="group-hover:scale-110 transition-transform mb-1" />
                        <span className="text-sm font-bold">Ask a Human</span>
                        <span className="text-[10px] opacity-70">Verify via Slack/Email</span>
                    </button>

                    <button
                        onClick={() => handleAction('upload')}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-all group text-gray-500 hover:text-purple-700"
                    >
                        <Upload size={24} className="group-hover:scale-110 transition-transform mb-1" />
                        <span className="text-sm font-bold">Upload Evidence</span>
                        <span className="text-[10px] opacity-70">Drag & Drop Docs</span>
                    </button>

                    <button
                        onClick={() => handleAction('codify')}
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
