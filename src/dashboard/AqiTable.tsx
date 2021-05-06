import * as React from "react";
import { UpIcon } from "~/components/icons/UpIcon";
import { DownIcon } from "~/components/icons/DownIcon";

import { Table } from "~/components/table/Table";
import type { IColumn } from "~/components/table/types";
import { AirQualityData } from "~/services/types";

interface Props {
  rows: AirQualityData[];
}

export const AqiTable: React.FunctionComponent<Props> = ({ rows }) => {
  const columns: IColumn[] = React.useMemo(
    () => [
      { id: "city", label: "City" },
      {
        id: "aqi",
        label: "Air Quality Index",
        render: (data: AirQualityData) => (
          <span className={`${data.status[1]} inline-flex`}>
            <span className="inline-block w-12">{data.aqi}</span>
            {data.trend === "Inc" && <UpIcon />}
            {data.trend === "Dec" && <DownIcon />}
          </span>
        ),
      },
      {
        id: "lastUpdated",
        label: "Last updated",
        render: (data: AirQualityData) => (
          <span className="text-gray-500">{data.lastUpdated}</span>
        ),
      },
    ],
    [],
  );

  return (
    <div className="m-3">
      <h2 className="my-4 text-xl">Citywise data</h2>
      <Table columns={columns} rows={rows} />
    </div>
  );
};
