import "./DeletePopup.css";
import BubuOk from '../assets/bubuOk.gif';
import BubuNo from '../assets/bubuNo.gif';
import DuduOk from '../assets/duduOk.gif';
import DuduNo from '../assets/duduNo.gif';

export function DeletePopup({ onConfirm, mode, darkMode }) {
  return (
    <div className="delete-popup-overlay">
      <div className={`delete-popup-content ${darkMode ? 'dark-mode' : ''}`}>
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-popup-buttons">
          <button onClick={() => onConfirm(true)}>
            <img src={mode ? BubuOk : DuduOk} alt="Yes" />
          </button>
          <button onClick={() => onConfirm(false)}>
            <img src={mode ? BubuNo : DuduNo} alt="No" />
          </button>
        </div>
      </div>
    </div>
  );
}