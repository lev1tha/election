"use client";
import React, { useState, useEffect } from "react";
import style from "./profile.module.css";
import { $api } from "@/shared/lib/api";
import Image from "next/image";
import { BASE_URL } from "@/shared/lib/api";

interface UserProfile {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
  bio: string;
  photo: string;
  party: string;
  phone: string;
  avatar?: string;
  address?: string;
  [key: string]: any;
}

const translations: { [key: string]: string } = {
  first_name: "Имя",
  last_name: "Фамилия",
  username: "Пользовательское имя",
  email: "Электронная почта",
  role: "Роль",
  bio: "Биография",
  party: "Партия",
  phone: "Номер телефона",
  avatar: "Аватар",
  address: "Адрес проживания",
};

const Index: React.FC = () => {
  const [viewProfile, setViewProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    $api
      .get("auth/profile/")
      .then((response) => {
        setViewProfile(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
      });
  }, []);
  console.log(viewProfile);
  return (
    <div className={style.container_profile}>
      <h1>Ваш профиль</h1>
      {viewProfile ? (
        <div>
          {viewProfile.photo && (
            <div className={style.profile_item}>
              <Image
                src={BASE_URL + viewProfile.photo}
                width={200}
                height={200}
                alt="User Avatar"
                className={style.avatar}
              />
            </div>
          )}
          <div>
            {Object.entries(viewProfile).map(
              ([key, value]) =>
                key !== "id" &&
                key !== "photo" && (
                  <div key={key} className={style.profile_item}>
                    <p>{translations[key] || key}:</p> <span>{value}</span>
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Index;
