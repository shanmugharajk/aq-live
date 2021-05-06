import * as React from "react";

import { AqiTable } from "./AqiTable";

import { useAirQualityData } from "~/services/use-air-quality-data";

export const Dashboard: React.FunctionComponent = () => {
  const { data } = useAirQualityData();

  return (
    <div>
      <AqiTable rows={data} />
    </div>
  );
};
