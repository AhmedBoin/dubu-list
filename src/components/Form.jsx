import "./Form.css"
import AddButton from "./AddButton";
import { Input } from "./Input"; 

export function Form({ value, onChange, onClick, mode}) {
  const writing = value.trim().length > 0;
  return (
      <div className="input-form">
        <Input value={value} onChange={onChange} />
        <AddButton onClick={onClick} state={writing} mode={mode} />
      </div>
  );
}
