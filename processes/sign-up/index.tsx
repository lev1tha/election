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

interface ErrorArrayType {
  [key: string]: string;
}

interface StepItem {
  id: string;
  value: string;
  type: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

const baseSteps: StepItem[][] = [
  [
    {
      id: "first_name",
      value: "Имя",
      placeholder: "Напишите сюда",
      type: "text",
    },
    {
      id: "last_name",
      value: "Фамилия",
      placeholder: "Напишите сюда",
      type: "text",
    },
  ],
  [
    {
      id: "role",
      value: "Роль",
      type: "select",
      options: [
        { value: "candidate", label: "Кандидат" },
        { value: "client", label: "Клиент" },
      ],
    },
    {
      id: "address",
      value: "Адрес проживания",
      placeholder: "Напишите сюда",
      type: "text",
    },
  ],
  [
    {
      id: "email",
      value: "Почта",
      placeholder: "Напишите сюда",
      type: "email",
    },
    {
      id: "phone",
      value: "Номер телефона",
      placeholder: "Напишите сюда",
      type: "text",
    },
  ],
  [
    {
      id: "password",
      value: "Пароль",
      placeholder: "Напишите сюда",
      type: "password",
    },
    {
      id: "password_confirmation",
      value: "Подтверждение пароля",
      placeholder: "Напишите сюда",

      type: "password",
    },
  ],
];

const candidateExtraSteps: StepItem[] = [
  { id: "bio", value: "Биография", type: "text" },
  { id: "photo", value: "Фото", type: "file" },
  { id: "party", value: "Партия", type: "text" },
];

const SignUp = () => {
  const route = useRouter();
  const [data, setData] = useState<InputArrayType>({});
  const [errors, setErrors] = useState<ErrorArrayType>({});
  const [currentStep, setCurrentStep] = useState(0);

  const steps =
    data.role === "candidate" ? [...baseSteps, candidateExtraSteps] : baseSteps;

  const validateStep = (): boolean => {
    const currentErrors: ErrorArrayType = {};
    steps[currentStep].forEach((item) => {
      if (!data[item.id]) {
        currentErrors[
          item.id
        ] = `${item.value} обязательное поле для заполнения`;
      }
    });

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, files } = event.target as HTMLInputElement;

    setData((prevData: any) => ({
      ...prevData,
      [id]: files && files.length > 0 ? files[0] : value,
    }));

    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const onClickRoute = () => {
    route.push("/sign-in");
  };

  const onSendAuth = async () => {
    if (!validateStep()) return;
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });
      const { data: user } = await $api.post("auth/register/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      const token = user.token;
      localStorage.setItem("token", token);
      if (user.role != "canditate") route.push("/");
      const { data: canditate } = await $api.post("candidates/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(canditate);
      route.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <div className={style.modal_container}>
      <div className={style.modal}>
        <div className={style.logotype}>
          <img src="/image/logo-f96fa03c.png" alt="" />
        </div>
        <div className={style.form}>
          {steps[currentStep].map((item) => (
            <div key={item.id}>
              <p className={style.upper_input_text}>{item.value}</p>
              <InputForm
                id={item.id}
                placeholder={item.placeholder}
                type={item.type}
                options={item.options}
                onChange={handleInputChange}
              />
              {errors[item.id] && (
                <p className={style.error}>{errors[item.id]}</p>
              )}
            </div>
          ))}
          <div className={style.buttons}>
            {currentStep < steps.length - 1 && (
              <button onClick={handleNextStep}>Продолжить</button>
            )}
            {currentStep === steps.length - 1 && (
              <button onClick={onSendAuth}>Зарегистрироваться</button>
            )}
            {currentStep > 0 && <button onClick={handlePrevStep}>Назад</button>}
          </div>
          <div className={style.route}>
            <button onClick={onClickRoute}>У меня есть аккаунт</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
