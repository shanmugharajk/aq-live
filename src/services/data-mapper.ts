import { AirQualityData } from "./types";

function flattenData(data: AirQualityData[]) {
  const obj: Record<string, AirQualityData> = {};

  data.forEach((item) => {
    obj[item.city] = item;
  });

  return obj;
}

function getValues(data: Record<string, AirQualityData>) {
  const res = [];

  for (let key in data) {
    res.push(data[key]);
  }

  return res;
}

export function normalizeData(prevData: AirQualityData[], currentData: string) {
  const currentJsonData = JSON.parse(currentData);

  const prevDataFlat = flattenData(prevData);
  const currDataFlat = flattenData(currentJsonData);

  for (let key in currDataFlat) {
    currDataFlat[key].timestamp = new Date();
    currDataFlat[key].lastUpdated = "Updated few seconds agao.";
  }

  let result: Record<string, AirQualityData> = { ...currDataFlat };

  for (let key in prevDataFlat) {
    // if new data is present
    if (result[key]) {
      continue;
    }

    result[key] = prevDataFlat[key];
    let currentTime = new Date();
    let lastFetchedTime = result[key].timestamp;
    let minutes =
      (currentTime.valueOf() - lastFetchedTime.valueOf()) / (1000 * 60);

    result[key].lastUpdated =
      minutes < 1
        ? "Updated a minute ago"
        : minutes < 59
        ? `Updated ${minutes} ago`
        : `Updated at ${lastFetchedTime.toTimeString()}`;
  }

  return getValues(result);
}
