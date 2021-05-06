import * as React from "react";

import { AQ_LIVE_CONSTANTS } from "~/constants";
import { throttle } from "~/utils/throttle";

import { normalizeData } from "./data-mapper";
import { AirQualityData } from "./types";

let webSocket: WebSocket;

export function useAirQualityData(throttleTime = 3000) {
  const [error, setError] = React.useState<string>();
  const [data, setData] = React.useState<AirQualityData[]>([]);

  React.useEffect(() => {
    if (webSocket) {
      return;
    }

    try {
      webSocket = new WebSocket(AQ_LIVE_CONSTANTS.webSocketUrl);

      webSocket.onerror = (ev: Event) => {
        setError(`Websocket:error - ${ev.type}}`);
      };

      webSocket.onmessage = throttle(function (ev: MessageEvent<string>) {
        // TODO: Is this better?
        setData((prevData) => {
          try {
            return normalizeData(prevData, ev.data);
          } catch (err) {
            setError(err);
            return prevData;
          }
        });
      }, throttleTime);
    } catch (error) {
      setError("Got an error in establishing connection to websocet");
    }
  }, [data, throttleTime]);

  return { data, error };
}
