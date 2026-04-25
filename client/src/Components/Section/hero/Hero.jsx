import "./Hero.css";
import heroBg from "../../../Images/hero-bg.png";
import SocialLinks from "../../UI/social-links/SocialLinks";

function Hero() {
    return (
        <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="hero-content">
                <h1 className="hero-title">ArtRari</h1>
                <h3 className="hero-subtitle">сервіс сучасного перегляду та купівлі творів мистецтва</h3>
                <SocialLinks />
            </div>
        </section>
    );
}

export default Hero;