import "./Header.css";
import Bubu from "../assets/bubu.gif";
import Dudu from "../assets/dudu.gif";

export function Header({ mode, darkMode, onToggleMode, onToggleDarkMode }) {
    return (
        <div className="header">
            <img className="into-img" src={mode ? Bubu : Dudu} />
            <div className="title-container">
                <h1>DuBuList</h1>
                <div className="switches-container">
                    <label className="switch">
                        <input 
                            type="checkbox"
                            checked={mode}
                            onChange={onToggleMode}
                        />
                        <span className="slider round"></span>
                    </label>
                    <label className="switch dark-mode-switch">
                        <input 
                            type="checkbox"
                            checked={darkMode}
                            onChange={onToggleDarkMode}
                        />
                        <span className="slider round dark"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}