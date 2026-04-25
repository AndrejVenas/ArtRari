import "./SocialLinks.css";
import redditIcon from "../../../Images/socialIcons/reddit.svg";
import facebookIcon from "../../../Images/socialIcons/facebook.svg";
import instagramIcon from "../../../Images/socialIcons/instagram.svg";
import xtwitterIcon from "../../../Images/socialIcons/x-twitter.svg";
import angleDown45 from "../../../Images/angle-down-45.svg";

function SocialLinks() {
    return (
        <div className="social-links">

            <div className="social-links-item">
                <a href="https://reddit.com" target="_blank" rel="noreferrer">
                    <img src={redditIcon} alt="reddit icon" />
                </a>

                <a href="https://x.com" target="_blank" rel="noreferrer">
                    <img src={xtwitterIcon} alt="x (twitter) icon" />
                </a>
            </div>

            <div className="social-link-target">
                <a href="#footer">
                    <img src={angleDown45} alt="link to footer" />
                </a>
            </div>

            <div className="social-links-item">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <img src={facebookIcon} alt="facebook icon" />
                </a>

                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <img src={instagramIcon} alt="instagram icon" />
                </a>
            </div>

        </div>
    );
}

export default SocialLinks;