import * as React from "react";
import { Line, LineChart, Tooltip } from "recharts";

import { IChartData } from "~/services/types";

interface Props {
  data: IChartData[];
}

export const MiniLineChart: React.FunctionComponent<Props> = ({ data }) => {
  return (
    <LineChart width={150} height={75} data={data}>
      <Tooltip />
      <Line type="monotone" dataKey="data" stroke="#8884d8" />
    </LineChart>
  );
};
