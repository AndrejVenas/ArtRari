import "./CardCurrentExhibitions.css";

function CardCurrentExhibitions({ title, theme, image, link }) {
    return (
        <div className="exhibition-card-current">
            <a href={link}>
                <div className="exhibition-image">
                    <img src={image} alt={title}/>
                </div>

                <h4>{title}</h4>

                <div className="exhibition-card-content">
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