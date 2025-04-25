"use client";

import React, { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

type Theme = "light" | "dark";

type CIDRInfo = {
  netmask: string | number;
  firstUsable: string;
  lastUsable: string;
  count: number;
};

const themes: Record<Theme, {
  background: string;
  text: string;
  box: string;
  input: string;
}> = {
  light: {
    background: "bg-white",
    text: "text-gray-900",
    box: "bg-gray-100",
    input: "text-gray-900 bg-white border border-gray-300",
  },
  dark: {
    background: "bg-gray-900",
    text: "text-white",
    box: "bg-gray-800",
    input: "text-white bg-gray-700 border border-gray-600",
  },
};

export default function CIDRProVisualizer() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [cidr, setCidr] = useState("");
  const [output, setOutput] = useState<CIDRInfo | null>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleCIDRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCidr(value);

    try {
      const [ip, bits] = value.split("/");
      const base = ip.split(".").map(Number);
      const netmaskBits = parseInt(bits);
      const hostCount = Math.pow(2, 32 - netmaskBits) - 2;
      const first = base.map((b, i) => (i === 3 ? b + 1 : b)).join(".");
      const last = base.map((b, i) => (i === 3 ? b + hostCount : b)).join(".");

      setOutput({
        netmask: isNaN(netmaskBits) ? "Invalid" : netmaskBits,
        firstUsable: first,
        lastUsable: last,
        count: hostCount,
      });
    } catch {
      setOutput(null);
    }
  };

  return (
    <div className={`min-h-screen px-6 py-10 ${themes[theme].background} ${themes[theme].text}`}>
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">CIDR Pro Visualizer</h1>
          <div className="flex flex-col items-center">
            <button onClick={toggleTheme} className="p-2 rounded bg-gray-700 text-white">
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <span className="text-xs mt-1">
              {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            </span>
          </div>
        </header>

        <div className={`rounded-xl p-6 shadow-md border border-gray-600 ${themes[theme].box}`}>
          <label className="block mb-2 text-sm font-medium">Enter CIDR Notation:</label>
          <input
            type="text"
            value={cidr}
            onChange={handleCIDRChange}
            placeholder="e.g. 192.168.0.0/24"
            className={`w-full p-3 rounded ${themes[theme].input}`}
          />
        </div>

        {output && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="p-4 rounded-lg shadow bg-gray-100 text-black">
                <strong>Netmask</strong>
                <p>{output.netmask}</p>
              </div>
              <div className="p-4 rounded-lg shadow bg-green-100 text-black">
                <strong>First Usable IP</strong>
                <p>{output.firstUsable}</p>
              </div>
              <div className="p-4 rounded-lg shadow bg-yellow-100 text-black">
                <strong>Last Usable IP</strong>
                <p>{output.lastUsable}</p>
              </div>
              <div className="p-4 rounded-lg shadow bg-blue-100 text-black">
                <strong>IP Count</strong>
                <p>{output.count}</p>
              </div>
            </div>

            <div className="mt-10 text-sm opacity-80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 rounded border bg-gray-100 text-black">
                <h3 className="font-semibold mb-1">Netmask</h3>
                <p>The number of bits reserved for the network portion of the IP address.</p>
              </div>
              <div className="p-4 rounded border bg-green-100 text-black">
                <h3 className="font-semibold mb-1">First Usable IP</h3>
                <p>The first IP address available for assignment to a host.</p>
              </div>
              <div className="p-4 rounded border bg-yellow-100 text-black">
                <h3 className="font-semibold mb-1">Last Usable IP</h3>
                <p>The last IP address assignable before the broadcast address.</p>
              </div>
              <div className="p-4 rounded border bg-blue-100 text-black">
                <h3 className="font-semibold mb-1">IP Count</h3>
                <p>Total usable IP addresses excluding network and broadcast.</p>
              </div>
            </div>
          </>
        )}

        <footer className="mt-12 text-center text-sm opacity-80">
          <p>
            Built by <a href="https://www.linkedin.com/in/ready2assist/" target="_blank" className="underline">Emmanuel Naweji</a>
          </p>
          <p>
            Find the source on <a href="https://github.com/Here2ServeU/cidr-visualizer" target="_blank" className="underline">GitHub</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
