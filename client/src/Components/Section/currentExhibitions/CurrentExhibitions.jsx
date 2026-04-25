import "./CurrentExhibitions.css";
import Title from "../../UI/title/Title";
import CardCurrentExhibitions from "../../CardCurrentExhibitions/CardCurrentExhibitions";
import Link from "../../UI/link/Link";

function CurrentExhibitions() {
    const exhibitions = [
        {
            image: "/images/modernAbstract.jpg",
            title: "Modern Abstract",
            date: "10.10.2023",
            theme: "Японія",
            imageDescription: "Фотографія Японії",
            link: "#"
        },
        {
            image: "/images/modernAbstract.jpg",
            title: "Modern Abstract",
            date: "10.10.2023",
            theme: "Японія",
            imageDescription: "Фотографія Японії",
            link: "#"
        },
        {
            image: "/images/modernAbstract.jpg",
            title: "Modern Abstract",
            date: "10.10.2023",
            theme: "Японія",
            imageDescription: "Фотографія Японії",
            link: "#"
        },
        {
            image: "/images/modernAbstract.jpg",
            title: "Modern Abstract",
            date: "10.10.2023",
            theme: "Японія",
            imageDescription: "Фотографія Японії",
            link: "#"
        },
        {
            image: "/images/modernAbstract.jpg",
            title: "Modern Abstract",
            date: "10.10.2023",
            theme: "Японія",
            imageDescription: "Фотографія Японії",
            link: "#"
        },
        {
            image: "/images/modernAbstract.jpg",
            title: "Modern Abstract",
            date: "10.10.2023",
            theme: "Японія",
            imageDescription: "Фотографія Японії",
            link: "#"
        }
    ];

    return (
        <section className="current-exhibitions">
            <div className="container">

                <Title title="Поточні виставки" />

                <div className="exhibitions-box">
                    {exhibitions.map((item, index) => (
                        <CardCurrentExhibitions
                            key={index}
                            image={item.image}
                            title={item.title}
                            date={item.date}
                            theme={item.theme}
                            imageDescription={item.imageDescription}
                            link={item.link}
                        />
                    ))}
                </div>

                <Link href={"#"} text={"Перейти до всіх виставок"} className={"position-center"}/>

            </div>
        </section>
    );
}

export default CurrentExhibitions;