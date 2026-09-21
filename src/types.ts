export interface BarcodeItem {
  id: string;
  value: string;
  customText?: string;
  isValid: boolean;
  error?: string;
}

export interface LabelConfig {
  barcodesPerPage: number; // default 4 (user requested max 4 on one 4x6 page)
  barcodeHeight: number; // in mm or points (default ~22mm)
  barcodeWidthScale: number; // default 2 (bar width)
  fontSize: number; // default 14
  fontFamily: 'monospace' | 'sans-serif' | 'Arial';
  includeText: boolean;
  textMargin: number;
  pageMarginTop: number; // in inches or mm
  pageMarginBottom: number;
  pageMarginLeft: number;
  pageMarginRight: number;
  showCutLines: boolean;
  showPageNumbers: boolean;
  centerBarcode: boolean;
}

export type InputMode = 'bulk' | 'sequence' | 'upload';

export interface SequenceConfig {
  prefix: string;
  startNumber: number;
  count: number;
  step: number;
  suffix: string;
  padLength: number;
}
