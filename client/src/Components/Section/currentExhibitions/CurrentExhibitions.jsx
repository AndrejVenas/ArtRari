import "./CurrentExhibitions.css";
import Title from "../../UI/title/Title";
import CardCurrentExhibitions from "../../CardCurrentExhibitions/CardCurrentExhibitions";
import Link from "../../UI/link/Link";
import axios from "axios";
import { useEffect, useState } from "react";
import { EXHIBITIONS } from "../../../constants";

function CurrentExhibitions() {
    const [exhibitions, setExhibitions] = useState([])
    /*const exhibitions = [
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
    ];*/
    const exhibitionsAction = async () => {
        try {
            const response = await axios.get('http://localhost:8080/exhibitions')
            setExhibitions(response.data.page.items)
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        exhibitionsAction()
    }, [])
    return (
        <section className="current-exhibitions">
            <div className="container">

                <Title title="Поточні виставки" />

                <div className="exhibitions-box">
                    {exhibitions?.map((item, index) => (
                        <CardCurrentExhibitions
                            key={index}
                            image={item.thumbnailUrl}
                            title={item.title}
                            theme={item.theme}
                            link={EXHIBITIONS + '/' + item.title + '/' + item.id}
                        />
                    ))}
                </div>

                <Link href={EXHIBITIONS} text={"Перейти до всіх виставок"} className={"position-center"}/>

            </div>
        </section>
    );
}

export default CurrentExhibitions;