"use client";
import React, { useState } from "react";
import InputForm from "@/shared/ui/InputSelector";
import style from "./signup.module.css";
import { $api } from "@/shared/lib/api";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";

interface InputArrayType {
  [key: string]: string;
}

const givenInput = [
  {
    id: "username",
    value: "Пользовательское имя",
    type: "text",
  },
  {
    id: "password",
    value: "Пароль",
    type: "password",
  },
];

const SignUp = () => {
  const [data, setData] = useState<InputArrayType>({});
  const [token, setToken] = useState<string>("");
  const route = useRouter();

  const OnChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onSendAuth = () => {
    $api
      .post("auth/login/", data)
      .then((response: AxiosResponse<{ token: string }>) => {
        const { token } = response.data;
        setToken(token);
        route.push("/");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  const postLocalStorageToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const onClickRoute = () => {
    route.push("/sign-in");
  };

  postLocalStorageToken(token);

  return (
    <div className={style.container_sign}>
      <div className={style.modal}>
        <div className={style.modal_container}>
          <div className={style.logo}>
            <img src="./assets/image/logotype.png" alt="" />
          </div>
          <div className={style.form}>
            {givenInput.map((item, index) => (
              <InputForm
                key={index}
                id={item.id}
                placeholder={item.value}
                onChange={OnChangeInput}
                type="type"
              />
            ))}
            <button onClick={onSendAuth} className={style.button}>
              Войти
            </button>
            <div className={style.route}>
              <button onClick={onClickRoute}>У меня нет аккаунта</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
