import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function ChartComponent({ chartType, data, timestamps, label }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // If a chart instance already exists, destroy it before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: chartType || 'bar',
      data: {
        labels: timestamps || [],
        datasets: [{
          label: label || 'Dataset',
          data: data || [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

       // Cleanup function to destroy the chart when the component unmounts
       return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
    }, [chartType, data, timestamps, label]); // Recreate the chart if any of these dependencies change
  
    return (
      <canvas ref={chartRef} />
    );
  }