"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { $api } from "@/shared/lib/api";
import style from "./condidate.module.css";
import Header from "@/widgets/header";
import Link from "next/link";
import { RootState, AppDispatch } from "@/entities/redux/store";
import { setSelectedCandidate } from "@/entities/redux/slice/SelectCandidate";

interface RequestType {
  last_name: string;
  first_name: string;
  id: number;
  bio: string;
  party: string;
  photo: string;
  votes_per_month: {};
  election: number;
  user: number;
}

const Page = () => {
  const [data, setData] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStars, setActiveStars] = useState<{ [key: number]: boolean }>(
    {}
  );

  const dispatch = useDispatch<AppDispatch>();
  const selectedCandidateId = useSelector(
    (state: RootState) => state.selectedCandidate.id
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $api.get("candidates/");
        setData(response.data);
      } catch (err) {
        setError(
          "Ошибка при загрузке данных кандидатов. Пожалуйста, попробуйте позже."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCandidateClick = (id: number) => {
    dispatch(setSelectedCandidate(id));
  };

  return (
    <>
      <Header />
      <div>
        <div className={style.condidate_box}>
          {data.map((item: RequestType) =>
            item.photo && item.party ? (
              <Link href={`/candidates/${item.id}`}>
                <div
                  key={item.id}
                  className={style.condidates_container}
                  onClick={() => handleCandidateClick(item.id)}
                >
                  <div>
                    <img
                      className={style.avatar}
                      src={item.photo}
                      alt={item.party}
                    />
                  </div>
                  <div className={style.condidates_info}>
                    <div>
                      <h1 className={style.name_condidate}>{item.party}</h1>
                    </div>
                    <div className={style.fullname}>
                      <p>
                        {item.first_name} {item.last_name}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
