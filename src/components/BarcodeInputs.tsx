import React, { useState, useRef } from 'react';
import {
  List,
  Binary,
  Upload,
  Sparkles,
  Trash2,
  Copy,
  AlertCircle,
  FileSpreadsheet,
  Check,
} from 'lucide-react';
import { BarcodeItem, InputMode, SequenceConfig } from '../types';
import { parseBulkInput, generateSequence } from '../utils/barcode';

interface BarcodeInputsProps {
  items: BarcodeItem[];
  rawText: string;
  onRawTextChange: (text: string) => void;
  onSetItems: (items: BarcodeItem[]) => void;
  onLoadSample: () => void;
}

export const BarcodeInputs: React.FC<BarcodeInputsProps> = ({
  items,
  rawText,
  onRawTextChange,
  onSetItems,
  onLoadSample,
}) => {
  const [activeTab, setActiveTab] = useState<InputMode>('bulk');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sequence generator state
  const [seqConfig, setSeqConfig] = useState<SequenceConfig>({
    prefix: 'FMPP',
    startNumber: 4162047741,
    count: 12,
    step: 1,
    suffix: '',
    padLength: 10,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onRawTextChange(val);
    const parsed = parseBulkInput(val);
    onSetItems(parsed);
  };

  const handleGenerateSequence = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = generateSequence(
      seqConfig.prefix,
      seqConfig.startNumber,
      seqConfig.count,
      seqConfig.step,
      seqConfig.suffix,
      seqConfig.padLength
    );
    const textVal = generated.map((g) => g.value).join('\n');
    onRawTextChange(textVal);
    onSetItems(generated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onRawTextChange(content);
        const parsed = parseBulkInput(content);
        onSetItems(parsed);
      }
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveDuplicates = () => {
    const seen = new Set<string>();
    const uniqueItems: BarcodeItem[] = [];
    const uniqueLines: string[] = [];

    for (const item of items) {
      const key = item.value.trim();
      if (key && !seen.has(key)) {
        seen.add(key);
        uniqueItems.push(item);
        uniqueLines.push(key);
      }
    }

    onRawTextChange(uniqueLines.join('\n'));
    onSetItems(uniqueItems);
  };

  const handleClearAll = () => {
    onRawTextChange('');
    onSetItems([]);
  };

  const handleCopyList = () => {
    const text = items.map((i) => i.value).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const invalidItems = items.filter((i) => !i.isValid);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('bulk')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'bulk'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <List className="w-3.5 h-3.5" />
          <span>Paste List</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sequence')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'sequence'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Binary className="w-3.5 h-3.5" />
          <span>Generate Series</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload CSV/TXT</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* TAB 1: BULK TEXTAREA */}
        {activeTab === 'bulk' && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="barcode-textarea" className="text-xs font-semibold text-slate-700">
                Barcode Values (One per line or comma/tab separated)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onLoadSample}
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Load Sample from PDF</span>
                </button>
              </div>
            </div>

            <div className="relative flex-1 min-h-[220px]">
              <textarea
                id="barcode-textarea"
                value={rawText}
                onChange={handleTextChange}
                placeholder="Paste barcodes here, for example:&#10;FMPP4162047741&#10;FMPC6265465305&#10;FMPP4161144943&#10;FMPP4110839820&#10;FMPC6277475378"
                className="w-full h-full p-3 font-mono text-xs leading-relaxed text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-y bg-slate-50/40"
                rows={10}
              />
            </div>
          </div>
        )}

        {/* TAB 2: SEQUENCE GENERATOR */}
        {activeTab === 'sequence' && (
          <form onSubmit={handleGenerateSequence} className="space-y-3.5">
            <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900">
              Instantly create batches of serialized Code 128 barcodes (e.g. inventory tags, shipping labels, product serials).
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Prefix (Optional)
                </label>
                <input
                  type="text"
                  value={seqConfig.prefix}
                  onChange={(e) => setSeqConfig({ ...seqConfig, prefix: e.target.value })}
                  placeholder="FMPP"
                  className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Suffix (Optional)
                </label>
                <input
                  type="text"
                  value={seqConfig.suffix}
                  onChange={(e) => setSeqConfig({ ...seqConfig, suffix: e.target.value })}
                  placeholder="-US"
                  className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Start Number
                </label>
                <input
                  type="number"
                  value={seqConfig.startNumber}
                  onChange={(e) => setSeqConfig({ ...seqConfig, startNumber: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Count to Generate
                </label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={seqConfig.count}
                  onChange={(e) => setSeqConfig({ ...seqConfig, count: parseInt(e.target.value, 10) || 1 })}
                  className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Number Padding (Digits)
                </label>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={seqConfig.padLength}
                  onChange={(e) => setSeqConfig({ ...seqConfig, padLength: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Step Increment
                </label>
                <input
                  type="number"
                  min={1}
                  value={seqConfig.step}
                  onChange={(e) => setSeqConfig({ ...seqConfig, step: parseInt(e.target.value, 10) || 1 })}
                  className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-md focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Generate {seqConfig.count} Sequential Barcodes
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: FILE UPLOAD */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-slate-50"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <FileSpreadsheet className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-xs font-semibold text-slate-800">
                Click or drag &amp; drop to upload CSV or TXT
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Plain text or comma/newline separated barcode items
              </p>
            </div>

            <div className="text-xs text-slate-500">
              Supported formats: Standard text files (.txt) or comma-delimited files (.csv) exported from Excel or Google Sheets.
            </div>
          </div>
        )}

        {/* Validation Errors Notice */}
        {invalidItems.length > 0 && (
          <div className="mt-3 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">{invalidItems.length} invalid item(s):</span>
              <p className="text-[11px] text-rose-700 mt-0.5">
                Code 128 requires standard ASCII characters (A-Z, 0-9, standard symbols).
              </p>
            </div>
          </div>
        )}

        {/* Quick Toolbar */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-900">{items.length}</span> items loaded
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopyList}
              disabled={items.length === 0}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-40 cursor-pointer"
              title="Copy current list"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleRemoveDuplicates}
              disabled={items.length === 0}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-40 cursor-pointer"
              title="Remove duplicate barcodes"
            >
              <span>Dedupe</span>
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              disabled={items.length === 0}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-colors disabled:opacity-40 cursor-pointer"
              title="Clear all barcodes"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
