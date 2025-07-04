'use client';

import React, { useState, useEffect } from 'react';

function calculateSubnets(baseCIDR) {
  const subnets = [
    { name: 'Public Subnet A', cidr: baseCIDR.replace('/16', '/24'), az: 'us-east-1a' },
    { name: 'Public Subnet B', cidr: baseCIDR.replace('/16', '/24').replace('0.0', '1.0'), az: 'us-east-1b' },
    { name: 'Private Subnet A', cidr: baseCIDR.replace('/16', '/24').replace('0.0', '10.0'), az: 'us-east-1a' },
    { name: 'Private Subnet B', cidr: baseCIDR.replace('/16', '/24').replace('0.0', '11.0'), az: 'us-east-1b' },
  ];
  return subnets;
}

export default function VPCSubnettingPage() {
  const [baseCIDR, setBaseCIDR] = useState('10.0.0.0/16');
  const [theme, setTheme] = useState('light');

  const subnets = calculateSubnets(baseCIDR);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dynamic VPC Subnetting</h1>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-4 py-2 text-sm font-medium border rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">
            Enter Base CIDR Block (e.g., 10.0.0.0/16)
          </label>
          <input
            type="text"
            value={baseCIDR}
            onChange={(e) => setBaseCIDR(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <h2 className="text-xl font-semibold mb-3">Subnets for: {baseCIDR}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {subnets.map((subnet, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow"
            >
              <h3 className="text-lg font-medium">{subnet.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">CIDR: {subnet.cidr}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">AZ: {subnet.az}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

