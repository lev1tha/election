import React from "react";
import Link from "next/link";
import style from "@/shared/style/layout.module.css";

const LayoutComponent = () => {
  return (
    <div className={style.layout_container}>
      <nav className={style.navigation}>
        <Link className={style.box} href={"https://president.kg/"}>
          <span>Сайт президента Кыргызской Республики</span>
        </Link>
        <Link className={style.box} href={"https://kenesh.kg/"}>
          <span>Жогорку Кенеш Кырыгызской Республики</span>
        </Link>
        <Link className={style.box} href={"https://www.gov.kg/ky"}>
          <span>Правительнство Кыргызской Республики</span>
        </Link>
      </nav>
    </div>
  );
};

export default LayoutComponent;
