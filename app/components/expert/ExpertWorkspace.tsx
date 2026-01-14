"use client";
import React, { useState } from 'react';
import { KnowledgeBacklog, KnowledgeItem } from './KnowledgeBacklog';
import { KnowledgeWorkbench } from './KnowledgeWorkbench';

const MOCK_ITEMS: KnowledgeItem[] = [
    {
        id: 'AMB-001',
        title: 'Manual Discounting Pattern - EMEA',
        description: 'Consistent 15% manual override detected on quotes > $50k in EMEA region, deviating from standard price book rules.',
        type: 'rule',
        status: 'detected',
        detectedAt: '2 hrs ago',
        source: 'Quote History Scan'
    },
    {
        id: 'AMB-002',
        title: 'Unknown Product Constraint',
        description: 'Product "Cloud Storage" is never sold with "On-Prem Server" despite no explicit exclusion rule. Possible hidden hard constraint.',
        type: 'ambiguity',
        status: 'verifying',
        detectedAt: '1 day ago',
        source: 'Config Log Analysis'
    },
    {
        id: 'AMB-003',
        title: 'Legacy "Notes" Field Usage',
        description: 'Field "legacy_shipping_notes__c" contains structured shipping terms. Should be migrated to a dedicated object.',
        type: 'process',
        status: 'codified',
        detectedAt: '3 days ago',
        source: 'Metadata Scan'
    },
    {
        id: 'AMB-004',
        title: 'Shadow Approval Flow',
        description: 'Quotes for "Enterprise Plan" are stuck in "Pending" state for 48h avg, but workflow diagram shows instant approval.',
        type: 'process',
        status: 'detected',
        detectedAt: '4 hrs ago',
        source: 'Process Mining'
    }
];

export const ExpertWorkspace = () => {
    const [selectedId, setSelectedId] = useState<string | null>('AMB-001'); // Default select first

    const selectedItem = MOCK_ITEMS.find(i => i.id === selectedId) || null;

    return (
        <div className="flex w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Left: Backlog (35%) */}
            <KnowledgeBacklog
                items={MOCK_ITEMS}
                selectedId={selectedId}
                onSelect={(item) => setSelectedId(item.id)}
            />

            {/* Right: Workbench (Rest) */}
            <KnowledgeWorkbench item={selectedItem} />
        </div>
    );
};
