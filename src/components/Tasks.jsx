import "./Tasks.css"
import BubuTask from "../assets/bubuTask.gif";
import BubuJump from "../assets/bubuJump.gif";
import DuduTask from "../assets/duduTask.gif";
import DuduJump from "../assets/duduJump.gif";

export function Tasks({ todos, toggleTodo, deleteTodo, mode, darkMode }) {
    return (
        <div className="tasks-container">
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <img
                            src={todo.done ? (mode ? BubuJump: DuduJump) : (mode ? BubuTask: DuduTask)}
                            alt={todo.done ? "Done" : "Todo"}
                            style={{ width: "43px", height: "43px", marginRight: "10px" }}
                        />
                        <span
                            onClick={() => toggleTodo(index)}
                            style={{
                                textDecoration: todo.done ? "line-through" : "none",
                                color: todo.done ? "#888" : (darkMode ? "#fff" : "#000"),
                            }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(index)} style={{ marginLeft: "1em" }}>
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
