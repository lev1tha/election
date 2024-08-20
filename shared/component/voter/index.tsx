"use client";
import { useEffect, useState } from "react";
import { $api } from "@/shared/lib/api";
import style from "./voter.module.css";

export default function Index({ params }: any) {
  const [isUserInfo, setIsUserInfo] = useState<any>(null);

  useEffect(() => {
    $api.get("auth/profile").then((req) => setIsUserInfo(req.data));
  }, []);

  const handleOnVoter = () => {
    if (isUserInfo) {
      const { id, ...object } = isUserInfo;

      $api.post("voter/", {
        user: Number(id),
        ...object,
      });
    }
  };

  return (
    <button className={style.button} onClick={handleOnVoter}>
      Голосовать
    </button>
  );
}
