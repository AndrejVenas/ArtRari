import './Loader.css';

export default function Loader({ hide }) {

    return (
        <div className={`loader ${hide ? 'hide' : ''}`}>
            <div className="spinner"></div>
        </div>
    );
}