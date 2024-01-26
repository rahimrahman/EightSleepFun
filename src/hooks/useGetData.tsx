import React, { useState, useRef, useEffect } from "react";

const USER_URL_MAP: Record<string, string> = {
  rahim:
    "https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json",
  nora: "https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json",
  zane: "https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json",
};

export const useGetData = (user: string) => {
  const [data, setData] = useState<{ intervals: [] }>({ intervals: [] });
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

  return [data];
};
