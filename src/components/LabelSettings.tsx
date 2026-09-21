import React from 'react';
import { Sliders, HelpCircle, Scissors, Eye, Type, LayoutGrid } from 'lucide-react';
import { LabelConfig } from '../types';

interface LabelSettingsProps {
  config: LabelConfig;
  onChange: (config: LabelConfig) => void;
}

export const LabelSettings: React.FC<LabelSettingsProps> = ({ config, onChange }) => {
  const update = <K extends keyof LabelConfig>(key: K, value: LabelConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-slate-700" />
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            4x6 Label &amp; Barcode Layout
          </h2>
        </div>
        <span className="text-[11px] font-medium text-slate-500">
          Standard 4" &times; 6" Page
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Barcodes Per 4x6 Page */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
            <span>Barcodes Per 4x6 Page</span>
            <span className="text-[10px] text-blue-600 font-semibold uppercase">User Standard: 4</span>
          </label>
          <select
            value={config.barcodesPerPage}
            onChange={(e) => update('barcodesPerPage', parseInt(e.target.value, 10))}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-900 font-medium text-slate-800"
          >
            <option value={4}>4 Barcodes (Standard &bull; Max 4)</option>
            <option value={3}>3 Barcodes (Spacious)</option>
            <option value={2}>2 Barcodes (Large)</option>
            <option value={1}>1 Barcode (Extra Large Single)</option>
            <option value={5}>5 Barcodes (Compact)</option>
          </select>
        </div>

        {/* Barcode Height */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Barcode Height
          </label>
          <select
            value={config.barcodeHeight}
            onChange={(e) => update('barcodeHeight', parseInt(e.target.value, 10))}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-900 font-medium text-slate-800"
          >
            <option value={42}>Compact (42px)</option>
            <option value={55}>Standard (55px &bull; Recommended)</option>
            <option value={68}>Tall (68px)</option>
            <option value={80}>Extra Tall (80px)</option>
          </select>
        </div>

        {/* Barcode Bar Width / Density */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Bar Density (Width Scale)
          </label>
          <select
            value={config.barcodeWidthScale}
            onChange={(e) => update('barcodeWidthScale', parseFloat(e.target.value))}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-900 font-medium text-slate-800"
          >
            <option value={1.5}>Fine / Compact (1.5x)</option>
            <option value={2.0}>Standard Crisp (2.0x &bull; High Scan)</option>
            <option value={2.5}>Bold / Wide (2.5x)</option>
          </select>
        </div>

        {/* Text Font Size & Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Label Text Font
          </label>
          <select
            value={config.fontFamily}
            onChange={(e) => update('fontFamily', e.target.value as 'monospace' | 'sans-serif')}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-900 font-medium text-slate-800"
          >
            <option value="monospace">Monospace (OCR Style, like PDF sample)</option>
            <option value="sans-serif">Clean Sans-Serif</option>
          </select>
        </div>
      </div>

      {/* Toggles Row */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={config.includeText}
            onChange={(e) => update('includeText', e.target.checked)}
            className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-3.5 h-3.5"
          />
          <span className="text-slate-700 font-medium">Show human-readable text under barcode</span>
        </label>

        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={config.showCutLines}
            onChange={(e) => update('showCutLines', e.target.checked)}
            className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-3.5 h-3.5"
          />
          <span className="text-slate-700 font-medium flex items-center gap-1">
            <Scissors className="w-3 h-3 text-slate-400" />
            <span>Show dashed cut guides between labels</span>
          </span>
        </label>

        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={config.showPageNumbers}
            onChange={(e) => update('showPageNumbers', e.target.checked)}
            className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-3.5 h-3.5"
          />
          <span className="text-slate-700 font-medium">Show page numbers (Page X of Y)</span>
        </label>
      </div>
    </div>
  );
};
