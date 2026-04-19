import "./Auctions.css";
import Title from "../title/Title";
import Link from "../link/Link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

function Auctions() {
    const slides = [
        {
            title: "Грані реальності",
            text: "Роботи, натхненні творчістю таких майстрів, як Сальвадор Далі та Рене Магрітт, а також сучасних художників, які працюють з темою снів та ілюзій.",
            img: "/Images/slide-1.png"
        },
        {
            title: "Digital Dreams",
            text: "Сучасне цифрове мистецтво...",
            img: "/Images/slide-1.png"
        }
    ];

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="auctions">
            <div className="container">
                <div className="auctions-inner">
                    <div className="auctions-box">

                        <Title title="Аукціони"/>

                        <p className="auctions-description">
                            На цій сторінці зібрані всі актуальні аукціони, відкриті для участі просто зараз. Ми
                            регулярно оновлюємо перелік лотів, щоб ви першими дізнавалися про нові можливості та вигідні
                            пропозиції.
                        </p>

                        <Link text={"Перейти до усіх аукціонів"} href={"#"} className={"auctions-link"} />
                    </div>
                    <div className="auctions-slider">

                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                nextEl: ".custom-next",
                                prevEl: ".custom-prev"
                            }}
                            spaceBetween={30}
                            slidesPerView={1}
                        >
                            {slides.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <div className="auctions-slid-card">
                                        <div className="slid-card-inner">

                                            <div className="slid-card-content">
                                                <Title title={slide.title}/>
                                                <p className="slid-card-text">
                                                    {slide.text}
                                                </p>
                                            </div>

                                            <div className="slid-card-image">
                                                <img src={slide.img} alt={slide.title}/>
                                            </div>

                                        </div>

                                        <Link text={`Перейти до "${slide.title}"`} />
                                    </div>
                                </SwiperSlide>

                            ))}
                            <div className="slider-controls">
                                <button className="custom-prev">
                                    <img src="/Images/arrow-prev.svg" alt="arrow prev" />
                                </button>
                                <button className="custom-next">
                                    <img src="/Images/arrow-next.svg" alt="arrow next"/>
                                </button>
                            </div>
                        </Swiper>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Auctions;