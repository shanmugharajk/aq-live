import { AirQualityData, AqiStatus } from "./types";

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

  // TODO: Better way? caching possible?
  return res.sort(function (a, b) {
    if (a.city < b.city) {
      return -1;
    }
    if (a.city > b.city) {
      return 1;
    }
    return 0;
  });
}

function getAqiStatus(aqi: number): [AqiStatus, string] {
  if (aqi <= 50) {
    return ["Good", "text-green-900"];
  } else if (aqi <= 100) {
    return ["Satisfactory", "text-green-600"];
  } else if (aqi <= 200) {
    return ["Moderate", "text-yellow-500"];
  } else if (aqi <= 300) {
    return ["Poor", "text-yellow-300"];
  } else if (aqi <= 400) {
    return ["Very Poor", "text-red-900"];
  } else {
    return ["Severe", "text-red-600"];
  }
}

function getLastUpdatedText(prevTime: Date) {
  let minutes = (new Date().valueOf() - prevTime.valueOf()) / (1000 * 60);

  return minutes < 1
    ? "a minute ago"
    : minutes < 59
    ? `${minutes} ago`
    : `at ${prevTime.toTimeString()}`;
}

export function normalizeData(prevData: AirQualityData[], currentData: string) {
  const currentJsonData = JSON.parse(currentData);

  const prevDataFlat = flattenData(prevData);
  const currDataFlat = flattenData(currentJsonData);

  // == process current data ==
  for (let key in currDataFlat) {
    currDataFlat[key].aqi = Number(currDataFlat[key].aqi.toFixed(2));
    currDataFlat[key].status = getAqiStatus(currDataFlat[key].aqi);
    currDataFlat[key].timestamp = new Date();
    currDataFlat[key].lastUpdated = "few seconds ago.";
  }

  // == result with current data ==
  let result: Record<string, AirQualityData> = { ...currDataFlat };

  // == pacthing data with old & new ==
  for (let key in prevDataFlat) {
    // if new data is present
    if (result[key]) {
      result[key].trend =
        prevDataFlat[key].aqi < result[key].aqi ? "Dec" : "Inc";
      continue;
    }

    result[key] = prevDataFlat[key];
    result[key].lastUpdated = getLastUpdatedText(result[key].timestamp);
  }

  return getValues(result);
}
