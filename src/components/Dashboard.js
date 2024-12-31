import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data - replace with your actual data
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
  <Card 
    className={`mb-4 cursor-pointer hover:bg-gray-50 ${isSelected ? 'border-blue-500 border-2' : ''}`}
    onClick={onClick}
  >
    <CardContent className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{bot.name}</h3>
        <Badge variant={bot.status === 'active' ? 'success' : 'secondary'}>
          {bot.status}
        </Badge>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <div>Profit: ${bot.profit}</div>
        <div>Trades: {bot.trades}</div>
      </div>
    </CardContent>
  </Card>
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
  <ScrollArea className="h-96">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Pair</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trades.map((trade) => (
          <TableRow key={trade.id}>
            <TableCell>{trade.time}</TableCell>
            <TableCell>{trade.pair}</TableCell>
            <TableCell>
              <Badge variant={trade.type === 'buy' ? 'default' : 'destructive'}>
                {trade.type}
              </Badge>
            </TableCell>
            <TableCell>{trade.amount}</TableCell>
            <TableCell>${trade.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </ScrollArea>
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
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Performance Metrics</CardTitle>
                <Select
                  value={selectedMetric}
                  onValueChange={setSelectedMetric}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profit">Profit</SelectItem>
                    <SelectItem value="trades">Number of Trades</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <PerformanceChart data={samplePerformanceData} metric={selectedMetric} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Total Profit</TableCell>
                  <TableCell>${selectedBot.profit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Trades</TableCell>
                  <TableCell>{selectedBot.trades}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Win Rate</TableCell>
                  <TableCell>65%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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