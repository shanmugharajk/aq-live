import React from "react";

import { Dashboard } from "~/dashboard/Dashboard";

export const App: React.FunctionComponent = () => {
  return (
    <div>
      <header className="p-3 border-b border-gray-300">
        <h1 className="text-2xl">Air Quality Monitoring</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
};
