import React from 'react';
import { Download, Printer, Code2, Sparkles, FileText, CheckCircle2, FileDown } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  validCount: number;
  totalPages: number;
  barcodesPerPage: number;
  onExportPDF: () => void;
  onPrint: () => void;
  onOpenBloggerModal: () => void;
  onDownloadHtml: () => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  validCount,
  totalPages,
  barcodesPerPage,
  onExportPDF,
  onPrint,
  onOpenBloggerModal,
  onDownloadHtml,
  isExporting,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono font-black text-sm tracking-tighter shadow-xs">
            ||| 128
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                Code 128 Barcode &amp; 4x6 PDF
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                4" &times; 6" Thermal Ready
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Bulk barcode generator &bull; Max {barcodesPerPage} labels per 4x6 page &bull; Blogger ready
            </p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
          {validCount > 0 && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-xs text-slate-700 border border-slate-200">
              <span className="font-semibold text-slate-900">{validCount}</span> Barcodes
              <span className="text-slate-300">&bull;</span>
              <span className="font-semibold text-slate-900">{totalPages}</span> {totalPages === 1 ? 'Page' : 'Pages'} (4x6)
            </div>
          )}

          {/* Download Standalone HTML File Button */}
          <button
            id="download-html-file-button"
            type="button"
            onClick={onDownloadHtml}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors cursor-pointer shadow-2xs"
            title="Download complete standalone HTML file to run locally or upload anywhere"
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-700" />
            <span>Download HTML File</span>
          </button>

          {/* Blogger Widget Button */}
          <button
            id="blogger-embed-button"
            type="button"
            onClick={onOpenBloggerModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors cursor-pointer"
            title="Get embed code for Blogger / Blogspot website"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Embed in Blogger</span>
          </button>

          {/* Direct Print Button */}
          <button
            id="direct-print-button"
            type="button"
            onClick={onPrint}
            disabled={validCount === 0 || isExporting}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print</span>
          </button>

          {/* Download 4x6 PDF Button */}
          <button
            id="download-pdf-button"
            type="button"
            onClick={onExportPDF}
            disabled={validCount === 0 || isExporting}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
          >
            {isExporting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download 4x6 PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
