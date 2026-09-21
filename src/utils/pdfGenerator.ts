import { jsPDF } from 'jspdf';
import { BarcodeItem, LabelConfig } from '../types';
import { getBarcodeDataUrl } from './barcode';

export interface PDFExportOptions {
  filename?: string;
  onProgress?: (current: number, total: number) => void;
}

/**
 * Generates a 4x6 inch PDF containing barcodes, with up to `config.barcodesPerPage` (default 4) per page.
 */
export async function generate4x6PDF(
  items: BarcodeItem[],
  config: LabelConfig,
  options: PDFExportOptions = {}
): Promise<jsPDF> {
  const validItems = items.filter((item) => item.isValid && item.value.trim().length > 0);
  
  if (validItems.length === 0) {
    throw new Error('No valid barcodes to export.');
  }

  const barcodesPerPage = Math.max(1, config.barcodesPerPage || 4);
  const totalItems = validItems.length;
  const totalPages = Math.ceil(totalItems / barcodesPerPage);

  // 4 inches wide by 6 inches high (Standard 4x6 thermal shipping/barcode label)
  const pageWidth = 4.0; // inches
  const pageHeight = 6.0; // inches

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: [pageWidth, pageHeight],
  });

  const marginTop = config.pageMarginTop ?? 0.3;
  const marginBottom = config.pageMarginBottom ?? 0.3;
  const marginLeft = config.pageMarginLeft ?? 0.25;
  const marginRight = config.pageMarginRight ?? 0.25;

  const usableWidth = pageWidth - marginLeft - marginRight;
  const usableHeight = pageHeight - marginTop - marginBottom;

  const slotHeight = usableHeight / barcodesPerPage;

  for (let p = 0; p < totalPages; p++) {
    if (p > 0) {
      doc.addPage([pageWidth, pageHeight], 'portrait');
    }

    const startIndex = p * barcodesPerPage;
    const pageItems = validItems.slice(startIndex, startIndex + barcodesPerPage);

    for (let slotIndex = 0; slotIndex < pageItems.length; slotIndex++) {
      const item = pageItems[slotIndex];
      const globalIndex = startIndex + slotIndex + 1;

      if (options.onProgress) {
        options.onProgress(globalIndex, totalItems);
      }

      // Generate barcode image data
      const barcodeRes = getBarcodeDataUrl(item.value, config);
      if (!barcodeRes.isValid || !barcodeRes.dataUrl) {
        continue;
      }

      // Calculate slot boundaries
      const slotTop = marginTop + slotIndex * slotHeight;
      const slotCenterY = slotTop + slotHeight / 2;

      // Calculate scaled dimensions to preserve aspect ratio within the slot
      const maxImgWidth = usableWidth;
      const maxImgHeight = slotHeight * 0.82; // leave breathability around text and bars

      const imgAspect = barcodeRes.width / barcodeRes.height;
      let renderWidth = maxImgWidth;
      let renderHeight = renderWidth / imgAspect;

      if (renderHeight > maxImgHeight) {
        renderHeight = maxImgHeight;
        renderWidth = renderHeight * imgAspect;
      }

      // Center horizontally on page
      const renderX = (pageWidth - renderWidth) / 2;
      // Center vertically in slot
      const renderY = slotCenterY - renderHeight / 2;

      // Place image into PDF
      doc.addImage(barcodeRes.dataUrl, 'PNG', renderX, renderY, renderWidth, renderHeight);

      // Optional cut / divider dashed line between barcodes
      if (config.showCutLines && slotIndex < barcodesPerPage - 1 && slotIndex < pageItems.length - 1) {
        const lineY = slotTop + slotHeight;
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.008);
        doc.setLineDashPattern([0.05, 0.05], 0);
        doc.line(marginLeft, lineY, pageWidth - marginRight, lineY);
        doc.setLineDashPattern([], 0); // reset dash
      }
    }

    // Optional page number in the bottom margin
    if (config.showPageNumbers && totalPages > 1) {
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(140, 140, 140);
      doc.text(
        `Page ${p + 1} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 0.12,
        { align: 'center' }
      );
    }
  }

  return doc;
}

/**
 * Downloads the generated PDF
 */
export async function download4x6PDF(
  items: BarcodeItem[],
  config: LabelConfig,
  filename = 'code128-barcodes-4x6.pdf',
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const doc = await generate4x6PDF(items, config, { onProgress });
  doc.save(filename);
}

/**
 * Generates a Blob URL of the PDF for in-browser preview or iframe print
 */
export async function getPDFBlobUrl(
  items: BarcodeItem[],
  config: LabelConfig
): Promise<string> {
  const doc = await generate4x6PDF(items, config);
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
}
