'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidChartProps {
  chart: string;
}

const MermaidChart: React.FC<MermaidChartProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
  }, []);

  useEffect(() => {
    if (ref.current) {
      mermaid.render('mermaid-svg', chart).then((svgCode) => {
        if (ref.current) {
          ref.current.innerHTML = svgCode.svg;
        }
      });
    }
  }, [chart]);

  return <div ref={ref}></div>;
};

export default MermaidChart;
