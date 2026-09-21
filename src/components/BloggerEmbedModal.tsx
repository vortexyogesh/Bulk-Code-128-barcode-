import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Code2,
  Globe,
  ExternalLink,
  HelpCircle,
  Layers,
  Sparkles,
  BookOpen,
  FileDown,
  FileCode,
} from 'lucide-react';
import {
  getBloggerStandaloneWidgetCode,
  getBloggerIframeCode,
  getFullStandaloneHtmlDocument,
  downloadStandaloneHtmlFile,
} from '../utils/bloggerSnippet';

interface BloggerEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BloggerEmbedModal: React.FC<BloggerEmbedModalProps> = ({ isOpen, onClose }) => {
  const [embedType, setEmbedType] = useState<'download' | 'standalone' | 'iframe' | 'guide'>('download');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentAppUrl = window.location.href;
  const standaloneCode = getBloggerStandaloneWidgetCode();
  const iframeCode = getBloggerIframeCode(currentAppUrl);
  const fullHtmlCode = getFullStandaloneHtmlDocument();

  let activeCode = '';
  if (embedType === 'download') activeCode = fullHtmlCode;
  else if (embedType === 'standalone') activeCode = standaloneCode;
  else if (embedType === 'iframe') activeCode = iframeCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHtml = () => {
    downloadStandaloneHtmlFile('code128-barcode-generator-4x6.html');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              &lt;/&gt;
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Download Standalone HTML &amp; Blogger Embed
              </h3>
              <p className="text-xs text-slate-500">
                Download as a single offline HTML file or copy embed code for Blogger
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Option Selector Tabs */}
        <div className="flex border-b border-slate-200 px-6 pt-3 gap-2 sm:gap-4 bg-white overflow-x-auto">
          <button
            type="button"
            onClick={() => setEmbedType('download')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              embedType === 'download'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-600" />
            <span>Download HTML File</span>
          </button>

          <button
            type="button"
            onClick={() => setEmbedType('standalone')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              embedType === 'standalone'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Blogger Gadget Widget</span>
          </button>

          <button
            type="button"
            onClick={() => setEmbedType('iframe')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              embedType === 'iframe'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Iframe Embed</span>
          </button>

          <button
            type="button"
            onClick={() => setEmbedType('guide')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              embedType === 'guide'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blogger Guide</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {embedType === 'download' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-700" />
                    Standalone HTML File (All-in-One)
                  </div>
                  <p className="mt-1 text-emerald-800 leading-relaxed max-w-xl">
                    A single portable <code>.html</code> file containing the entire tool (CSS, JS, bulk creator, live 4x6 preview, and 4x6 thermal PDF generator). Double-click to run locally or upload anywhere.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadHtml}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer shrink-0"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download .html File</span>
                </button>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between pb-1.5 text-xs text-slate-500 font-medium">
                  <span>Source Code Preview (code128-barcode-generator-4x6.html)</span>
                  <span>{fullHtmlCode.length.toLocaleString()} characters</span>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[260px] border border-slate-800">
                  <code>{fullHtmlCode}</code>
                </pre>
              </div>
            </div>
          )}

          {embedType === 'standalone' && (
            <div>
              <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-950 mb-3 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">100% Standalone Blogger Gadget:</span>
                  <p className="mt-0.5 text-amber-900 leading-relaxed">
                    This snippet includes all styles, scripts (JsBarcode + jsPDF via CDN), bulk input, live preview, and 4x6 PDF download. You can paste it directly into Blogger&apos;s <strong>HTML/JavaScript Gadget</strong> or any <strong>Blog Post</strong> using HTML view.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between pb-1.5 text-xs text-slate-500 font-medium">
                  <span>HTML / JavaScript Code Snippet</span>
                  <span>{standaloneCode.length} characters</span>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[300px] border border-slate-800 selection:bg-amber-500 selection:text-slate-900">
                  <code>{standaloneCode}</code>
                </pre>
              </div>
            </div>
          )}

          {embedType === 'iframe' && (
            <div>
              <div className="p-3 bg-blue-50/80 border border-blue-200/80 rounded-xl text-xs text-blue-950 mb-3">
                <span className="font-bold">Responsive Iframe Embed:</span>
                <p className="mt-0.5 text-blue-900 leading-relaxed">
                  Embeds this full application directly within your Blogger template or post. Perfect for always staying updated with latest enhancements.
                </p>
              </div>

              <div className="relative">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[300px] border border-slate-800">
                  <code>{iframeCode}</code>
                </pre>
              </div>
            </div>
          )}

          {embedType === 'guide' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                    1
                  </span>
                  Method A: Add as a Gadget in Blogger Layout (Sidebar or Full Width)
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-1 leading-relaxed">
                  <li>Log in to your <strong>Blogger Dashboard</strong> (<a href="https://blogger.com" target="_blank" rel="noreferrer" className="text-blue-600 underline">blogger.com</a>).</li>
                  <li>Click <strong>Layout</strong> in the left sidebar menu.</li>
                  <li>Find the section where you want the tool (e.g. <em>Sidebar</em>, <em>Main</em>, or <em>Page Body</em>) and click <strong>+ Add a Gadget</strong>.</li>
                  <li>In the popup list, choose <strong>HTML/JavaScript</strong>.</li>
                  <li>Leave Title blank or set to <em>"Code 128 Barcode Generator"</em>.</li>
                  <li>Paste the copied code into the <strong>Content</strong> box.</li>
                  <li>Click <strong>Save</strong>, then click the orange <strong>Save Layout</strong> button at the bottom right.</li>
                </ol>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  Method B: Add into a Specific Post or Static Page
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-1 leading-relaxed">
                  <li>In your Blogger Dashboard, click <strong>Posts &gt; New Post</strong> (or <strong>Pages &gt; New Page</strong>).</li>
                  <li>On the top-left toolbar, click the pencil icon and switch to <strong>&lt;&gt; HTML view</strong>.</li>
                  <li>Paste the copied snippet into the editor.</li>
                  <li>Click <strong>Publish</strong> or <strong>Update</strong>. Your readers can now create bulk barcodes directly on your blog!</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleDownloadHtml}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer border border-emerald-300"
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-700" />
            <span>Download .html File</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            {embedType !== 'guide' && (
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
