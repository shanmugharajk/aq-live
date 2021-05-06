import React from "react";

import { useAirQualityData } from "~/services/use-air-quality-data";

export const App: React.FunctionComponent = () => {
  const { data, error } = useAirQualityData();

  console.log(error);
  console.log(data);

  return <div>Air Quality Live</div>;
};
