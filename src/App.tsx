/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BarcodeInputs } from './components/BarcodeInputs';
import { LabelSettings } from './components/LabelSettings';
import { PagePreview } from './components/PagePreview';
import { BloggerEmbedModal } from './components/BloggerEmbedModal';
import { PrintablePages } from './components/PrintablePages';
import { BarcodeItem, LabelConfig } from './types';
import { parseBulkInput } from './utils/barcode';
import { download4x6PDF } from './utils/pdfGenerator';
import { downloadStandaloneHtmlFile } from './utils/bloggerSnippet';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

// Sample codes taken directly from the user's provided PDF screenshot
const SAMPLE_BARCODES = [
  'FMPP4162047741',
  'FMPC6265465305',
  'FMPP4161144943',
  'FMPP4110839820',
  'FMPC6277475378',
  'FMPP4162047749',
  'FMPC6265465312',
  'FMPP4161144955',
];

export default function App() {
  const initialText = SAMPLE_BARCODES.join('\n');
  const [rawText, setRawText] = useState<string>(initialText);
  const [items, setItems] = useState<BarcodeItem[]>(() => parseBulkInput(initialText));
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isBloggerModalOpen, setIsBloggerModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Label configuration defaulting to standard 4 barcodes per 4x6 page
  const [config, setConfig] = useState<LabelConfig>({
    barcodesPerPage: 4, // strictly requested max 4 per 4x6 page
    barcodeHeight: 55,
    barcodeWidthScale: 2.0,
    fontSize: 14,
    fontFamily: 'monospace',
    includeText: true,
    textMargin: 4,
    pageMarginTop: 0.3,
    pageMarginBottom: 0.3,
    pageMarginLeft: 0.25,
    pageMarginRight: 0.25,
    showCutLines: true,
    showPageNumbers: true,
    centerBarcode: true,
  });

  const validItems = items.filter((i) => i.isValid && i.value.trim().length > 0);
  const totalPages = Math.max(1, Math.ceil(validItems.length / (config.barcodesPerPage || 4)));

  const handleLoadSample = () => {
    const sampleStr = SAMPLE_BARCODES.join('\n');
    setRawText(sampleStr);
    setItems(parseBulkInput(sampleStr));
    showToast('Loaded 8 sample barcodes from PDF', 'success');
  };

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleExportPDF = async () => {
    if (validItems.length === 0) return;
    setIsExporting(true);
    try {
      await download4x6PDF(
        items,
        config,
        `code128-4x6-labels-${Date.now()}.pdf`
      );
      showToast(`Generated 4x6 PDF (${validItems.length} barcodes on ${totalPages} pages)`, 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Export failed';
      alert(`Export error: ${msg}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    downloadStandaloneHtmlFile('code128-barcode-generator-4x6.html');
    showToast('Downloaded standalone HTML file (code128-barcode-generator-4x6.html)', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Screen layout: hidden during print */}
      <div className="no-print flex flex-col flex-1">
        <Header
          totalCount={items.length}
          validCount={validItems.length}
          totalPages={totalPages}
          barcodesPerPage={config.barcodesPerPage}
          onExportPDF={handleExportPDF}
          onPrint={handlePrint}
          onOpenBloggerModal={() => setIsBloggerModalOpen(true)}
          onDownloadHtml={handleDownloadHtml}
          isExporting={isExporting}
        />

        {/* Floating Notification Toast */}
        {notification && (
          <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">{notification.message}</span>
          </div>
        )}

        {/* Main Application Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Input + Settings (7 Cols on large screen) */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-5">
              <BarcodeInputs
                items={items}
                rawText={rawText}
                onRawTextChange={setRawText}
                onSetItems={setItems}
                onLoadSample={handleLoadSample}
              />

              <LabelSettings config={config} onChange={setConfig} />
            </div>

            {/* Right Column: Live 4x6 Label Sheet Preview (6 Cols on large screen) */}
            <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-20">
              <PagePreview
                items={items}
                config={config}
                onLoadSample={handleLoadSample}
                onPrint={handlePrint}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Blogger Embed & Widget Modal */}
      <BloggerEmbedModal
        isOpen={isBloggerModalOpen}
        onClose={() => setIsBloggerModalOpen(false)}
      />

      {/* Print-Only DOM for direct 4x6 printing */}
      <PrintablePages items={items} config={config} />
    </div>
  );
}
