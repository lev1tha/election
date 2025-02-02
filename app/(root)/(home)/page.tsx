"use client";
import { $api } from "@/shared/lib/api";
import Header from "@/widgets/header";
import { useEffect, useState } from "react";
import style from "@/shared/style/home.module.css";
import LayoutComponent from "@/shared/component/layout";

const Home = () => {
  const [isAuth, setIsAuth] = useState<boolean>();
  const [isDataUser, setIsDataUser] = useState();

  useEffect(() => {
    $api.get("auth/profile/").then((req) => {
      localStorage.setItem("useInfo", JSON.stringify(req.data));
    });
  }, []);

  return (
    <div>
      <Header />
      <>
        <div className={style.container_home}>
          <div className={style.information_side}>
            <LayoutComponent />
            <div className="text">
              <p>
                В эпоху стремительного информационного обмена наш сайт выступает
                важным инструментом обеспечения прозрачности и открытости
                избирательного процесса. Здесь каждый гражданин может получить
                доступ к наиболее актуальной и достоверной информации,
                способствующей осознанному и ответственному участию в выборах.
                <br />
                <br />
                Наш портал предоставляет исчерпывающие данные о предстоящих
                выборах, включая законодательные новшества, календарь выборных
                мероприятий и официальные анонсы. Поддержание высокой степени
                информированности граждан о всех аспектах избирательного
                процесса является нашей приоритетной задачей.
                <br />
                <br />
                На сайте представлены подробные биографические и
                профессиональные досье кандидатов, сопровождаемые их
                программными заявлениями и позициями по ключевым вопросам. Эти
                материалы помогут сформировать объективное мнение о каждом из
                участников выборов, обеспечивая всестороннее понимание их
                политических позиций.
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
