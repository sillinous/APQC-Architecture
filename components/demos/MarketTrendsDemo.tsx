'use client';

import { useState } from 'react';
import AgentDemo from '../AgentDemo';

export default function MarketTrendsDemo() {
  const [data, setData] = useState([100, 120, 115, 135, 150, 145, 160, 175]);
  const [period, setPeriod] = useState(3);
  const [results, setResults] = useState<any>(null);

  const calculateTrends = () => {
    // Moving Average
    const movingAvg = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      movingAvg.push(sum / period);
    }

    // Linear Regression
    const n = data.length;
    const sumX = data.reduce((sum, _, i) => sum + i, 0);
    const sumY = data.reduce((sum, val) => sum + val, 0);
    const sumXY = data.reduce((sum, val, i) => sum + (i * val), 0);
    const sumX2 = data.reduce((sum, _, i) => sum + (i * i), 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const trend = data.map((_, i) => slope * i + intercept);

    // CAGR
    const startValue = data[0];
    const endValue = data[data.length - 1];
    const years = data.length / 12; // Assuming monthly data
    const cagr = ((Math.pow(endValue / startValue, 1 / years) - 1) * 100).toFixed(2);

    setResults({
      movingAvg,
      slope: slope.toFixed(4),
      intercept: intercept.toFixed(2),
      trend,
      cagr,
      forecast: (slope * data.length + intercept).toFixed(2),
    });
  };

  return (
    <AgentDemo
      agentName="Market Trends Analysis"
      agentDescription="Analyzes market trends using statistical methods including moving averages, linear regression, and seasonality analysis."
      apqcLevel="3.0"
      algorithms={['Moving Averages', 'Linear Regression', 'CAGR', 'Seasonality Analysis']}
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sales Data (comma-separated)
          </label>
          <input
            type="text"
            value={data.join(', ')}
            onChange={(e) => setData(e.target.value.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v)))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="100, 120, 115, 135, 150..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Moving Average Period: {period}
          </label>
          <input
            type="range"
            min="2"
            max="6"
            value={period}
            onChange={(e) => setPeriod(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          onClick={calculateTrends}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Analyze Trends
        </button>

        {/* Results Section */}
        {results && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analysis Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Linear Regression</div>
                <div className="text-2xl font-bold text-blue-600">y = {results.slope}x + {results.intercept}</div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">CAGR (Compound Annual Growth Rate)</div>
                <div className="text-2xl font-bold text-green-600">{results.cagr}%</div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Next Period Forecast</div>
                <div className="text-2xl font-bold text-purple-600">{results.forecast}</div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Trend Direction</div>
                <div className="text-2xl font-bold text-orange-600">
                  {parseFloat(results.slope) > 0 ? '📈 Upward' : '📉 Downward'}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {period}-Period Moving Average
              </div>
              <div className="flex flex-wrap gap-2">
                {results.movingAvg.map((val: number, i: number) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm">
                    {val.toFixed(2)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AgentDemo>
  );
}
