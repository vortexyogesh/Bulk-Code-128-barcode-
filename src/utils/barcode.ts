import JsBarcode from 'jsbarcode';
import { BarcodeItem, LabelConfig } from '../types';

/**
 * Validates whether a given string is valid Code 128.
 * Code 128 supports all 128 standard ASCII characters (0-127).
 */
export function validateCode128(text: string): { isValid: boolean; error?: string } {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: 'Empty code' };
  }
  // Check for non-ASCII characters that Code 128 cannot represent
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 127) {
      return { isValid: false, error: `Invalid character '${text[i]}' (non-ASCII)` };
    }
  }
  return { isValid: true };
}

/**
 * Generates a high-resolution data URL for a barcode using off-screen HTMLCanvasElement.
 */
export function getBarcodeDataUrl(
  value: string,
  config: Partial<LabelConfig> = {}
): { dataUrl: string; width: number; height: number; isValid: boolean; error?: string } {
  try {
    const canvas = document.createElement('canvas');
    
    // JsBarcode options
    JsBarcode(canvas, value, {
      format: 'CODE128',
      width: config.barcodeWidthScale ?? 2,
      height: (config.barcodeHeight ?? 55),
      displayValue: config.includeText ?? true,
      text: value,
      fontSize: config.fontSize ?? 15,
      font: config.fontFamily ?? 'monospace',
      textMargin: config.textMargin ?? 4,
      textAlign: 'center',
      margin: 6,
      background: '#ffffff',
      lineColor: '#000000',
    });

    return {
      dataUrl: canvas.toDataURL('image/png', 1.0),
      width: canvas.width,
      height: canvas.height,
      isValid: true,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Invalid barcode value';
    return {
      dataUrl: '',
      width: 0,
      height: 0,
      isValid: false,
      error: errorMsg,
    };
  }
}

/**
 * Parse bulk text input into BarcodeItem array
 */
export function parseBulkInput(input: string): BarcodeItem[] {
  if (!input) return [];

  // Split by newlines, tabs, or semicolons
  const lines = input
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const items: BarcodeItem[] = [];

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    // Also support CSV split if commas exist
    const parts = raw.split(/[,\t]+/).map((p) => p.trim());
    for (const part of parts) {
      if (part.length > 0) {
        const val = validateCode128(part);
        items.push({
          id: `bc-${i}-${Math.random().toString(36).substring(2, 7)}`,
          value: part,
          isValid: val.isValid,
          error: val.error,
        });
      }
    }
  }

  return items;
}

/**
 * Generate sequential barcode list
 */
export function generateSequence(
  prefix: string,
  start: number,
  count: number,
  step: number,
  suffix: string,
  padLength: number
): BarcodeItem[] {
  const items: BarcodeItem[] = [];
  const safeCount = Math.min(Math.max(1, count), 1000); // Cap to 1000 for browser safety

  for (let i = 0; i < safeCount; i++) {
    const num = start + i * step;
    const numStr = padLength > 0 ? String(num).padStart(padLength, '0') : String(num);
    const value = `${prefix}${numStr}${suffix}`;
    const val = validateCode128(value);

    items.push({
      id: `seq-${i}-${Date.now()}`,
      value,
      isValid: val.isValid,
      error: val.error,
    });
  }

  return items;
}
