import React, { useState, useRef, useEffect } from "react";

const USER_URL_MAP: Record<string, string> = {
  rahim:
    "https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json",
  nora: "https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json",
  zane: "https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json",
};

type TimeSeries = {
  tnt: [string, number][];
  tempRoomC: [string, number][];
  tempBedC: [string, number][];
  respiratoryRate: [string, number][];
  heartRate: [string, number][];
};

type Stage = {
  stage: "awake" | "out" | "light" | "deep";
  duration: number;
};

type Interval = {
  id: string;
  ts: string;
  stages: Stage[];
  score: number;
  timeseries: TimeSeries;
};

export type ResponseData = {
  intervals: Interval[];
};

export const useGetData = (user: string) => {
  const [data, setData] = useState<ResponseData>({ intervals: [] });
  const currentUser = useRef("");

  useEffect(() => {
    if (currentUser.current === user) {
      return;
    }

    currentUser.current = user;
    const getData = async () => {
      const response = await fetch(USER_URL_MAP[user]);
      const jsonData = await response.json();

      setData(jsonData);
    };

    getData();
  }, [user]);

  return [data] as [ResponseData];
};

const sampleData: Interval = {
  id: "1",
  ts: "2017-02-28T05:10:00.000Z",
  stages: [
    {
      stage: "awake",
      duration: 1024,
    },
  ],
  score: 93,
  timeseries: {
    tnt: [["2017-02-28T06:20:00.000Z", 1]],
    tempRoomC: [
      // ambient room temperature, in celsius
      ["2017-02-28T05:00:00.000Z", 19.787400000000005],
    ],
    tempBedC: [
      // bed temperature, celsius
      ["2017-02-28T05:00:00.000Z", 34.151399999999995],
    ],
    respiratoryRate: [
      // measured in "breaths per minute"
      ["2017-02-28T05:00:00.000Z", 16.666666666666668],
    ],
    heartRate: [
      // measured in "beats per minute"
      ["2017-02-28T05:00:00.000Z", 48],
    ],
  },
};
