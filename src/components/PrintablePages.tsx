import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { BarcodeItem, LabelConfig } from '../types';

interface PrintablePagesProps {
  items: BarcodeItem[];
  config: LabelConfig;
}

export const PrintablePages: React.FC<PrintablePagesProps> = ({ items, config }) => {
  const validItems = items.filter((i) => i.isValid && i.value.trim().length > 0);
  const barcodesPerPage = Math.max(1, config.barcodesPerPage || 4);

  // Group into pages
  const pages: BarcodeItem[][] = [];
  for (let i = 0; i < validItems.length; i += barcodesPerPage) {
    pages.push(validItems.slice(i, i + barcodesPerPage));
  }

  if (pages.length === 0) return null;

  return (
    <div className="print-only">
      {pages.map((pageItems, pageIdx) => (
        <div key={`print-page-${pageIdx}`} className="print-page-break">
          {pageItems.map((item, itemIdx) => (
            <PrintBarcodeItem
              key={`print-item-${item.id}-${itemIdx}`}
              item={item}
              config={config}
              isLast={itemIdx === pageItems.length - 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface PrintBarcodeItemProps {
  item: BarcodeItem;
  config: LabelConfig;
  isLast: boolean;
}

const PrintBarcodeItem: React.FC<PrintBarcodeItemProps> = ({ item, config, isLast }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
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
    } catch (e) {
      console.error(e);
    }
  }, [item.value, config]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.1in 0',
        borderBottom: config.showCutLines && !isLast ? '1px dashed #cccccc' : 'none',
      }}
    >
      <svg ref={svgRef} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};
