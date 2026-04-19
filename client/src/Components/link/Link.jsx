import "./Link.css";

function ButtonLink({ href, text, className = "" }) {
    return (
        <a href={href} className={`button-link ${className}`}>
            {text}
        </a>
    );
}

export default ButtonLink;