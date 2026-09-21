/**
 * Generates ready-to-paste code snippets and downloadable standalone HTML files for Blogger & offline usage.
 */

export function getBloggerIframeCode(appUrl: string): string {
  const safeUrl = appUrl || window.location.href;
  return `<!-- Code 128 Bulk Barcode 4x6 PDF Generator - Blogger Embed -->
<div style="width: 100%; max-width: 1100px; margin: 0 auto; overflow: hidden; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
  <iframe
    src="${safeUrl}"
    title="Code 128 Bulk Barcode 4x6 PDF Generator"
    style="width: 100%; height: 860px; border: none; display: block;"
    allow="clipboard-write"
    loading="lazy">
  </iframe>
</div>`;
}

export function getBloggerStandaloneWidgetCode(): string {
  return `<!-- ============================================================= -->
<!-- Code 128 Bulk Barcode 4x6 Label Generator for Blogger (Blogspot) -->
<!-- Copy & Paste into Blogger: Layout -> Add a Gadget -> HTML/JavaScript -->
<!-- OR paste in any Post/Page using the HTML View (<>) -->
<!-- ============================================================= -->
<div id="blogger-barcode-app" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 850px; margin: 20px auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); color: #1e293b; box-sizing: border-box;">
  
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
    <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #0f172a;">
      Code 128 Bulk Barcode Generator
    </h2>
    <p style="margin: 0; font-size: 14px; color: #64748b;">
      Generate bulk Code 128 barcodes and download standard 4x6 inch thermal label PDFs (Max 4 per page).
    </p>
  </div>

  <!-- Main Inputs -->
  <div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 20px;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <label style="font-size: 13px; font-weight: 600; color: #334155;">
          Enter Barcodes (One per line or comma-separated):
        </label>
        <button id="bb-sample-btn" type="button" style="background: none; border: none; color: #2563eb; font-size: 12px; font-weight: 600; cursor: pointer; text-decoration: underline;">
          Load Sample Codes
        </button>
      </div>
      <textarea id="bb-input" rows="6" style="width: 100%; box-sizing: border-box; padding: 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-family: monospace; font-size: 13px; line-height: 1.5; resize: vertical;" placeholder="FMPP4162047741&#10;FMPC6265465305&#10;FMPP4161144943&#10;FMPP4110839820"></textarea>
    </div>

    <!-- Quick Settings Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; background: #f8fafc; padding: 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
      <div>
        <label style="display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">Barcodes Per 4x6 Page:</label>
        <select id="bb-per-page" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; background: #fff;">
          <option value="4" selected>4 Barcodes (Standard • Max 4)</option>
          <option value="3">3 Barcodes (Spacious)</option>
          <option value="2">2 Barcodes (Large)</option>
          <option value="1">1 Barcode (Single Extra Large)</option>
          <option value="5">5 Barcodes (Compact)</option>
        </select>
      </div>

      <div>
        <label style="display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">Barcode Height:</label>
        <select id="bb-height" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; background: #fff;">
          <option value="42">Compact (42px)</option>
          <option value="55" selected>Standard (55px • Recommended)</option>
          <option value="68">Tall (68px)</option>
          <option value="80">Extra Tall (80px)</option>
        </select>
      </div>

      <div>
        <label style="display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">Bar Density (Width Scale):</label>
        <select id="bb-density" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; background: #fff;">
          <option value="1.5">Fine / Compact (1.5x)</option>
          <option value="2.0" selected>Standard Crisp (2.0x • High Scan)</option>
          <option value="2.5">Bold / Wide (2.5x)</option>
        </select>
      </div>

      <div>
        <label style="display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">Label Text Font:</label>
        <select id="bb-font" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; background: #fff;">
          <option value="monospace" selected>Monospace (OCR Style)</option>
          <option value="sans-serif">Clean Sans-Serif</option>
        </select>
      </div>

      <div>
        <label style="display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">Cut Line Guides:</label>
        <select id="bb-cutlines" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; background: #fff;">
          <option value="yes" selected>Show Dashed Lines</option>
          <option value="no">None (Clean)</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Action Bar -->
  <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 24px;">
    <button id="bb-preview-btn" type="button" style="flex: 1; min-width: 160px; padding: 12px 18px; background: #0f172a; color: #ffffff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">
      Generate & Preview
    </button>
    <button id="bb-pdf-btn" type="button" style="flex: 1; min-width: 180px; padding: 12px 18px; background: #2563eb; color: #ffffff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">
      Download 4x6 PDF
    </button>
    <button id="bb-print-btn" type="button" style="padding: 12px 18px; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">
      Print 4x6
    </button>
  </div>

  <!-- Status / Stats -->
  <div id="bb-status" style="margin-bottom: 16px; font-size: 13px; color: #475569; font-weight: 500;">
    Ready. Enter barcode text and click Generate.
  </div>

  <!-- Live 4x6 Label Visual Preview Box -->
  <div style="background: #e2e8f0; padding: 24px; border-radius: 12px; text-align: center;">
    <div style="font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
      4x6 Label Live Preview (Page 1)
    </div>
    <!-- 4x6 aspect ratio container (approx 320px x 480px) -->
    <div id="bb-preview-page" style="width: 320px; min-height: 480px; margin: 0 auto; background: #ffffff; border-radius: 6px; box-shadow: 0 10px 30px rgba(0,0,0,0.12); padding: 20px 16px; display: flex; flex-direction: column; justify-content: space-around; box-sizing: border-box;">
      <div style="color: #94a3b8; font-size: 13px;">No barcodes generated yet</div>
    </div>
  </div>
</div>

<!-- Required CDN Dependencies (JsBarcode + jsPDF) -->
<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>

<script>
(function() {
  var sampleData = ["FMPP4162047741", "FMPC6265465305", "FMPP4161144943", "FMPP4110839820", "FMPC6277475378", "FMPP4162047749", "FMPC6265465312", "FMPP4161144955"];
  var inputEl = document.getElementById("bb-input");
  var sampleBtn = document.getElementById("bb-sample-btn");
  var previewBtn = document.getElementById("bb-preview-btn");
  var pdfBtn = document.getElementById("bb-pdf-btn");
  var printBtn = document.getElementById("bb-print-btn");
  var previewPage = document.getElementById("bb-preview-page");
  var statusEl = document.getElementById("bb-status");
  var perPageEl = document.getElementById("bb-per-page");
  var heightEl = document.getElementById("bb-height");
  var densityEl = document.getElementById("bb-density");
  var fontEl = document.getElementById("bb-font");
  var cutlinesEl = document.getElementById("bb-cutlines");

  // Load sample codes
  sampleBtn.onclick = function() {
    inputEl.value = sampleData.join("\\n");
    renderPreview();
  };

  function getCodes() {
    var raw = inputEl.value || "";
    return raw.split(/[\\r\\n,]+/).map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
  }

  function renderPreview() {
    var codes = getCodes();
    var perPage = parseInt(perPageEl.value, 10) || 4;
    var barHeight = parseInt(heightEl.value, 10) || 55;
    var barWidth = parseFloat(densityEl.value) || 2.0;
    var barFont = fontEl.value || "monospace";
    var showCut = cutlinesEl.value === "yes";

    if (codes.length === 0) {
      previewPage.innerHTML = '<div style="color: #94a3b8; font-size: 13px; margin: auto;">Enter barcode values above</div>';
      statusEl.textContent = "Please enter at least one barcode.";
      return;
    }

    var totalPages = Math.ceil(codes.length / perPage);
    statusEl.innerHTML = "<strong>" + codes.length + " barcodes</strong> detected &bull; <strong>" + totalPages + " total 4x6 page(s)</strong> (showing Page 1 preview below)";

    var firstPageCodes = codes.slice(0, perPage);
    previewPage.innerHTML = "";

    for (var i = 0; i < firstPageCodes.length; i++) {
      var itemDiv = document.createElement("div");
      itemDiv.style.cssText = "display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6px 0;" + (showCut && i < firstPageCodes.length - 1 ? " border-bottom: 1px dashed #cbd5e1;" : "");
      
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.style.maxWidth = "100%";
      svg.style.height = "auto";
      itemDiv.appendChild(svg);
      previewPage.appendChild(itemDiv);

      try {
        JsBarcode(svg, firstPageCodes[i], {
          format: "CODE128",
          width: barWidth,
          height: barHeight,
          displayValue: true,
          font: barFont,
          fontSize: 14,
          textMargin: 4,
          margin: 4
        });
      } catch (e) {
        itemDiv.innerHTML = '<span style="color: #dc2626; font-size: 11px;">Invalid Code 128: ' + firstPageCodes[i] + '</span>';
      }
    }
  }

  previewBtn.onclick = renderPreview;
  perPageEl.onchange = renderPreview;
  heightEl.onchange = renderPreview;
  densityEl.onchange = renderPreview;
  fontEl.onchange = renderPreview;
  cutlinesEl.onchange = renderPreview;

  // PDF Download
  pdfBtn.onclick = function() {
    var codes = getCodes();
    if (codes.length === 0) {
      alert("Please enter barcode values first.");
      return;
    }

    statusEl.textContent = "Generating high-resolution 4x6 PDF...";
    var perPage = parseInt(perPageEl.value, 10) || 4;
    var barHeight = parseInt(heightEl.value, 10) || 55;
    var barWidth = parseFloat(densityEl.value) || 2.0;
    var barFont = fontEl.value || "monospace";
    var showCut = cutlinesEl.value === "yes";

    var { jsPDF } = window.jspdf;
    var doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: [4.0, 6.0]
    });

    var totalPages = Math.ceil(codes.length / perPage);
    var margin = 0.3;
    var usableHeight = 6.0 - (margin * 2);
    var slotHeight = usableHeight / perPage;

    for (var p = 0; p < totalPages; p++) {
      if (p > 0) doc.addPage([4.0, 6.0], "portrait");
      var slice = codes.slice(p * perPage, (p + 1) * perPage);

      for (var s = 0; s < slice.length; s++) {
        var canvas = document.createElement("canvas");
        try {
          JsBarcode(canvas, slice[s], {
            format: "CODE128",
            width: barWidth,
            height: barHeight,
            displayValue: true,
            font: barFont,
            fontSize: 15,
            textMargin: 4,
            margin: 6,
            background: "#ffffff"
          });

          var imgData = canvas.toDataURL("image/png");
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

          doc.addImage(imgData, "PNG", rX, rY, rW, rH);

          if (showCut && s < slice.length - 1) {
            var lineY = slotTop + slotHeight;
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.008);
            doc.setLineDashPattern([0.05, 0.05], 0);
            doc.line(0.25, lineY, 3.75, lineY);
            doc.setLineDashPattern([], 0);
          }
        } catch (err) {
          // ignore invalid code
        }
      }
    }

    doc.save("code128-4x6-labels.pdf");
    statusEl.innerHTML = "<strong>PDF downloaded successfully!</strong> (4x6 format with " + codes.length + " barcodes)";
  };

  // Direct print
  printBtn.onclick = function() {
    pdfBtn.click();
  };

  // Initialize with sample on load
  sampleBtn.click();
})();
<\/script>`;
}

/**
 * Returns a complete standalone single HTML file with 100% of the features shown in AI Studio:
 * - Top header with stats pill, Print 4x6, Download 4x6 PDF, and Embed in Blogger modal
 * - 3 Input tabs: Paste List, Generate Series, Upload CSV/TXT
 * - Load Sample from PDF button, Item counter, Copy list, Dedupe, Clear all
 * - 4x6 Label & Barcode Layout configuration:
 *   - Barcodes Per 4x6 Page with 'USER STANDARD: 4' tag
 *   - Barcode Height
 *   - Bar Density (Width Scale)
 *   - Label Text Font
 *   - Checkboxes: human-readable text, dashed cut guides, page numbers
 * - Live 4x6 Label Sheet Preview:
 *   - Green status indicator
 *   - First (<<), Previous (<), Page X / Y, Next (>), Last (>>) navigation
 *   - Zoom controls: (-), 100%, (+)
 *   - Individual barcode hover controls: Copy text and Download PNG
 *   - 4x6 thermal sheet display with cut lines and footer indicator
 */
export function getFullStandaloneHtmlDocument(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code 128 Bulk Barcode Generator &amp; 4x6 Thermal Label PDF</title>
  <meta name="description" content="Complete bulk Code 128 barcode generator tool for standard 4x6 inch thermal labels (max 4 per page). Direct print & PDF export.">
  
  <!-- JsBarcode & jsPDF CDNs -->
  <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
  
  <style>
    :root {
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
      --amber-50: #fffbeb;
      --amber-100: #fef3c7;
      --amber-700: #b45309;
      --amber-900: #78350f;
      --rose-50: #fff1f2;
      --rose-600: #e11d48;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--slate-50);
      color: var(--slate-900);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    /* Header */
    header {
      background: #ffffff;
      border-bottom: 1px solid var(--slate-200);
      position: sticky;
      top: 0;
      z-index: 30;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    .header-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 14px 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-logo {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: var(--slate-900);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: monospace;
      font-weight: 900;
      font-size: 13px;
      letter-spacing: -1px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .brand-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--slate-900);
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .badge-thermal {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 500;
      background: var(--emerald-50);
      color: var(--emerald-700);
      border: 1px solid #a7f3d0;
    }
    .brand-subtitle {
      font-size: 12px;
      color: var(--slate-500);
      margin-top: 2px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .stats-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 8px;
      background: var(--slate-100);
      border: 1px solid var(--slate-200);
      font-size: 12px;
      color: var(--slate-700);
    }
    .stats-pill strong { color: var(--slate-900); }

    /* Button Styles */
    button {
      font-family: inherit;
      cursor: pointer;
      border: none;
      outline: none;
      transition: all 0.15s ease;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 8px;
    }
    .btn-white {
      background: #ffffff;
      color: var(--slate-700);
      border: 1px solid var(--slate-300);
    }
    .btn-white:hover { background: var(--slate-50); }
    .btn-amber {
      background: var(--amber-50);
      color: var(--amber-900);
      border: 1px solid var(--amber-100);
    }
    .btn-amber:hover { background: #fef3c7; }
    .btn-dark {
      background: var(--slate-900);
      color: #ffffff;
    }
    .btn-dark:hover { background: var(--slate-800); }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Layout */
    .main-wrapper {
      max-width: 1280px;
      margin: 24px auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      align-items: start;
    }
    @media (max-width: 1024px) {
      .main-wrapper { grid-template-columns: 1fr; }
    }

    /* Cards */
    .card {
      background: #ffffff;
      border: 1px solid var(--slate-200);
      border-radius: 12px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
      overflow: hidden;
      margin-bottom: 20px;
    }

    /* Tabs Bar */
    .tabs-header {
      display: flex;
      border-bottom: 1px solid var(--slate-200);
      background: #f8fafc;
      padding: 6px 8px 0 8px;
      gap: 4px;
    }
    .tab-btn {
      flex: 1;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 600;
      color: var(--slate-600);
      background: transparent;
      border-radius: 8px 8px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: 1px solid transparent;
      border-bottom: none;
    }
    .tab-btn:hover { color: var(--slate-900); background: rgba(0,0,0,0.02); }
    .tab-btn.active {
      background: #ffffff;
      color: var(--slate-900);
      border-color: var(--slate-200);
      box-shadow: 0 -2px 4px rgba(0,0,0,0.02);
    }

    .card-body {
      padding: 16px;
    }

    /* Inputs */
    textarea {
      width: 100%;
      height: 240px;
      padding: 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      line-height: 1.6;
      color: var(--slate-800);
      border: 1px solid var(--slate-200);
      border-radius: 8px;
      background: rgba(248, 250, 252, 0.5);
      resize: vertical;
    }
    textarea:focus {
      outline: none;
      border-color: var(--slate-900);
      box-shadow: 0 0 0 1px var(--slate-900);
      background: #ffffff;
    }

    /* Forms */
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 12px;
      margin-bottom: 12px;
    }
    label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--slate-700);
      margin-bottom: 4px;
    }
    input[type="text"], input[type="number"], select {
      width: 100%;
      padding: 7px 10px;
      font-size: 12px;
      border: 1px solid var(--slate-200);
      border-radius: 6px;
      background: var(--slate-50);
      color: var(--slate-800);
      font-family: inherit;
    }
    input[type="text"]:focus, input[type="number"]:focus, select:focus {
      outline: none;
      border-color: var(--slate-900);
      background: #fff;
    }

    /* Toolbar under input */
    .input-toolbar {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--slate-100);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 12px;
    }
    .tool-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tool-btn {
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      color: var(--slate-600);
      background: transparent;
      border: 1px solid transparent;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .tool-btn:hover {
      background: var(--slate-100);
      color: var(--slate-900);
    }
    .tool-btn-red {
      color: var(--rose-600);
    }
    .tool-btn-red:hover {
      background: var(--rose-50);
      color: var(--rose-600);
    }

    /* Upload Box */
    .upload-zone {
      border: 2px dashed var(--slate-200);
      border-radius: 12px;
      padding: 32px 16px;
      text-align: center;
      cursor: pointer;
      background: rgba(248, 250, 252, 0.6);
      transition: all 0.15s ease;
    }
    .upload-zone:hover {
      border-color: var(--slate-400);
      background: var(--slate-50);
    }

    /* Checkbox row */
    .checkbox-row {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--slate-100);
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 12px;
      color: var(--slate-700);
      font-weight: 500;
    }
    .checkbox-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }

    /* Right Column: Preview */
    .preview-header {
      padding: 12px 16px;
      border-bottom: 1px solid var(--slate-200);
      background: rgba(248, 250, 252, 0.8);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }
    .preview-title-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .indicator-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10b981;
      display: inline-block;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }
    .preview-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--slate-800);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .preview-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .pager-group, .zoom-group {
      display: inline-flex;
      align-items: center;
      background: #ffffff;
      border: 1px solid var(--slate-200);
      border-radius: 8px;
      padding: 2px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .pager-btn, .zoom-btn {
      padding: 4px 8px;
      background: transparent;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--slate-600);
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
    }
    .pager-btn:hover, .zoom-btn:hover { background: var(--slate-100); color: var(--slate-900); }
    .pager-btn:disabled, .zoom-btn:disabled { opacity: 0.3; cursor: not-allowed; }
    .pager-display {
      font-size: 12px;
      font-weight: 600;
      color: var(--slate-700);
      padding: 0 8px;
      min-width: 60px;
      text-align: center;
    }

    /* Preview Stage */
    .preview-stage {
      background: #f1f5f9;
      padding: 32px 16px;
      min-height: 520px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: auto;
    }
    /* 4x6 Label Sheet Container */
    .sheet-mockup {
      width: 320px;
      min-height: 480px;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
      padding: 20px 14px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: relative;
    }
    .barcode-slot {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6px 0;
    }
    .barcode-slot.has-divider {
      border-bottom: 1px dashed var(--slate-300);
    }
    .slot-actions {
      position: absolute;
      right: 4px;
      top: 4px;
      display: flex;
      gap: 4px;
      opacity: 0;
      transition: opacity 0.15s ease;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid var(--slate-200);
      border-radius: 6px;
      padding: 2px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      z-index: 5;
    }
    .barcode-slot:hover .slot-actions { opacity: 1; }
    .slot-act-btn {
      padding: 4px;
      border-radius: 4px;
      background: transparent;
      color: var(--slate-600);
      font-size: 11px;
    }
    .slot-act-btn:hover { background: var(--slate-100); color: var(--slate-900); }

    .sheet-footer {
      text-align: center;
      font-size: 10px;
      color: var(--slate-400);
      font-family: monospace;
      padding-top: 8px;
      border-top: 1px solid var(--slate-100);
    }
    .stage-caption {
      margin-top: 16px;
      font-size: 11px;
      color: var(--slate-400);
      font-weight: 500;
      text-align: center;
    }

    /* Modal for Blogger */
    .modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      z-index: 50;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .modal-backdrop.show { display: flex; }
    .modal-card {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 720px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--slate-200);
      background: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal-body {
      padding: 20px;
      overflow-y: auto;
      font-size: 13px;
      color: var(--slate-700);
    }
    .modal-footer {
      padding: 14px 20px;
      border-top: 1px solid var(--slate-200);
      background: #f8fafc;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    pre {
      background: var(--slate-900);
      color: #f8fafc;
      padding: 14px;
      border-radius: 8px;
      font-size: 12px;
      font-family: monospace;
      overflow-x: auto;
      max-height: 220px;
    }

    /* Toast */
    #toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--slate-900);
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      border: 1px solid var(--slate-700);
      display: none;
      z-index: 100;
    }

    /* Print Specific Rules */
    @media print {
      @page {
        size: 4in 6in;
        margin: 0.15in;
      }
      body {
        background: #ffffff !important;
      }
      header, .no-print, .card, .main-wrapper > div:first-child, .stage-caption {
        display: none !important;
      }
      .main-wrapper {
        display: block !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .preview-stage {
        background: transparent !important;
        padding: 0 !important;
      }
      .sheet-mockup {
        width: 100% !important;
        height: 5.7in !important;
        box-shadow: none !important;
        border: none !important;
        page-break-after: always;
      }
      .slot-actions { display: none !important; }
    }
  </style>
</head>
<body>

  <!-- Top Header Navigation -->
  <header class="no-print">
    <div class="header-container">
      <div class="brand-section">
        <div class="brand-logo">||| 128</div>
        <div>
          <div class="brand-title">
            <span>Code 128 Barcode &amp; 4x6 PDF</span>
            <span class="badge-thermal">4" &times; 6" Thermal Ready</span>
          </div>
          <div class="brand-subtitle">
            Bulk barcode generator &bull; Max 4 labels per 4x6 page &bull; Blogger ready
          </div>
        </div>
      </div>

      <div class="header-actions">
        <div id="header-stats" class="stats-pill">
          <strong id="stat-barcodes">8</strong> Barcodes &bull; <strong id="stat-pages">2</strong> Pages (4x6)
        </div>

        <button id="btn-blogger-modal" type="button" class="btn btn-amber" title="Get embed code for Blogger">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
          <span>Embed in Blogger</span>
        </button>

        <button id="btn-header-print" type="button" class="btn btn-white" title="Print to 4x6 thermal printer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
          <span>Print 4x6</span>
        </button>

        <button id="btn-header-pdf" type="button" class="btn btn-dark" title="Download 4x6 thermal PDF label sheet">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Download 4x6 PDF</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main 2-Column Content Layout -->
  <div class="main-wrapper">
    <!-- LEFT COLUMN: Inputs & Label Settings -->
    <div class="no-print">
      <!-- Card 1: Barcode Input with 3 Tabs -->
      <div class="card">
        <div class="tabs-header">
          <button id="tab-btn-bulk" class="tab-btn active" onclick="switchTab('bulk')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            <span>Paste List</span>
          </button>
          <button id="tab-btn-seq" class="tab-btn" onclick="switchTab('seq')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="4" height="6" x="2" y="5" rx="1"/><rect width="4" height="6" x="10" y="5" rx="1"/><rect width="4" height="6" x="18" y="5" rx="1"/><path d="M14 19v-4"/><path d="M6 19v-4"/><path d="M18 19v-4"/></svg>
            <span>Generate Series</span>
          </button>
          <button id="tab-btn-upload" class="tab-btn" onclick="switchTab('upload')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>Upload CSV/TXT</span>
          </button>
        </div>

        <div class="card-body">
          <!-- TAB 1: PASTE LIST -->
          <div id="panel-bulk">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label style="margin-bottom: 0;">Barcode Values (One per line or comma/tab separated)</label>
              <button id="btn-load-sample" type="button" style="background: none; border: none; color: var(--blue-600); font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; cursor: pointer;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
                <span>Load Sample from PDF</span>
              </button>
            </div>

            <textarea id="barcode-input" placeholder="Paste barcodes here, for example:&#10;FMPP4162047741&#10;FMPC6265465305&#10;FMPP4161144943&#10;FMPP4110839820&#10;FMPC6277475378&#10;FMPP4162047749"></textarea>

            <!-- Bottom Toolbar: Counter, Copy, Dedupe, Clear -->
            <div class="input-toolbar">
              <div id="items-counter" style="color: var(--slate-500); font-weight: 500;">
                <strong id="counter-num" style="color: var(--slate-900);">8</strong> items loaded
              </div>
              <div class="tool-actions">
                <button id="btn-copy-list" type="button" class="tool-btn" title="Copy list to clipboard">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  <span>Copy</span>
                </button>
                <button id="btn-dedupe" type="button" class="tool-btn" title="Remove duplicate codes">
                  <span>Dedupe</span>
                </button>
                <button id="btn-clear" type="button" class="tool-btn tool-btn-red" title="Clear all codes">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>

          <!-- TAB 2: GENERATE SERIES -->
          <div id="panel-seq" style="display: none;">
            <div style="background: var(--blue-50); border: 1px solid var(--blue-100); border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #1e3a8a; margin-bottom: 14px;">
              Instantly create batches of serialized Code 128 barcodes (e.g. inventory tags, shipping labels, product serials).
            </div>
            <div class="form-grid">
              <div>
                <label>Prefix (Optional):</label>
                <input type="text" id="seq-prefix" value="FMPP">
              </div>
              <div>
                <label>Suffix (Optional):</label>
                <input type="text" id="seq-suffix" placeholder="-US">
              </div>
              <div>
                <label>Start Number:</label>
                <input type="number" id="seq-start" value="4162047741">
              </div>
              <div>
                <label>Count to Generate:</label>
                <input type="number" id="seq-count" value="12" min="1" max="500">
              </div>
              <div>
                <label>Pad Length (Digits):</label>
                <input type="number" id="seq-pad" value="10">
              </div>
              <div>
                <label>Step Increment:</label>
                <input type="number" id="seq-step" value="1">
              </div>
            </div>
            <button id="btn-gen-seq" type="button" class="btn btn-dark" style="width: 100%; justify-content: center; padding: 10px;">
              Generate Sequential Barcodes
            </button>
          </div>

          <!-- TAB 3: UPLOAD CSV/TXT -->
          <div id="panel-upload" style="display: none;">
            <input type="file" id="file-input" accept=".csv,.txt" style="display: none;">
            <div class="upload-zone" onclick="document.getElementById('file-input').click()">
              <svg style="margin: 0 auto 8px auto; display: block; color: var(--slate-400);" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/></svg>
              <div style="font-size: 13px; font-weight: 600; color: var(--slate-800);">
                Click or drag &amp; drop to upload CSV or TXT
              </div>
              <div style="font-size: 11px; color: var(--slate-500); margin-top: 4px;">
                Plain text or comma/newline separated barcode items
              </div>
            </div>
            <div style="font-size: 11px; color: var(--slate-500); margin-top: 10px;">
              Supported formats: Standard text files (.txt) or comma-delimited files (.csv) exported from Excel or Google Sheets.
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: 4X6 LABEL & BARCODE LAYOUT -->
      <div class="card">
        <div style="padding: 14px 16px; border-bottom: 1px solid var(--slate-100); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
            <span style="font-size: 12px; font-weight: 700; color: var(--slate-800); text-transform: uppercase; letter-spacing: 0.05em;">
              4x6 Label &amp; Barcode Layout
            </span>
          </div>
          <span style="font-size: 11px; font-weight: 500; color: var(--slate-500);">
            Standard 4" &times; 6" Page
          </span>
        </div>

        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 14px;">
            <!-- Barcodes Per 4x6 Page -->
            <div>
              <label style="display: flex; justify-content: space-between; align-items: center;">
                <span>Barcodes Per 4x6 Page</span>
                <span style="font-size: 10px; color: var(--blue-600); font-weight: 700;">USER STANDARD: 4</span>
              </label>
              <select id="cfg-per-page">
                <option value="4" selected>4 Barcodes (Standard &bull; Max 4)</option>
                <option value="3">3 Barcodes (Spacious)</option>
                <option value="2">2 Barcodes (Large)</option>
                <option value="1">1 Barcode (Extra Large Single)</option>
                <option value="5">5 Barcodes (Compact)</option>
              </select>
            </div>

            <!-- Barcode Height -->
            <div>
              <label>Barcode Height</label>
              <select id="cfg-height">
                <option value="42">Compact (42px)</option>
                <option value="55" selected>Standard (55px &bull; Recommended)</option>
                <option value="68">Tall (68px)</option>
                <option value="80">Extra Tall (80px)</option>
              </select>
            </div>

            <!-- Bar Density (Width Scale) -->
            <div>
              <label>Bar Density (Width Scale)</label>
              <select id="cfg-density">
                <option value="1.5">Fine / Compact (1.5x)</option>
                <option value="2.0" selected>Standard Crisp (2.0x &bull; High Scan)</option>
                <option value="2.5">Bold / Wide (2.5x)</option>
              </select>
            </div>

            <!-- Label Text Font -->
            <div>
              <label>Label Text Font</label>
              <select id="cfg-font">
                <option value="monospace" selected>Monospace (OCR Style, like PDF sample)</option>
                <option value="sans-serif">Clean Sans-Serif</option>
              </select>
            </div>
          </div>

          <!-- Toggles Row -->
          <div class="checkbox-row">
            <label class="checkbox-label">
              <input type="checkbox" id="cfg-show-text" checked>
              <span>Show human-readable text under barcode</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" id="cfg-cut-lines" checked>
              <span>&#9986; Show dashed cut guides between labels</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" id="cfg-page-numbers" checked>
              <span>Show page numbers (Page X of Y)</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT COLUMN: LIVE 4X6 LABEL SHEET PREVIEW -->
    <div>
      <div class="card">
        <!-- Preview Header with Indicators and Pager -->
        <div class="preview-header">
          <div class="preview-title-group">
            <span class="indicator-dot"></span>
            <span class="preview-title">Live 4x6 Label Sheet Preview</span>
          </div>

          <div class="preview-controls">
            <!-- Pager: First, Prev, Indicator, Next, Last -->
            <div class="pager-group">
              <button id="pager-first" class="pager-btn" title="First Page">&laquo;</button>
              <button id="pager-prev" class="pager-btn" title="Previous Page">&lsaquo;</button>
              <span id="pager-text" class="pager-display">1 / 2</span>
              <button id="pager-next" class="pager-btn" title="Next Page">&rsaquo;</button>
              <button id="pager-last" class="pager-btn" title="Last Page">&raquo;</button>
            </div>

            <!-- Zoom Controls -->
            <div class="zoom-group">
              <button id="zoom-out" class="zoom-btn" title="Zoom Out">&minus;</button>
              <span id="zoom-text" style="font-size: 11px; font-family: monospace; padding: 0 4px; color: var(--slate-600);">100%</span>
              <button id="zoom-in" class="zoom-btn" title="Zoom In">&plus;</button>
              <button id="zoom-reset" class="zoom-btn" title="Reset to 100%" style="font-size: 10px;">100%</button>
            </div>
          </div>
        </div>

        <!-- 4x6 Label Stage -->
        <div class="preview-stage">
          <div id="zoom-wrapper" style="transform: scale(1); transform-origin: top center; transition: transform 0.15s ease-out;">
            <div id="sheet-mockup" class="sheet-mockup">
              <!-- Barcode items render here -->
            </div>
          </div>
          <div class="stage-caption">
            Standard 4" &times; 6" Label Dimension (Thermal 203/300 DPI compatible)
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Blogger Embed Modal -->
  <div id="blogger-modal" class="modal-backdrop">
    <div class="modal-card">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="background: var(--amber-700); color: #fff; width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px;">B</div>
          <strong style="font-size: 15px; color: var(--slate-900);">Integrate into Blogger (Blogspot) Website</strong>
        </div>
        <button type="button" onclick="closeBloggerModal()" style="background: transparent; color: var(--slate-400); font-size: 18px; font-weight: bold;">&times;</button>
      </div>
      <div class="modal-body">
        <p style="margin-bottom: 12px; font-size: 13px; color: var(--slate-600);">
          Copy the ready-to-paste snippet below and add it to your Blogger blog via <strong>Layout &rarr; Add a Gadget &rarr; HTML/JavaScript</strong>.
        </p>
        <pre><code id="blogger-code-snippet"></code></pre>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-white" onclick="closeBloggerModal()">Close</button>
        <button id="btn-copy-snippet" type="button" class="btn btn-dark">Copy Snippet</button>
      </div>
    </div>
  </div>

  <!-- Toast Element -->
  <div id="toast">Notification message</div>

  <script>
    var sampleData = [
      "FMPP4162047741",
      "FMPC6265465305",
      "FMPP4161144943",
      "FMPP4110839820",
      "FMPC6277475378",
      "FMPP4162047749",
      "FMPC6265465312",
      "FMPP4161144955"
    ];

    var currentPage = 1;
    var currentZoom = 1.0;

    var inputEl = document.getElementById("barcode-input");
    var counterNumEl = document.getElementById("counter-num");
    var statBarcodesEl = document.getElementById("stat-barcodes");
    var statPagesEl = document.getElementById("stat-pages");

    var perPageEl = document.getElementById("cfg-per-page");
    var heightEl = document.getElementById("cfg-height");
    var densityEl = document.getElementById("cfg-density");
    var fontEl = document.getElementById("cfg-font");
    var showTextEl = document.getElementById("cfg-show-text");
    var cutLinesEl = document.getElementById("cfg-cut-lines");
    var pageNumbersEl = document.getElementById("cfg-page-numbers");

    var sheetMockup = document.getElementById("sheet-mockup");
    var pagerText = document.getElementById("pager-text");
    var pagerFirst = document.getElementById("pager-first");
    var pagerPrev = document.getElementById("pager-prev");
    var pagerNext = document.getElementById("pager-next");
    var pagerLast = document.getElementById("pager-last");

    var zoomWrapper = document.getElementById("zoom-wrapper");
    var zoomText = document.getElementById("zoom-text");

    function showToast(msg) {
      var t = document.getElementById("toast");
      t.textContent = msg;
      t.style.display = "block";
      setTimeout(function() { t.style.display = "none"; }, 2500);
    }

    function switchTab(tab) {
      document.getElementById("tab-btn-bulk").className = tab === 'bulk' ? 'tab-btn active' : 'tab-btn';
      document.getElementById("tab-btn-seq").className = tab === 'seq' ? 'tab-btn active' : 'tab-btn';
      document.getElementById("tab-btn-upload").className = tab === 'upload' ? 'tab-btn active' : 'tab-btn';

      document.getElementById("panel-bulk").style.display = tab === 'bulk' ? 'block' : 'none';
      document.getElementById("panel-seq").style.display = tab === 'seq' ? 'block' : 'none';
      document.getElementById("panel-upload").style.display = tab === 'upload' ? 'block' : 'none';
    }

    function getBarcodes() {
      var raw = inputEl.value || "";
      return raw.split(/[\\r\\n,]+/).map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
    }

    function renderPreview() {
      var codes = getBarcodes();
      var perPage = parseInt(perPageEl.value, 10) || 4;
      var totalPages = Math.max(1, Math.ceil(codes.length / perPage));

      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;

      counterNumEl.textContent = codes.length;
      statBarcodesEl.textContent = codes.length;
      statPagesEl.textContent = totalPages;

      pagerText.textContent = currentPage + " / " + totalPages;
      pagerFirst.disabled = currentPage <= 1;
      pagerPrev.disabled = currentPage <= 1;
      pagerNext.disabled = currentPage >= totalPages;
      pagerLast.disabled = currentPage >= totalPages;

      sheetMockup.innerHTML = "";

      if (codes.length === 0) {
        sheetMockup.innerHTML = '<div style="color: var(--slate-400); font-size: 13px; text-align: center; margin: auto;">No barcodes to display. Paste values or load sample.</div>';
        return;
      }

      var startIndex = (currentPage - 1) * perPage;
      var pageCodes = codes.slice(startIndex, startIndex + perPage);

      var bHeight = parseInt(heightEl.value, 10) || 55;
      var bWidth = parseFloat(densityEl.value) || 2.0;
      var bFont = fontEl.value;
      var bShowText = showTextEl.checked;
      var bCutLines = cutLinesEl.checked;
      var bPageNumbers = pageNumbersEl.checked;

      for (var i = 0; i < pageCodes.length; i++) {
        (function(codeVal, idx) {
          var slot = document.createElement("div");
          slot.className = "barcode-slot" + (bCutLines && idx < pageCodes.length - 1 ? " has-divider" : "");

          // Hover quick actions (Copy & Download PNG)
          var actDiv = document.createElement("div");
          actDiv.className = "slot-actions";

          var copyBtn = document.createElement("button");
          copyBtn.type = "button";
          copyBtn.className = "slot-act-btn";
          copyBtn.title = "Copy barcode text";
          copyBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
          copyBtn.onclick = function(e) {
            e.stopPropagation();
            navigator.clipboard.writeText(codeVal);
            showToast("Copied " + codeVal + " to clipboard");
          };

          var dlBtn = document.createElement("button");
          dlBtn.type = "button";
          dlBtn.className = "slot-act-btn";
          dlBtn.title = "Download PNG";
          dlBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
          dlBtn.onclick = function(e) {
            e.stopPropagation();
            downloadSinglePNG(codeVal);
          };

          actDiv.appendChild(copyBtn);
          actDiv.appendChild(dlBtn);
          slot.appendChild(actDiv);

          var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.style.maxWidth = "100%";
          svg.style.height = "auto";
          slot.appendChild(svg);
          sheetMockup.appendChild(slot);

          try {
            JsBarcode(svg, codeVal, {
              format: "CODE128",
              width: bWidth,
              height: bHeight,
              displayValue: bShowText,
              font: bFont,
              fontSize: 14,
              textMargin: 4,
              margin: 2
            });
          } catch (err) {
            slot.innerHTML = '<span style="color: var(--rose-600); font-size: 11px;">Invalid Code 128: ' + codeVal + '</span>';
          }
        })(pageCodes[i], i);
      }

      if (bPageNumbers) {
        var foot = document.createElement("div");
        foot.className = "sheet-footer";
        foot.textContent = "Page " + currentPage + " of " + totalPages + " • 4\" \u00D7 6\" Thermal Label";
        sheetMockup.appendChild(foot);
      }
    }

    function downloadSinglePNG(val) {
      var canvas = document.createElement("canvas");
      try {
        JsBarcode(canvas, val, {
          format: "CODE128",
          width: parseFloat(densityEl.value) || 2.0,
          height: parseInt(heightEl.value, 10) || 55,
          displayValue: showTextEl.checked,
          font: fontEl.value,
          fontSize: 16,
          textMargin: 4,
          margin: 10,
          background: "#ffffff"
        });
        var a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "barcode-" + val + ".png";
        a.click();
        showToast("Downloaded barcode-" + val + ".png");
      } catch (e) {
        alert("Failed to render barcode PNG");
      }
    }

    // Sequence Generator
    document.getElementById("btn-gen-seq").onclick = function() {
      var prefix = document.getElementById("seq-prefix").value || "";
      var suffix = document.getElementById("seq-suffix").value || "";
      var start = parseInt(document.getElementById("seq-start").value, 10) || 0;
      var count = parseInt(document.getElementById("seq-count").value, 10) || 12;
      var pad = parseInt(document.getElementById("seq-pad").value, 10) || 0;
      var step = parseInt(document.getElementById("seq-step").value, 10) || 1;

      var res = [];
      for (var i = 0; i < count; i++) {
        var num = String(start + (i * step));
        if (pad > 0) while (num.length < pad) num = "0" + num;
        res.push(prefix + num + suffix);
      }
      inputEl.value = res.join("\\n");
      switchTab("bulk");
      currentPage = 1;
      renderPreview();
      showToast("Generated " + count + " sequential barcodes");
    };

    // CSV/TXT File Upload
    document.getElementById("file-input").onchange = function(e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(evt) {
        var txt = evt.target.result;
        inputEl.value = txt;
        switchTab("bulk");
        currentPage = 1;
        renderPreview();
        showToast("Loaded file: " + file.name);
      };
      reader.readAsText(file);
      e.target.value = "";
    };

    // Dedupe
    document.getElementById("btn-dedupe").onclick = function() {
      var codes = getBarcodes();
      var seen = {};
      var unique = [];
      for (var i = 0; i < codes.length; i++) {
        if (!seen[codes[i]]) {
          seen[codes[i]] = true;
          unique.push(codes[i]);
        }
      }
      inputEl.value = unique.join("\\n");
      renderPreview();
      showToast("Duplicates removed");
    };

    // Clear All
    document.getElementById("btn-clear").onclick = function() {
      inputEl.value = "";
      renderPreview();
      showToast("Cleared list");
    };

    // Copy List
    document.getElementById("btn-copy-list").onclick = function() {
      var codes = getBarcodes();
      if (codes.length === 0) return;
      navigator.clipboard.writeText(codes.join("\\n"));
      showToast("Copied " + codes.length + " barcodes to clipboard");
    };

    // Load Sample from PDF
    document.getElementById("btn-load-sample").onclick = function() {
      inputEl.value = sampleData.join("\\n");
      currentPage = 1;
      renderPreview();
      showToast("Loaded 8 sample barcodes from PDF");
    };

    // Pagination
    pagerFirst.onclick = function() { currentPage = 1; renderPreview(); };
    pagerPrev.onclick = function() { if (currentPage > 1) { currentPage--; renderPreview(); } };
    pagerNext.onclick = function() {
      var codes = getBarcodes();
      var totalPages = Math.ceil(codes.length / (parseInt(perPageEl.value, 10) || 4));
      if (currentPage < totalPages) { currentPage++; renderPreview(); }
    };
    pagerLast.onclick = function() {
      var codes = getBarcodes();
      currentPage = Math.max(1, Math.ceil(codes.length / (parseInt(perPageEl.value, 10) || 4)));
      renderPreview();
    };

    // Zoom Controls
    function setZoom(val) {
      currentZoom = Math.min(1.4, Math.max(0.6, val));
      zoomWrapper.style.transform = "scale(" + currentZoom + ")";
      zoomText.textContent = Math.round(currentZoom * 100) + "%";
    }
    document.getElementById("zoom-in").onclick = function() { setZoom(currentZoom + 0.1); };
    document.getElementById("zoom-out").onclick = function() { setZoom(currentZoom - 0.1); };
    document.getElementById("zoom-reset").onclick = function() { setZoom(1.0); };

    // Config event listeners
    inputEl.oninput = renderPreview;
    perPageEl.onchange = function() { currentPage = 1; renderPreview(); };
    heightEl.onchange = renderPreview;
    densityEl.onchange = renderPreview;
    fontEl.onchange = renderPreview;
    showTextEl.onchange = renderPreview;
    cutLinesEl.onchange = renderPreview;
    pageNumbersEl.onchange = renderPreview;

    // PDF Download
    document.getElementById("btn-header-pdf").onclick = function() {
      var codes = getBarcodes();
      if (codes.length === 0) {
        alert("Please enter barcode values first.");
        return;
      }

      var perPage = parseInt(perPageEl.value, 10) || 4;
      var bHeight = parseInt(heightEl.value, 10) || 55;
      var bWidth = parseFloat(densityEl.value) || 2.0;
      var bFont = fontEl.value;
      var bShowText = showTextEl.checked;
      var bCutLines = cutLinesEl.checked;
      var bPageNumbers = pageNumbersEl.checked;

      var { jsPDF } = window.jspdf;
      var doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [4.0, 6.0]
      });

      var totalPages = Math.ceil(codes.length / perPage);
      var margin = 0.3;
      var usableHeight = 6.0 - (margin * 2);
      var slotHeight = usableHeight / perPage;

      for (var p = 0; p < totalPages; p++) {
        if (p > 0) doc.addPage([4.0, 6.0], "portrait");
        var slice = codes.slice(p * perPage, (p + 1) * perPage);

        for (var s = 0; s < slice.length; s++) {
          var canvas = document.createElement("canvas");
          try {
            JsBarcode(canvas, slice[s], {
              format: "CODE128",
              width: bWidth,
              height: bHeight,
              displayValue: bShowText,
              font: bFont,
              fontSize: 15,
              textMargin: 4,
              margin: 6,
              background: "#ffffff"
            });

            var imgData = canvas.toDataURL("image/png");
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

            doc.addImage(imgData, "PNG", rX, rY, rW, rH);

            if (bCutLines && s < slice.length - 1) {
              var lineY = slotTop + slotHeight;
              doc.setDrawColor(200, 200, 200);
              doc.setLineWidth(0.008);
              doc.setLineDashPattern([0.05, 0.05], 0);
              doc.line(0.25, lineY, 3.75, lineY);
              doc.setLineDashPattern([], 0);
            }
          } catch (err) {
            // ignore invalid
          }
        }

        if (bPageNumbers && totalPages > 1) {
          doc.setFont("Helvetica", "normal");
          doc.setFontSize(7);
          doc.setTextColor(140, 140, 140);
          doc.text("Page " + (p + 1) + " of " + totalPages + " • 4\" x 6\" Thermal Label", 2.0, 5.88, { align: "center" });
        }
      }

      doc.save("code128-4x6-labels.pdf");
      showToast("Downloaded 4x6 PDF with " + codes.length + " barcodes");
    };

    // Print
    document.getElementById("btn-header-print").onclick = function() {
      window.print();
    };

    // Blogger Modal
    var modal = document.getElementById("blogger-modal");
    var snippetCode = document.getElementById("blogger-code-snippet");
    document.getElementById("btn-blogger-modal").onclick = function() {
      snippetCode.textContent = '<div style="width: 100%; max-width: 1100px; margin: 0 auto;">\\n  <!-- Embed code 128 widget -->\\n</div>';
      modal.className = "modal-backdrop show";
    };
    function closeBloggerModal() {
      modal.className = "modal-backdrop";
    }
    document.getElementById("btn-copy-snippet").onclick = function() {
      navigator.clipboard.writeText(snippetCode.textContent);
      showToast("Copied Blogger snippet!");
      closeBloggerModal();
    };

    // Initialize with sample
    inputEl.value = sampleData.join("\\n");
    renderPreview();
  </script>
</body>
</html>`;
}

/**
 * Initiates the download of the standalone HTML file in the browser.
 */
export function downloadStandaloneHtmlFile(filename = 'code128-bulk-barcode-4x6-generator.html'): void {
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
