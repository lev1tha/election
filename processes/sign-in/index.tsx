"use client";
import React, { useEffect, useState } from "react";
import InputForm from "@/shared/ui/InputSelector";
import style from "./signin.module.css";
import { $api } from "@/shared/lib/api";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";

interface InputArrayType {
  [key: string]: string;
}

const givenInput = [
  {
    id: "phone",
    value: "Номер вашего мобильного",
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
        localStorage.setItem("token", token);
        route.push("/");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  const onClickRoute = () => {
    route.push("/sign-up");
  };

  return (
    <div className={style.container_sign}>
      <div className={style.modal}>
        <div className="modal_container">
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
            <button onClick={onSendAuth} className="button">
              Войти
            </button>
            <div className="rout">
              <button onClick={onClickRoute}>У меня нет аккаунта</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
