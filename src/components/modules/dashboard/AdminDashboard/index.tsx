'use client';

import { Card } from '@/components/ui/card';
import { IBrand, ICategory, IShop, IUser } from '@/types';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

export default function DashboardPage({
  users,
  shops,
  brands,
  categories,
  stats,
  userGrowthData,
  shopDistributionData,
  brandPopularityData,
}: {
  users: IUser[];
  shops: IShop[];
  brands: IBrand[];
  categories: ICategory[];
  stats: {
    title: string;
    value: number;
    change: string;
    icon: React.ReactNode;
  }[];
  userGrowthData: { month: string; users: number }[];
  shopDistributionData: { name: string; value: number }[];
  brandPopularityData: { name: string; shops: number }[];
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-sm text-green-500 mt-2">
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 rounded-lg  bg-secondary">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Line Chart - User Growth */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart - Shop Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Shop Distribution by Category
          </h2>
          <div className="h-64">
            {shopDistributionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={shopDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {shopDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No category data available
              </div>
            )}
          </div>
        </Card>

        {/* Bar Chart - Brand Popularity */}
        <Card className="p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">
            Top Brands by Shop Count
          </h2>
          <div className="h-64">
            {brandPopularityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={brandPopularityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="shops" fill="#8884d8" name="Number of Shops" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No brand data available
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            `${
              users.length > 0 ? `New user: ${users[0].name}` : 'User activity'
            }`,
            `${
              shops.length > 0 ? `New shop: ${shops[0].name}` : 'Shop activity'
            }`,
            `${
              categories.length > 0
                ? `Category updated: ${categories[0].name}`
                : 'Category activity'
            }`,
            `${
              brands.length > 0
                ? `Brand added: ${brands[0].name}`
                : 'Brand activity'
            }`,
            `${Math.min(users.length, 5)} new users this week`,
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start border-b pb-4 last:border-0"
            >
              <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-primary" />
              <div className="ml-4">
                <p className="text-sm">{activity}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(Date.now() - index * 3600000).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
