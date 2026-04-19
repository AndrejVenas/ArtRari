import "./CardCurrentExhibitions.css";

function CardCurrentExhibitions({ title, theme, image, date, imageDescription, link }) {
    return (
        <div className="exhibition-card">
            <a href={link}>
                <div className="exhibition-image">
                    <img src={image} alt={imageDescription}/>
                </div>

                <h4>{title}</h4>

                <div className="exhibition-card-content">
                    <div className="exhibitions-time">
                        <p>Коли:</p>
                        <p className="text-bold">{date}</p>
                    </div>
                    <div className="exhibitions-theme">
                        <p>Тема:</p>
                        <p className="text-bold">{theme}</p>
                    </div>
                </div>

                <div className="overlay">
                    <p>Більше деталей</p>
                </div>
            </a>
        </div>
    );
}

export default CardCurrentExhibitions;