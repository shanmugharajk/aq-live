import * as React from "react";

import { AqiTable } from "./AqiTable";

import { useAirQualityData } from "~/services/use-air-quality-data";

export const Dashboard: React.FunctionComponent = () => {
  const { data } = useAirQualityData();

  return (
    <div>
      <header className="p-3 border-b border-gray-300">
        <h1 className="text-2xl">Air Quality Monitoring</h1>
      </header>
      <main>
        <AqiTable rows={data} />
      </main>
    </div>
  );
};
