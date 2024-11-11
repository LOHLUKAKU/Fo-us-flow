import React, { useState } from 'react';
import { Clock, Focus, Globe, Lock, Power, Settings, Timer, Youtube } from 'lucide-react';

interface TimedWebsite {
  url: string;
  timeLimit: number;
  timeUsed: number;
}

interface BlockedWebsite {
  url: string;
  reason: string;
}

function App() {
  const [cycleEnabled, setCycleEnabled] = useState(false);
  const [focusModeEnabled, setFocusModeEnabled] = useState(false);
  const [timedWebsites, setTimedWebsites] = useState<TimedWebsite[]>([
    { url: 'youtube.com', timeLimit: 30, timeUsed: 15 },
    { url: 'facebook.com', timeLimit: 20, timeUsed: 5 },
  ]);
  const [blockedWebsites] = useState<BlockedWebsite[]>([
    { url: 'tiktok.com', reason: 'Social Media' },
    { url: 'instagram.com', reason: 'Social Media' },
  ]);
  const [newWebsite, setNewWebsite] = useState('');
  const [newTimeLimit, setNewTimeLimit] = useState('30');

  const addTimedWebsite = () => {
    if (newWebsite && newTimeLimit) {
      setTimedWebsites([
        ...timedWebsites,
        { url: newWebsite, timeLimit: parseInt(newTimeLimit), timeUsed: 0 },
      ]);
      setNewWebsite('');
      setNewTimeLimit('30');
    }
  };

  return (
    <div className="w-[400px] min-h-[600px] bg-gradient-to-br from-indigo-50 to-white text-gray-800">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-semibold">FocusFlow</h1>
          </div>
          <Settings className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Internet Cycle Control */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <h2 className="font-medium">Internet Cycle</h2>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={cycleEnabled}
                onChange={() => setCycleEnabled(!cycleEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            40 minutes online / 20 minutes break
          </div>
          {cycleEnabled && (
            <div className="bg-indigo-50 rounded-lg p-3 text-sm">
              <div className="flex items-center justify-between text-indigo-700">
                <span>Next break in:</span>
                <span className="font-semibold">23:45</span>
              </div>
            </div>
          )}
        </div>

        {/* Focus Mode */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Focus className="w-5 h-5 text-indigo-600" />
              <h2 className="font-medium">Focus Mode</h2>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={focusModeEnabled}
                onChange={() => setFocusModeEnabled(!focusModeEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <p className="text-sm text-gray-600">Blocks distracting websites</p>
        </div>

        {/* Timed Websites */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h2 className="font-medium">Timed Websites</h2>
          </div>
          
          <div className="space-y-2 mb-4">
            {timedWebsites.map((site, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2 text-sm">
                <span>{site.url}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(site.timeUsed / site.timeLimit) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600 w-16 text-right">
                    {site.timeUsed}/{site.timeLimit}m
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Website URL"
              className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newWebsite}
              onChange={(e) => setNewWebsite(e.target.value)}
            />
            <input
              type="number"
              placeholder="Minutes"
              className="w-20 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTimeLimit}
              onChange={(e) => setNewTimeLimit(e.target.value)}
            />
            <button
              onClick={addTimedWebsite}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Blocked Websites */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-indigo-600" />
            <h2 className="font-medium">Blocked Websites</h2>
          </div>
          
          <div className="space-y-2">
            {blockedWebsites.map((site, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2 text-sm">
                <span>{site.url}</span>
                <span className="text-gray-500">{site.reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;