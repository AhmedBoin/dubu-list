import "./Input.css";

export function Input({value, onChange}) {
    return (
        <input
            className="input-field"
            type="text"
            placeholder="New task..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
