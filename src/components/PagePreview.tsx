import React, { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  Scissors,
} from 'lucide-react';
import { BarcodeItem, LabelConfig } from '../types';

interface PagePreviewProps {
  items: BarcodeItem[];
  config: LabelConfig;
  onLoadSample: () => void;
  onPrint: () => void;
}

export const PagePreview: React.FC<PagePreviewProps> = ({
  items,
  config,
  onLoadSample,
  onPrint,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const validItems = items.filter((item) => item.isValid && item.value.trim().length > 0);
  const barcodesPerPage = Math.max(1, config.barcodesPerPage || 4);
  const totalPages = Math.max(1, Math.ceil(validItems.length / barcodesPerPage));

  // Reset page index if totalPages shrinks
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * barcodesPerPage;
  const currentBatch = validItems.slice(startIndex, startIndex + barcodesPerPage);

  const handleCopyBarcode = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleDownloadSinglePNG = (val: string) => {
    const canvas = document.createElement('canvas');
    try {
      JsBarcode(canvas, val, {
        format: 'CODE128',
        width: 2,
        height: 60,
        displayValue: config.includeText,
        font: config.fontFamily,
        fontSize: 16,
        textMargin: 4,
        margin: 10,
        background: '#ffffff',
      });
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `barcode-${val}.png`;
      a.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-full">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/60">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Live 4x6 Label Sheet Preview
          </h3>
        </div>

        {/* Page & Zoom Controls */}
        <div className="flex items-center gap-2">
          {totalPages > 1 && (
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                title="First Page"
              >
                <ChevronsLeft className="w-3.5 h-3.5 text-slate-600" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
              </button>
              <span className="px-2 text-xs font-semibold text-slate-700 min-w-[75px] text-center">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                title="Last Page"
              >
                <ChevronsRight className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
          )}

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.max(0.7, z - 0.1))}
              className="p-1 rounded hover:bg-slate-100 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5 text-slate-600" />
            </button>
            <span className="text-[11px] font-mono px-1 text-slate-600">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.min(1.4, z + 0.1))}
              className="p-1 rounded hover:bg-slate-100 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5 text-slate-600" />
            </button>
            <button
              type="button"
              onClick={() => setZoomScale(1)}
              className="p-1 rounded hover:bg-slate-100 text-[10px] font-semibold text-slate-500 cursor-pointer"
              title="Reset Zoom"
            >
              100%
            </button>
          </div>
        </div>
      </div>

      {/* Main Preview Stage Area */}
      <div className="flex-1 bg-slate-100/90 p-4 sm:p-6 overflow-auto flex items-center justify-center min-h-[460px]">
        {validItems.length === 0 ? (
          <div className="text-center max-w-sm py-12 px-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Scissors className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">
              No Barcodes to Display
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Enter or paste barcode values in the left input box, or load the sample data from the user provided PDF.
            </p>
            <button
              type="button"
              onClick={onLoadSample}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Load PDF Sample Barcodes</span>
            </button>
          </div>
        ) : (
          /* 4x6 Label Sheet Mockup Container */
          <div
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
            }}
            className="relative"
          >
            {/* 4x6 Paper Card: Standard 4x6 aspect ratio is 2:3. E.g. 360px x 540px */}
            <div
              id="label-4x6-page-container"
              className="w-[360px] h-[540px] bg-white rounded-lg shadow-xl border border-slate-300/80 p-5 flex flex-col justify-between relative overflow-hidden select-none"
            >
              {/* Top thermal edge visual badge */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 opacity-60" />

              {/* Barcode Slots Container */}
              <div className="flex-1 flex flex-col justify-around py-2">
                {currentBatch.map((item, index) => (
                  <BarcodeSlot
                    key={item.id}
                    item={item}
                    index={index}
                    totalInBatch={currentBatch.length}
                    config={config}
                    onCopy={() => handleCopyBarcode(item.value, item.id)}
                    onDownload={() => handleDownloadSinglePNG(item.value)}
                    isCopied={copiedId === item.id}
                  />
                ))}

                {/* Empty slot placeholders if less than barcodesPerPage */}
                {Array.from({ length: Math.max(0, barcodesPerPage - currentBatch.length) }).map(
                  (_, emptyIdx) => (
                    <div
                      key={`empty-${emptyIdx}`}
                      className="flex-1 flex items-center justify-center border border-dashed border-slate-200 rounded-md my-1 opacity-40 text-[11px] text-slate-400 font-mono"
                    >
                      Empty Slot {currentBatch.length + emptyIdx + 1}
                    </div>
                  )
                )}
              </div>

              {/* Footer info (Page indicator) */}
              {config.showPageNumbers && (
                <div className="text-center pt-1 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                  Page {currentPage} of {totalPages} &bull; 4" &times; 6" Thermal Label
                </div>
              )}
            </div>

            {/* Dimension Indicators for visual confidence */}
            <div className="absolute -bottom-6 left-0 right-0 text-center text-[11px] font-medium text-slate-400">
              Standard 4" &times; 6" Label Dimension (Thermal 203/300 DPI compatible)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface BarcodeSlotProps {
  item: BarcodeItem;
  index: number;
  totalInBatch: number;
  config: LabelConfig;
  onCopy: () => void;
  onDownload: () => void;
  isCopied: boolean;
}

const BarcodeSlot: React.FC<BarcodeSlotProps> = ({
  item,
  index,
  totalInBatch,
  config,
  onCopy,
  onDownload,
  isCopied,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current || !item.isValid) return;

    try {
      JsBarcode(svgRef.current, item.value, {
        format: 'CODE128',
        width: config.barcodeWidthScale ?? 2,
        height: config.barcodeHeight ?? 55,
        displayValue: config.includeText ?? true,
        text: item.value,
        fontSize: config.fontSize ?? 14,
        font: config.fontFamily ?? 'monospace',
        textMargin: config.textMargin ?? 4,
        textAlign: 'center',
        margin: 2,
        background: '#ffffff',
        lineColor: '#000000',
      });
      setRenderError(null);
    } catch (err) {
      setRenderError('Invalid Code 128');
    }
  }, [item.value, item.isValid, config]);

  const showDivider = config.showCutLines && index < totalInBatch - 1;

  return (
    <div className={`relative group flex flex-col items-center justify-center py-2 px-1 my-0.5 ${showDivider ? 'border-b border-dashed border-slate-300' : ''}`}>
      {/* Quick hover action buttons */}
      <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-xs border border-slate-200 rounded-md shadow-xs p-0.5 flex items-center gap-1 z-10">
        <button
          type="button"
          onClick={onCopy}
          className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors cursor-pointer"
          title="Copy barcode text"
        >
          {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
        </button>
        <button
          type="button"
          onClick={onDownload}
          className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors cursor-pointer"
          title="Download PNG"
        >
          <Download className="w-3 h-3" />
        </button>
      </div>

      {renderError ? (
        <div className="text-rose-600 font-mono text-xs py-2 bg-rose-50 px-3 rounded border border-rose-200">
          {renderError}: {item.value}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center overflow-hidden">
          <svg
            ref={svgRef}
            className="max-w-full h-auto"
            style={{ minHeight: '50px' }}
          />
        </div>
      )}
    </div>
  );
};
