import React from "react";
import style from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logotype}>
        <h1>
          Избирательный Сайт Предоставленный Государством Для Изберания Будущие
          Кандидантов
        </h1>
      </div>
      <div className={style.navigation}>
        <nav className={style.nav}>
          <Link href={"/vote"}>
            <p>Кол-во Голосов</p>
          </Link>
          <Link href={"/condidates"}>
            <p>Кандидаты</p>
          </Link>
          <Link href={"/profile"}>
            <p>Мой Профиль</p>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
