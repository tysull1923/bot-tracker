import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const sampleBots = [
  { id: 1, name: 'BTC Scalper', status: 'active', profit: 2500, trades: 150 },
  { id: 2, name: 'ETH Swing', status: 'inactive', profit: 1800, trades: 75 },
  { id: 3, name: 'DOGE Day Trader', status: 'active', profit: 950, trades: 200 },
];

const samplePerformanceData = [
  { date: '2024-01-01', profit: 100, trades: 10 },
  { date: '2024-01-02', profit: 250, trades: 15 },
  { date: '2024-01-03', profit: 380, trades: 12 },
];

const sampleTrades = [
  { id: 1, time: '14:30:25', pair: 'BTC/USD', type: 'buy', amount: 0.1, price: 42000 },
  { id: 2, time: '14:32:10', pair: 'ETH/USD', type: 'sell', amount: 2.5, price: 2200 },
];

const BotCard = ({ bot, isSelected, onClick }) => (
  <div 
    className={`mb-4 p-4 rounded-lg border cursor-pointer hover:bg-gray-50 ${isSelected ? 'border-blue-500 border-2' : 'border-gray-200'}`}
    onClick={onClick}
  >
    <div className="flex justify-between items-center">
      <h3 className="font-medium">{bot.name}</h3>
      <span className={`px-2 py-1 rounded-full text-sm ${bot.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {bot.status}
      </span>
    </div>
    <div className="mt-2 text-sm text-gray-600">
      <div>Profit: ${bot.profit}</div>
      <div>Trades: {bot.trades}</div>
    </div>
  </div>
);

const PerformanceChart = ({ data, metric }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line 
        type="monotone" 
        dataKey={metric} 
        stroke="#2563eb" 
        strokeWidth={2}
      />
    </LineChart>
  </ResponsiveContainer>
);

const TradeList = ({ trades }) => (
  <div className="overflow-auto h-96">
    <table className="min-w-full">
      <thead>
        <tr className="border-b">
          <th className="py-2 px-4 text-left">Time</th>
          <th className="py-2 px-4 text-left">Pair</th>
          <th className="py-2 px-4 text-left">Type</th>
          <th className="py-2 px-4 text-left">Amount</th>
          <th className="py-2 px-4 text-left">Price</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade) => (
          <tr key={trade.id} className="border-b">
            <td className="py-2 px-4">{trade.time}</td>
            <td className="py-2 px-4">{trade.pair}</td>
            <td className="py-2 px-4">
              <span className={`px-2 py-1 rounded-full text-sm ${trade.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {trade.type}
              </span>
            </td>
            <td className="py-2 px-4">{trade.amount}</td>
            <td className="py-2 px-4">${trade.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Dashboard = () => {
  const [selectedBot, setSelectedBot] = useState(sampleBots[0]);
  const [selectedMetric, setSelectedMetric] = useState('profit');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Trading Bots</h2>
        {sampleBots.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            isSelected={selectedBot.id === bot.id}
            onClick={() => setSelectedBot(bot)}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Performance Metrics</h3>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="profit">Profit</option>
                  <option value="trades">Number of Trades</option>
                </select>
              </div>
            </div>
            <div className="p-4">
              <PerformanceChart data={samplePerformanceData} metric={selectedMetric} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Performance Summary</h3>
          </div>
          <div className="p-4">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Metric</th>
                  <th className="py-2 px-4 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">Total Profit</td>
                  <td className="py-2 px-4">${selectedBot.profit}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Total Trades</td>
                  <td className="py-2 px-4">{selectedBot.trades}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Win Rate</td>
                  <td className="py-2 px-4">65%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-96 bg-white p-4 border-l">
        <h2 className="text-xl font-bold mb-4">Recent Trades</h2>
        <TradeList trades={sampleTrades} />
      </div>
    </div>
  );
};

export default Dashboard;