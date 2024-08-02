"use client";
import React, { useEffect, useState } from "react";
import Header from "@/widgets/header";
import { $api } from "@/shared/lib/api";
import style from "./page.module.css";
import Voter from "@/shared/component/voter";

interface CandidateType {
  last_name: string;
  first_name: string;
  id: number;
  bio: string;
  party: string;
  photo: string | null;
  votes_per_month: {};
  election: number;
  user: number;
}

const page = ({ params }: { params: { id: string } }) => {
  const [dataCandidate, setDataCandidate] = useState<CandidateType | null>();

  useEffect(() => {
    $api
      .get(`candidates/${params.id}/`)
      .then((req) => setDataCandidate(req.data));
  }, []);

  const defaultPhoto = "/image/download.png";
  const candidatePhoto =
    dataCandidate?.photo !== null ? dataCandidate?.photo : defaultPhoto;

  return (
    <>
      <Header />
      <div className={style.candidate_container}>
        <div className={style.avatar_candidate}>
          <img src={candidatePhoto} alt="photo_user" />
        </div>
        <div className={style.information_candidate}>
          <div className={style.name_candidate}>
            <h1>
              {`${dataCandidate?.first_name} ${dataCandidate?.last_name}`}{" "}
            </h1>
          </div>
          <div className={style.party_candidate}>
            <h1>{dataCandidate?.party}</h1>
          </div>
          <div className={style.s}>
            <p>{dataCandidate?.bio}</p>
          </div>
          <Voter />
        </div>
      </div>
    </>
  );
};

export default page;
