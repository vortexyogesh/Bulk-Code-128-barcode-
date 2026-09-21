/**
 * Generates ready-to-paste code snippets and downloadable standalone HTML files for Blogger & offline usage.
 * Everything is fully self-contained in a single tool without external files or folders.
 */

export function getBloggerIframeCode(appUrl: string): string {
  const safeUrl = appUrl || (typeof window !== 'undefined' ? window.location.href : '');
  return `<!-- Code 128 Bulk Barcode 4x6 PDF Generator - Blogger Embed -->
<div style="width: 100%; max-width: 1200px; margin: 0 auto; overflow: hidden; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
  <iframe
    src="${safeUrl}"
    title="Code 128 Bulk Barcode 4x6 PDF Generator"
    style="width: 100%; height: 880px; border: none; display: block;"
    allow="clipboard-write"
    loading="lazy">
  </iframe>
</div>`;
}

/**
 * Returns the complete, self-contained HTML/CSS/JS block that can be directly pasted
 * into any Blogger Page or Post (using HTML view) or into an HTML/JavaScript Gadget.
 */
export function getFullBloggerSnippet(): string {
  return `<!-- ==================================================================== -->
<!-- CODE 128 BULK BARCODE GENERATOR - 4X6 THERMAL LABEL TOOL FOR BLOGGER -->
<!-- Paste directly into Blogger Page / Post in HTML view (<>) or in a Gadget -->
<!-- ==================================================================== -->

<div id="b128-tool" class="b128-container">
  <!-- Load JsBarcode & jsPDF CDNs -->
  <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>

  <style>
    #b128-tool {
      --slate-50: #f8fafc;
      --slate-100: #f1f5f9;
      --slate-200: #e2e8f0;
      --slate-300: #cbd5e1;
      --slate-400: #94a3b8;
      --slate-500: #64748b;
      --slate-600: #475569;
      --slate-700: #334155;
      --slate-800: #1e293b;
      --slate-900: #0f172a;
      --blue-50: #eff6ff;
      --blue-100: #dbeafe;
      --blue-600: #2563eb;
      --blue-700: #1d4ed8;
      --emerald-50: #ecfdf5;
      --emerald-100: #d1fae5;
      --emerald-600: #059669;
      --emerald-700: #047857;
      --rose-50: #fff1f2;
      --rose-600: #e11d48;

      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      max-width: 1240px;
      margin: 16px auto;
      padding: 0 12px;
      color: var(--slate-800);
      box-sizing: border-box;
      line-height: 1.5;
    }
    #b128-tool * {
      box-sizing: border-box;
    }

    /* Top Bar */
    #b128-tool .b128-header {
      background: #ffffff;
      border: 1px solid var(--slate-200);
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    #b128-tool .b128-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    #b128-tool .b128-logo {
      background: var(--slate-900);
      color: #ffffff;
      font-family: monospace;
      font-weight: 800;
      font-size: 13px;
      padding: 8px 10px;
      border-radius: 8px;
      letter-spacing: -0.5px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    #b128-tool .b128-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--slate-900);
      margin: 0;
      line-height: 1.2;
    }
    #b128-tool .b128-subtitle {
      font-size: 12px;
      color: var(--slate-500);
      margin: 3px 0 0 0;
    }
    #b128-tool .b128-header-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }

    /* Buttons */
    #b128-tool .b128-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.15s ease;
      text-decoration: none;
      white-space: nowrap;
    }
    #b128-tool .b128-btn-dark {
      background: var(--slate-900);
      color: #ffffff;
    }
    #b128-tool .b128-btn-dark:hover {
      background: var(--slate-800);
    }
    #b128-tool .b128-btn-white {
      background: #ffffff;
      color: var(--slate-700);
      border-color: var(--slate-200);
    }
    #b128-tool .b128-btn-white:hover {
      background: var(--slate-50);
      color: var(--slate-900);
    }
    #b128-tool .b128-btn-blue {
      background: var(--blue-600);
      color: #ffffff;
    }
    #b128-tool .b128-btn-blue:hover {
      background: var(--blue-700);
    }

    /* Grid Layout */
    #b128-tool .b128-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      align-items: start;
    }
    @media (max-width: 992px) {
      #b128-tool .b128-layout {
        grid-template-columns: 1fr;
      }
    }

    /* Cards */
    #b128-tool .b128-card {
      background: #ffffff;
      border: 1px solid var(--slate-200);
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      overflow: hidden;
      margin-bottom: 16px;
    }
    #b128-tool .b128-card-header {
      padding: 12px 16px;
      border-bottom: 1px solid var(--slate-100);
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    #b128-tool .b128-card-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--slate-800);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    #b128-tool .b128-card-body {
      padding: 16px;
    }

    /* Tabs */
    #b128-tool .b128-tabs {
      display: flex;
      border-bottom: 1px solid var(--slate-200);
      background: #f8fafc;
      padding: 6px 8px 0 8px;
      gap: 4px;
    }
    #b128-tool .b128-tab-btn {
      flex: 1;
      padding: 8px 10px;
      font-size: 12px;
      font-weight: 600;
      color: var(--slate-600);
      background: transparent;
      border-radius: 6px 6px 0 0;
      border: 1px solid transparent;
      border-bottom: none;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s;
    }
    #b128-tool .b128-tab-btn:hover {
      color: var(--slate-900);
      background: rgba(0,0,0,0.02);
    }
    #b128-tool .b128-tab-btn.active {
      background: #ffffff;
      color: var(--slate-900);
      border-color: var(--slate-200);
    }

    /* Textarea & Inputs */
    #b128-tool textarea {
      width: 100%;
      height: 220px;
      padding: 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12.5px;
      line-height: 1.6;
      color: var(--slate-800);
      border: 1px solid var(--slate-200);
      border-radius: 8px;
      background: var(--slate-50);
      resize: vertical;
      box-sizing: border-box;
    }
    #b128-tool textarea:focus {
      outline: none;
      border-color: var(--slate-900);
      background: #ffffff;
    }

    #b128-tool .b128-input-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid var(--slate-100);
      font-size: 12px;
      flex-wrap: wrap;
      gap: 8px;
    }
    #b128-tool .b128-tool-actions {
      display: flex;
      gap: 6px;
    }
    #b128-tool .b128-tool-btn {
      padding: 4px 8px;
      font-size: 11px;
      font-weight: 500;
      color: var(--slate-600);
      background: var(--slate-100);
      border: 1px solid var(--slate-200);
      border-radius: 4px;
      cursor: pointer;
    }
    #b128-tool .b128-tool-btn:hover {
      color: var(--slate-900);
      background: var(--slate-200);
    }
    #b128-tool .b128-tool-btn-red:hover {
      color: var(--rose-600);
      background: var(--rose-50);
      border-color: #fecdd3;
    }

    /* Form Fields */
    #b128-tool .b128-form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 12px;
      margin-bottom: 12px;
    }
    #b128-tool label {
      display: block;
      font-size: 11.5px;
      font-weight: 600;
      color: var(--slate-700);
      margin-bottom: 4px;
    }
    #b128-tool input[type="text"],
    #b128-tool input[type="number"],
    #b128-tool select {
      width: 100%;
      padding: 7px 9px;
      font-size: 12px;
      border: 1px solid var(--slate-200);
      border-radius: 6px;
      background: var(--slate-50);
      color: var(--slate-900);
      box-sizing: border-box;
    }
    #b128-tool input:focus,
    #b128-tool select:focus {
      outline: none;
      border-color: var(--slate-900);
      background: #ffffff;
    }

    #b128-tool .b128-checkbox-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid var(--slate-100);
    }
    #b128-tool .b128-check-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--slate-700);
      cursor: pointer;
    }
    #b128-tool .b128-check-item input {
      margin: 0;
      cursor: pointer;
    }

    /* Upload Zone */
    #b128-tool .b128-upload-box {
      border: 2px dashed var(--slate-300);
      border-radius: 8px;
      padding: 24px;
      text-align: center;
      background: var(--slate-50);
      cursor: pointer;
      transition: all 0.15s;
    }
    #b128-tool .b128-upload-box:hover {
      border-color: var(--slate-400);
      background: #ffffff;
    }

    /* Preview Right Side */
    #b128-tool .b128-preview-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px 14px;
      border-bottom: 1px solid var(--slate-200);
      background: #ffffff;
    }
    #b128-tool .b128-pager {
      display: inline-flex;
      align-items: center;
      border: 1px solid var(--slate-200);
      border-radius: 6px;
      overflow: hidden;
      background: #ffffff;
    }
    #b128-tool .b128-pager button {
      background: #ffffff;
      border: none;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: 600;
      color: var(--slate-700);
      cursor: pointer;
      border-right: 1px solid var(--slate-200);
    }
    #b128-tool .b128-pager button:last-child {
      border-right: none;
    }
    #b128-tool .b128-pager button:hover:not(:disabled) {
      background: var(--slate-100);
      color: var(--slate-900);
    }
    #b128-tool .b128-pager button:disabled {
      color: var(--slate-300);
      cursor: not-allowed;
    }
    #b128-tool .b128-pager span {
      padding: 4px 10px;
      font-size: 11.5px;
      font-weight: 600;
      color: var(--slate-800);
      background: var(--slate-50);
      border-right: 1px solid var(--slate-200);
    }

    #b128-tool .b128-zoom {
      display: inline-flex;
      align-items: center;
      border: 1px solid var(--slate-200);
      border-radius: 6px;
      overflow: hidden;
      background: #ffffff;
    }
    #b128-tool .b128-zoom button {
      background: #ffffff;
      border: none;
      padding: 4px 8px;
      font-size: 11px;
      color: var(--slate-700);
      cursor: pointer;
      border-right: 1px solid var(--slate-200);
    }
    #b128-tool .b128-zoom button:last-child {
      border-right: none;
    }
    #b128-tool .b128-zoom button:hover {
      background: var(--slate-100);
    }
    #b128-tool .b128-zoom span {
      padding: 4px 6px;
      font-size: 11px;
      font-family: monospace;
      color: var(--slate-600);
      border-right: 1px solid var(--slate-200);
    }

    /* 4x6 Preview Stage */
    #b128-tool .b128-stage {
      background: #e2e8f0;
      padding: 24px 16px;
      border-radius: 0 0 12px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
    }
    #b128-tool .b128-sheet-wrapper {
      transform-origin: top center;
      transition: transform 0.15s ease-out;
    }
    #b128-tool .b128-mockup-4x6 {
      width: 320px;
      height: 480px;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      padding: 14px 12px;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
    }
    #b128-tool .b128-slot {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 4px 0;
    }
    #b128-tool .b128-slot.has-divider {
      border-bottom: 1px dashed #cbd5e1;
    }
    #b128-tool .b128-slot-actions {
      position: absolute;
      top: 2px;
      right: 2px;
      display: none;
      gap: 3px;
      background: rgba(255,255,255,0.95);
      border: 1px solid var(--slate-200);
      border-radius: 4px;
      padding: 2px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      z-index: 10;
    }
    #b128-tool .b128-slot:hover .b128-slot-actions {
      display: flex;
    }
    #b128-tool .b128-act-btn {
      background: transparent;
      border: none;
      padding: 3px 5px;
      border-radius: 3px;
      cursor: pointer;
      color: var(--slate-600);
      font-size: 11px;
      display: inline-flex;
      align-items: center;
    }
    #b128-tool .b128-act-btn:hover {
      background: var(--slate-100);
      color: var(--slate-900);
    }
    #b128-tool .b128-sheet-footer {
      font-size: 9px;
      color: var(--slate-400);
      text-align: center;
      margin-top: auto;
      padding-top: 4px;
      font-family: monospace;
      letter-spacing: 0.02em;
    }

    /* Toast Notification */
    #b128-toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--slate-900);
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      display: none;
      z-index: 99999;
      animation: b128Fade 0.2s ease;
    }
    @keyframes b128Fade {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Print Styles */
    @media print {
      body * {
        visibility: hidden !important;
      }
      #b128-tool, #b128-tool #b128-sheet-mockup, #b128-tool #b128-sheet-mockup * {
        visibility: visible !important;
      }
      #b128-tool #b128-sheet-mockup {
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        width: 4in !important;
        height: 6in !important;
        box-shadow: none !important;
        border: none !important;
        margin: 0 !important;
        padding: 0.25in !important;
      }
    }
  </style>

  <!-- HEADER BAR -->
  <div class="b128-header">
    <div class="b128-brand">
      <div class="b128-logo">||| 128</div>
      <div>
        <h2 class="b128-title">Code 128 Bulk Barcode Generator</h2>
        <p class="b128-subtitle">Standard 4x6 Thermal Label PDF &bull; User Max: 4 Barcodes Per Page</p>
      </div>
    </div>
    <div class="b128-header-actions">
      <button id="b128-btn-pdf" type="button" class="b128-btn b128-btn-dark">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span>Download 4x6 PDF</span>
      </button>
      <button id="b128-btn-print" type="button" class="b128-btn b128-btn-white">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
        <span>Print (4x6 Thermal)</span>
      </button>
    </div>
  </div>

  <!-- MAIN 2-COLUMN LAYOUT -->
  <div class="b128-layout">
    <!-- LEFT: INPUTS & CONFIG -->
    <div>
      <!-- CARD 1: INPUT MODES -->
      <div class="b128-card">
        <div class="b128-tabs">
          <button id="b128-tab-bulk-btn" type="button" class="b128-tab-btn active" onclick="b128SwitchTab('bulk')">
            Bulk Input / Paste
          </button>
          <button id="b128-tab-seq-btn" type="button" class="b128-tab-btn" onclick="b128SwitchTab('seq')">
            Generate Series
          </button>
          <button id="b128-tab-upload-btn" type="button" class="b128-tab-btn" onclick="b128SwitchTab('upload')">
            Upload CSV / TXT
          </button>
        </div>

        <div class="b128-card-body">
          <!-- TAB 1: PASTE BULK -->
          <div id="b128-panel-bulk">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="margin-bottom: 0;">Barcode Values (One per line or comma/tab separated):</label>
              <button id="b128-btn-sample" type="button" style="background: none; border: none; color: var(--blue-600); font-size: 12px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                <span>Load Sample from PDF</span>
              </button>
            </div>
            <textarea id="b128-input" placeholder="Paste barcodes here, for example:&#10;FMPP4162047741&#10;FMPC6265465305&#10;FMPP4161144943&#10;FMPP4110839820&#10;FMPC6277475378&#10;FMPP4162047749"></textarea>
            
            <div class="b128-input-toolbar">
              <div id="b128-counter-text" style="color: var(--slate-600); font-weight: 500;">
                <strong id="b128-count-num" style="color: var(--slate-900);">8</strong> barcodes loaded
              </div>
              <div class="b128-tool-actions">
                <button id="b128-btn-copy-list" type="button" class="b128-tool-btn" title="Copy all to clipboard">Copy List</button>
                <button id="b128-btn-dedupe" type="button" class="b128-tool-btn" title="Remove duplicate codes">Dedupe</button>
                <button id="b128-btn-clear" type="button" class="b128-tool-btn b128-tool-btn-red" title="Clear all codes">Clear</button>
              </div>
            </div>
          </div>

          <!-- TAB 2: SERIES GENERATOR -->
          <div id="b128-panel-seq" style="display: none;">
            <div style="background: var(--blue-50); border: 1px solid var(--blue-100); border-radius: 6px; padding: 8px 10px; font-size: 11.5px; color: #1e3a8a; margin-bottom: 12px;">
              Create consecutive serial numbers or inventory tags instantly.
            </div>
            <div class="b128-form-grid">
              <div>
                <label>Prefix:</label>
                <input type="text" id="b128-seq-prefix" value="FMPP">
              </div>
              <div>
                <label>Suffix:</label>
                <input type="text" id="b128-seq-suffix" placeholder="-US">
              </div>
              <div>
                <label>Start Number:</label>
                <input type="number" id="b128-seq-start" value="4162047741">
              </div>
              <div>
                <label>Count:</label>
                <input type="number" id="b128-seq-count" value="12" min="1" max="500">
              </div>
              <div>
                <label>Pad Digits:</label>
                <input type="number" id="b128-seq-pad" value="10">
              </div>
              <div>
                <label>Step Increment:</label>
                <input type="number" id="b128-seq-step" value="1">
              </div>
            </div>
            <button id="b128-btn-generate-seq" type="button" class="b128-btn b128-btn-dark" style="width: 100%; justify-content: center;">
              Generate Sequential Barcodes
            </button>
          </div>

          <!-- TAB 3: CSV/TXT UPLOAD -->
          <div id="b128-panel-upload" style="display: none;">
            <input type="file" id="b128-file-input" accept=".csv,.txt" style="display: none;">
            <div class="b128-upload-box" onclick="document.getElementById('b128-file-input').click()">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 6px auto; display: block; color: var(--slate-400);"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/></svg>
              <div style="font-size: 13px; font-weight: 600; color: var(--slate-800);">Click or drop CSV / TXT file here</div>
              <div style="font-size: 11px; color: var(--slate-500); margin-top: 2px;">Accepts Excel exports or text files</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CARD 2: 4X6 LAYOUT SETTINGS -->
      <div class="b128-card">
        <div class="b128-card-header">
          <h3 class="b128-card-title">4x6 Label &amp; Barcode Layout</h3>
          <span style="font-size: 11px; color: var(--slate-500); font-weight: 500;">4" &times; 6" Page</span>
        </div>
        <div class="b128-card-body">
          <div class="b128-form-grid">
            <div>
              <label style="display: flex; justify-content: space-between;">
                <span>Barcodes Per Page</span>
                <span style="color: var(--blue-600); font-weight: 700;">USER: 4</span>
              </label>
              <select id="b128-cfg-per-page">
                <option value="4" selected>4 Barcodes (Standard &bull; Max 4)</option>
                <option value="3">3 Barcodes (Spacious)</option>
                <option value="2">2 Barcodes (Large)</option>
                <option value="1">1 Barcode (Single Full)</option>
                <option value="5">5 Barcodes (Compact)</option>
              </select>
            </div>
            <div>
              <label>Barcode Height</label>
              <select id="b128-cfg-height">
                <option value="42">Compact (42px)</option>
                <option value="55" selected>Standard (55px &bull; Recommended)</option>
                <option value="68">Tall (68px)</option>
                <option value="80">Extra Tall (80px)</option>
              </select>
            </div>
            <div>
              <label>Bar Density (Scale)</label>
              <select id="b128-cfg-density">
                <option value="1.5">Fine / Compact (1.5x)</option>
                <option value="2.0" selected>Standard Crisp (2.0x &bull; High Scan)</option>
                <option value="2.5">Bold / Wide (2.5x)</option>
              </select>
            </div>
            <div>
              <label>Text Font</label>
              <select id="b128-cfg-font">
                <option value="monospace" selected>Monospace (OCR Style)</option>
                <option value="sans-serif">Clean Sans-Serif</option>
              </select>
            </div>
          </div>

          <div class="b128-checkbox-row">
            <label class="b128-check-item">
              <input type="checkbox" id="b128-cfg-text" checked>
              <span>Show human-readable text under barcode</span>
            </label>
            <label class="b128-check-item">
              <input type="checkbox" id="b128-cfg-cutlines" checked>
              <span>Show dashed cut guides between labels</span>
            </label>
            <label class="b128-check-item">
              <input type="checkbox" id="b128-cfg-pagenums" checked>
              <span>Show page number in sheet footer</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT: LIVE 4X6 LABEL SHEET PREVIEW -->
    <div>
      <div class="b128-card" style="margin-bottom: 0;">
        <div class="b128-preview-bar">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
            <strong style="font-size: 13px; color: var(--slate-900);">Live 4x6 Label Sheet Preview</strong>
          </div>

          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <!-- Pager -->
            <div class="b128-pager">
              <button id="b128-p-first" type="button" title="First Page">&laquo;</button>
              <button id="b128-p-prev" type="button" title="Previous Page">&lsaquo;</button>
              <span id="b128-p-num">1 / 2</span>
              <button id="b128-p-next" type="button" title="Next Page">&rsaquo;</button>
              <button id="b128-p-last" type="button" title="Last Page">&raquo;</button>
            </div>

            <!-- Zoom -->
            <div class="b128-zoom">
              <button id="b128-z-out" type="button" title="Zoom Out">&minus;</button>
              <span id="b128-z-text">100%</span>
              <button id="b128-z-in" type="button" title="Zoom In">&plus;</button>
              <button id="b128-z-reset" type="button" title="Reset Zoom" style="font-size: 10px;">Reset</button>
            </div>
          </div>
        </div>

        <div class="b128-stage">
          <div id="b128-zoom-box" class="b128-sheet-wrapper">
            <div id="b128-sheet-mockup" class="b128-mockup-4x6">
              <!-- Barcodes render here dynamically -->
            </div>
          </div>
          <div style="font-size: 11px; color: var(--slate-500); margin-top: 10px;">
            Standard 4" &times; 6" Thermal Label Sheet &bull; Ready for Zebra, Rollo, Dymo, Brother
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="b128-toast"></div>
</div>

<!-- ==================================================================== -->
<!-- APPLICATION LOGIC: JSBARCODE + JSPDF RESILIENT INITIALIZER -->
<!-- ==================================================================== -->
<script>
(function() {
  var sampleData = [
    'FMPP4162047741',
    'FMPC6265465305',
    'FMPP4161144943',
    'FMPP4110839820',
    'FMPC6277475378',
    'FMPP4162047749',
    'FMPC6265465312',
    'FMPP4161144955'
  ];

  var currentPage = 1;
  var currentZoom = 1.0;

  var inputEl = document.getElementById('b128-input');
  var countNumEl = document.getElementById('b128-count-num');
  var perPageEl = document.getElementById('b128-cfg-per-page');
  var heightEl = document.getElementById('b128-cfg-height');
  var densityEl = document.getElementById('b128-cfg-density');
  var fontEl = document.getElementById('b128-cfg-font');
  var textEl = document.getElementById('b128-cfg-text');
  var cutlinesEl = document.getElementById('b128-cfg-cutlines');
  var pagenumsEl = document.getElementById('b128-cfg-pagenums');

  var sheetMockup = document.getElementById('b128-sheet-mockup');
  var pNumEl = document.getElementById('b128-p-num');
  var pFirst = document.getElementById('b128-p-first');
  var pPrev = document.getElementById('b128-p-prev');
  var pNext = document.getElementById('b128-p-next');
  var pLast = document.getElementById('b128-p-last');

  var zoomBox = document.getElementById('b128-zoom-box');
  var zoomText = document.getElementById('b128-z-text');

  function showToast(msg) {
    var t = document.getElementById('b128-toast');
    if (!t) return;
    t.textContent = msg;
    t.style.display = 'block';
    setTimeout(function() { t.style.display = 'none'; }, 2200);
  }

  window.b128SwitchTab = function(tab) {
    document.getElementById('b128-tab-bulk-btn').className = tab === 'bulk' ? 'b128-tab-btn active' : 'b128-tab-btn';
    document.getElementById('b128-tab-seq-btn').className = tab === 'seq' ? 'b128-tab-btn active' : 'b128-tab-btn';
    document.getElementById('b128-tab-upload-btn').className = tab === 'upload' ? 'b128-tab-btn active' : 'b128-tab-btn';

    document.getElementById('b128-panel-bulk').style.display = tab === 'bulk' ? 'block' : 'none';
    document.getElementById('b128-panel-seq').style.display = tab === 'seq' ? 'block' : 'none';
    document.getElementById('b128-panel-upload').style.display = tab === 'upload' ? 'block' : 'none';
  };

  function getBarcodes() {
    var raw = inputEl ? inputEl.value : '';
    if (!raw) return [];
    var parts = raw.split(/[\\r\\n,]+/);
    var list = [];
    for (var i = 0; i < parts.length; i++) {
      var item = parts[i].trim();
      if (item.length > 0) list.push(item);
    }
    return list;
  }

  function ensureJsBarcode(callback) {
    if (typeof JsBarcode === 'function') {
      callback();
      return;
    }
    var checkTimer = setInterval(function() {
      if (typeof JsBarcode === 'function') {
        clearInterval(checkTimer);
        callback();
      }
    }, 100);

    // After 3 seconds, inject fallback if still not loaded
    setTimeout(function() {
      if (typeof JsBarcode !== 'function') {
        var s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.6/JsBarcode.all.min.js';
        s.onload = function() {
          clearInterval(checkTimer);
          callback();
        };
        document.head.appendChild(s);
      }
    }, 1500);
  }

  function renderPreview() {
    var codes = getBarcodes();
    var perPage = parseInt(perPageEl.value, 10) || 4;
    var totalPages = Math.max(1, Math.ceil(codes.length / perPage));

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    countNumEl.textContent = codes.length;
    pNumEl.textContent = currentPage + ' / ' + totalPages;

    pFirst.disabled = currentPage <= 1;
    pPrev.disabled = currentPage <= 1;
    pNext.disabled = currentPage >= totalPages;
    pLast.disabled = currentPage >= totalPages;

    sheetMockup.innerHTML = '';

    if (codes.length === 0) {
      sheetMockup.innerHTML = '<div style="color: #94a3b8; font-size: 13px; text-align: center; margin: auto; padding: 20px;">No barcodes entered.<br>Paste values above or click &quot;Load Sample from PDF&quot;.</div>';
      return;
    }

    var startIndex = (currentPage - 1) * perPage;
    var pageCodes = codes.slice(startIndex, startIndex + perPage);

    var bHeight = parseInt(heightEl.value, 10) || 55;
    var bWidth = parseFloat(densityEl.value) || 2.0;
    var bFont = fontEl.value;
    var bShowText = textEl.checked;
    var bCutLines = cutlinesEl.checked;
    var bPageNumbers = pagenumsEl.checked;

    for (var i = 0; i < pageCodes.length; i++) {
      (function(codeVal, idx) {
        var slot = document.createElement('div');
        slot.className = 'b128-slot' + (bCutLines && idx < pageCodes.length - 1 ? ' has-divider' : '');

        // Slot action buttons (Copy & PNG)
        var actBox = document.createElement('div');
        actBox.className = 'b128-slot-actions';

        var copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'b128-act-btn';
        copyBtn.title = 'Copy code: ' + codeVal;
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = function(e) {
          e.stopPropagation();
          navigator.clipboard.writeText(codeVal);
          showToast('Copied: ' + codeVal);
        };

        var pngBtn = document.createElement('button');
        pngBtn.type = 'button';
        pngBtn.className = 'b128-act-btn';
        pngBtn.title = 'Download single barcode PNG';
        pngBtn.textContent = 'PNG';
        pngBtn.onclick = function(e) {
          e.stopPropagation();
          downloadSingleBarcodePNG(codeVal);
        };

        actBox.appendChild(copyBtn);
        actBox.appendChild(pngBtn);
        slot.appendChild(actBox);

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.maxWidth = '96%';
        svg.style.height = 'auto';
        slot.appendChild(svg);
        sheetMockup.appendChild(slot);

        try {
          if (typeof JsBarcode === 'function') {
            JsBarcode(svg, codeVal, {
              format: 'CODE128',
              width: bWidth,
              height: bHeight,
              displayValue: bShowText,
              font: bFont,
              fontSize: 14,
              textMargin: 3,
              margin: 2
            });
          } else {
            svg.innerHTML = '<text x="10" y="20" fill="#dc2626" font-size="11">Loading JsBarcode...</text>';
          }
        } catch (err) {
          slot.innerHTML = '<span style="color: #e11d48; font-size: 11px;">Invalid Code 128: ' + codeVal + '</span>';
        }
      })(pageCodes[i], i);
    }

    if (bPageNumbers) {
      var footer = document.createElement('div');
      footer.className = 'b128-sheet-footer';
      footer.textContent = 'Page ' + currentPage + ' of ' + totalPages + ' \u2022 4" \u00D7 6" Thermal Label';
      sheetMockup.appendChild(footer);
    }
  }

  function downloadSingleBarcodePNG(val) {
    var canvas = document.createElement('canvas');
    try {
      JsBarcode(canvas, val, {
        format: 'CODE128',
        width: parseFloat(densityEl.value) || 2.0,
        height: parseInt(heightEl.value, 10) || 55,
        displayValue: textEl.checked,
        font: fontEl.value,
        fontSize: 15,
        textMargin: 4,
        margin: 8,
        background: '#ffffff'
      });
      var a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'barcode-' + val + '.png';
      a.click();
      showToast('Downloaded barcode-' + val + '.png');
    } catch (e) {
      alert('Could not render PNG for: ' + val);
    }
  }

  // Load Sample
  document.getElementById('b128-btn-sample').onclick = function() {
    inputEl.value = sampleData.join('\\n');
    currentPage = 1;
    renderPreview();
    showToast('Loaded 8 sample barcodes from PDF');
  };

  // Copy List
  document.getElementById('b128-btn-copy-list').onclick = function() {
    var codes = getBarcodes();
    if (codes.length === 0) return;
    navigator.clipboard.writeText(codes.join('\\n'));
    showToast('Copied ' + codes.length + ' barcodes');
  };

  // Dedupe
  document.getElementById('b128-btn-dedupe').onclick = function() {
    var codes = getBarcodes();
    var seen = {};
    var unique = [];
    for (var i = 0; i < codes.length; i++) {
      if (!seen[codes[i]]) {
        seen[codes[i]] = true;
        unique.push(codes[i]);
      }
    }
    inputEl.value = unique.join('\\n');
    renderPreview();
    showToast('Removed duplicates (' + unique.length + ' remain)');
  };

  // Clear
  document.getElementById('b128-btn-clear').onclick = function() {
    inputEl.value = '';
    renderPreview();
    showToast('Cleared all barcodes');
  };

  // Series Generator
  document.getElementById('b128-btn-generate-seq').onclick = function() {
    var prefix = document.getElementById('b128-seq-prefix').value || '';
    var suffix = document.getElementById('b128-seq-suffix').value || '';
    var start = parseInt(document.getElementById('b128-seq-start').value, 10) || 0;
    var count = parseInt(document.getElementById('b128-seq-count').value, 10) || 12;
    var pad = parseInt(document.getElementById('b128-seq-pad').value, 10) || 0;
    var step = parseInt(document.getElementById('b128-seq-step').value, 10) || 1;

    var list = [];
    for (var i = 0; i < count; i++) {
      var numStr = String(start + (i * step));
      if (pad > 0) {
        while (numStr.length < pad) numStr = '0' + numStr;
      }
      list.push(prefix + numStr + suffix);
    }
    inputEl.value = list.join('\\n');
    window.b128SwitchTab('bulk');
    currentPage = 1;
    renderPreview();
    showToast('Generated ' + count + ' serial barcodes');
  };

  // CSV/TXT File
  document.getElementById('b128-file-input').onchange = function(e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(evt) {
      inputEl.value = evt.target.result;
      window.b128SwitchTab('bulk');
      currentPage = 1;
      renderPreview();
      showToast('Loaded ' + file.name);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Pager Events
  pFirst.onclick = function() { currentPage = 1; renderPreview(); };
  pPrev.onclick = function() { if (currentPage > 1) { currentPage--; renderPreview(); } };
  pNext.onclick = function() {
    var codes = getBarcodes();
    var totalPages = Math.ceil(codes.length / (parseInt(perPageEl.value, 10) || 4));
    if (currentPage < totalPages) { currentPage++; renderPreview(); }
  };
  pLast.onclick = function() {
    var codes = getBarcodes();
    currentPage = Math.max(1, Math.ceil(codes.length / (parseInt(perPageEl.value, 10) || 4)));
    renderPreview();
  };

  // Zoom
  function setZoom(val) {
    currentZoom = Math.min(1.4, Math.max(0.6, val));
    zoomBox.style.transform = 'scale(' + currentZoom + ')';
    zoomText.textContent = Math.round(currentZoom * 100) + '%';
  }
  document.getElementById('b128-z-in').onclick = function() { setZoom(currentZoom + 0.1); };
  document.getElementById('b128-z-out').onclick = function() { setZoom(currentZoom - 0.1); };
  document.getElementById('b128-z-reset').onclick = function() { setZoom(1.0); };

  // Inputs
  inputEl.oninput = renderPreview;
  perPageEl.onchange = function() { currentPage = 1; renderPreview(); };
  heightEl.onchange = renderPreview;
  densityEl.onchange = renderPreview;
  fontEl.onchange = renderPreview;
  textEl.onchange = renderPreview;
  cutlinesEl.onchange = renderPreview;
  pagenumsEl.onchange = renderPreview;

  // Print (4x6 Thermal)
  document.getElementById('b128-btn-print').onclick = function() {
    window.print();
  };

  // PDF Generator (4x6 Thermal)
  document.getElementById('b128-btn-pdf').onclick = function() {
    var codes = getBarcodes();
    if (codes.length === 0) {
      alert('Please enter at least one barcode first.');
      return;
    }

    function doGeneratePdf(jsPDFClass) {
      var perPage = parseInt(perPageEl.value, 10) || 4;
      var bHeight = parseInt(heightEl.value, 10) || 55;
      var bWidth = parseFloat(densityEl.value) || 2.0;
      var bFont = fontEl.value;
      var bShowText = textEl.checked;
      var bCutLines = cutlinesEl.checked;
      var bPageNumbers = pagenumsEl.checked;

      var doc = new jsPDFClass({
        orientation: 'portrait',
        unit: 'in',
        format: [4.0, 6.0]
      });

      var totalPages = Math.ceil(codes.length / perPage);
      var margin = 0.3;
      var usableHeight = 6.0 - (margin * 2);
      var slotHeight = usableHeight / perPage;

      for (var p = 0; p < totalPages; p++) {
        if (p > 0) doc.addPage([4.0, 6.0], 'portrait');
        var slice = codes.slice(p * perPage, (p + 1) * perPage);

        for (var s = 0; s < slice.length; s++) {
          var canvas = document.createElement('canvas');
          try {
            JsBarcode(canvas, slice[s], {
              format: 'CODE128',
              width: bWidth,
              height: bHeight,
              displayValue: bShowText,
              font: bFont,
              fontSize: 15,
              textMargin: 4,
              margin: 6,
              background: '#ffffff'
            });

            var imgData = canvas.toDataURL('image/png');
            var aspect = canvas.width / canvas.height;
            var maxW = 3.5;
            var maxH = slotHeight * 0.82;
            var rW = maxW;
            var rH = rW / aspect;
            if (rH > maxH) {
              rH = maxH;
              rW = rH * aspect;
            }

            var rX = (4.0 - rW) / 2;
            var slotTop = margin + (s * slotHeight);
            var rY = slotTop + (slotHeight - rH) / 2;

            doc.addImage(imgData, 'PNG', rX, rY, rW, rH);

            if (bCutLines && s < slice.length - 1) {
              var lineY = slotTop + slotHeight;
              doc.setDrawColor(200, 200, 200);
              doc.setLineWidth(0.008);
              doc.setLineDashPattern([0.05, 0.05], 0);
              doc.line(0.25, lineY, 3.75, lineY);
              doc.setLineDashPattern([], 0);
            }
          } catch (err) {
            // Ignore single barcode render error
          }
        }

        if (bPageNumbers && totalPages > 1) {
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(140, 140, 140);
          doc.text('Page ' + (p + 1) + ' of ' + totalPages + ' \u2022 4" \u00D7 6" Thermal Label', 2.0, 5.88, { align: 'center' });
        }
      }

      doc.save('code128-4x6-labels.pdf');
      showToast('Downloaded 4x6 PDF with ' + codes.length + ' barcodes');
    }

    if (window.jspdf && window.jspdf.jsPDF) {
      doGeneratePdf(window.jspdf.jsPDF);
    } else {
      showToast('Loading PDF engine...');
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      s.onload = function() {
        if (window.jspdf && window.jspdf.jsPDF) {
          doGeneratePdf(window.jspdf.jsPDF);
        } else {
          alert('Could not initialize jsPDF. Please use the Print button to print or save as 4x6 PDF.');
        }
      };
      s.onerror = function() {
        alert('Could not load PDF library. You can click &quot;Print (4x6 Thermal)&quot; to save as 4x6 PDF via your browser.');
      };
      document.head.appendChild(s);
    }
  };

  // Prepopulate sample and render
  inputEl.value = sampleData.join('\\n');
  ensureJsBarcode(function() {
    renderPreview();
  });
})();
<\/script>`;
}

/**
 * Backward-compatible alias for getFullBloggerSnippet.
 */
export function getBloggerStandaloneWidgetCode(): string {
  return getFullBloggerSnippet();
}

/**
 * Complete standalone HTML document for offline double-clicking and saving.
 */
export function getFullStandaloneHtmlDocument(): string {
  const toolHtml = getFullBloggerSnippet();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code 128 Bulk Barcode Generator &bull; 4x6 Label Sheet</title>
  <meta name="description" content="Generate bulk Code 128 barcodes and download standard 4x6 inch thermal label PDFs.">
  <style>
    body {
      margin: 0;
      padding: 16px;
      background: #f1f5f9;
      min-height: 100vh;
    }
  </style>
</head>
<body>
${toolHtml}
</body>
</html>`;
}

/**
 * Initiates the download of the standalone HTML file in the browser.
 */
export function downloadStandaloneHtmlFile(filename = 'code128-barcode-generator-4x6.html'): void {
  const htmlContent = getFullStandaloneHtmlDocument();
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
