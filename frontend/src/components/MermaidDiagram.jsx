import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ chart }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      securityLevel: 'loose',
    });
    
    if (chart && chartRef.current) {
      mermaid.contentLoaded();
      const renderChart = async () => {
        try {
          chartRef.current.innerHTML = '';
          const cleanChart = chart
            .replace(/```mermaid\n?/gi, '')
            .replace(/```\n?/g, '')
            .replace(/^mermaid\n/i, '')
            .trim();
          
          const { svg } = await mermaid.render('mermaid-svg-' + Date.now(), cleanChart);
          if (chartRef.current) {
             chartRef.current.innerHTML = svg;
          }
        } catch (err) {
          console.error("Mermaid parsing error:", err);
          if (chartRef.current) {
            chartRef.current.innerHTML = '<div class="p-6 text-gray-500 dark:text-gray-400 text-center text-sm border border-dashed border-gray-300 dark:border-gray-700 rounded-xl"><em>The AI generated a complex diagram that could not be rendered visually.</em></div>';
          }
        }
      };
      renderChart();
    }
  }, [chart]);

  if (!chart) return null;

  return (
    <div className="w-full flex justify-center overflow-x-auto bg-gray-50 dark:bg-dark-900 rounded-xl p-4 border border-gray-100 dark:border-dark-700">
      <div ref={chartRef} className="mermaid-container" />
    </div>
  );
};

export default MermaidDiagram;
