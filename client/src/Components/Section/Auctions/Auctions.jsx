import "./Auctions.css";
import Title from "../../UI/title/Title";
import Link from "../../UI/link/Link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auctionAction } from "../../../Actions/auctionAction";
import { AUCTIONS } from "../../../constants";
import { useNavigate } from "react-router-dom";

function Auctions() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { page } = useSelector((state) => state.Auction);

    useEffect(() => {
        dispatch(auctionAction(0, ""));
    }, [dispatch]);

    return (
        <section id="auctions" className="auctions">
            <div className="container">
                <div className="auctions-inner">

                    <div className="auctions-box">

                        <Title title="Аукціони" />

                        <p className="auctions-description">
                            На цій сторінці зібрані всі актуальні аукціони,
                            відкриті для участі просто зараз. Ми регулярно
                            оновлюємо перелік лотів, щоб ви першими
                            дізнавалися про нові можливості та вигідні
                            пропозиції.
                        </p>

                        <Link
                            text={"Перейти до усіх аукціонів"}
                            href={AUCTIONS}
                            className={"auctions-link"}
                        />

                    </div>

                    <div className="auctions-slider">

                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                nextEl: ".custom-next",
                                prevEl: ".custom-prev",
                            }}
                            spaceBetween={30}
                            slidesPerView={1}
                        >

                            {page?.items?.slice(0, 6).map((slide) => (
                                <SwiperSlide key={slide.id}>

                                    <div className="auctions-slid-card">

                                        <div className="slid-card-inner">

                                            <div className="slid-card-content">

                                                <Title title={slide.title} />

                                                <p className="slid-card-text">
                                                    {slide.description}
                                                </p>

                                            </div>

                                            <div className="slid-card-image">
                                                <img
                                                    src={slide.thumbnailUrl}
                                                    alt={slide.title}
                                                />
                                            </div>

                                        </div>

                                        <Link
                                            text={`Перейти до "${slide.title}"`}
                                            href={`${AUCTIONS}/${slide.title}/${slide.id}`}
                                        />

                                    </div>

                                </SwiperSlide>
                            ))}

                        </Swiper>

                        <div className="slider-controls">

                            <button className="custom-prev">
                                <img
                                    src="/images/arrow-prev.svg"
                                    alt="arrow prev"
                                />
                            </button>

                            <button className="custom-next">
                                <img
                                    src="/images/arrow-next.svg"
                                    alt="arrow next"
                                />
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default Auctions;