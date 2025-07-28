import "./App.css";
import { useState, useEffect, useRef } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { Header } from "./components/Header.jsx";
import { Form } from "./components/Form.jsx";
import { Tasks } from "./components/Tasks.jsx";
import { DeletePopup } from "./components/DeletePopup.jsx";


function App() {
  const [firstLoad, setFirstLoad] = useState(true);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // true for light mode, false for dark mode
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  // Prevent right-click context menu
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    window.addEventListener('contextmenu', preventDefault);
    return () => window.removeEventListener('contextmenu', preventDefault);
  }, []);

    // Load dark mode from file on first render
    useEffect(() => {
        async function loadDarkMode() {
            setFirstLoad(false);
            try {
                const exists = await invoke("file_exists", { filename: "darkMode.json" });
                if (exists) {
                    const fileData = await invoke("read_data_from_file", { filename: "darkMode.json" });
                    const parsed = JSON.parse(fileData);
                    setDarkMode(parsed.darkMode);
                }
            } catch (err) {
                console.error("Failed to load dark mode:", err);
            }
        }
        loadDarkMode();
    }, []);

    // Save dark mode whenever it changes
    useEffect(() => {
        async function saveDarkMode() {
            try {
                await invoke("save_data_to_file", {
                    filename: "darkMode.json",
                    data: JSON.stringify({ "darkMode": darkMode }),
                });
            } catch (err) {
                console.error("Failed to save dark mode:", err);
            }
        }
        if (!firstLoad) saveDarkMode();
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

  // Load todos from file on first render
  useEffect(() => {
    async function load() {
      setFirstLoad(false);
      try {
        const exists = await invoke("file_exists", { filename: "todos.json" });
        if (exists) {
          const fileData = await invoke("read_data_from_file", { filename: "todos.json" });
          const parsed = JSON.parse(fileData);
          setTodos(parsed);
        }
      } catch (err) {
        console.error("Failed to load todos:", err);
      }
    }
    load();
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    async function save() {
      try {
        await invoke("save_data_to_file", {
          filename: "todos.json",
          data: JSON.stringify(todos),
        });
      } catch (err) {
        console.error("Failed to save todos:", err);
      }
    }
    if (!firstLoad) save();
  }, [todos]);

  // Load mode from file on first render
  useEffect(() => {
    setFirstLoad(false);
    async function loadMode() {
      try {
        const exists = await invoke("file_exists", { filename: "mode.json" });
        if (exists) {
          const fileData = await invoke("read_data_from_file", { filename: "mode.json" });
          const parsed = JSON.parse(fileData);
          setMode(parsed.mode);
        }
      } catch (err) {
        console.error("Failed to load mode:", err);
      }
    }
    loadMode();
  }, []);

  // Save mode whenever it changes
  useEffect(() => {
    async function saveMode() {
      try {
        await invoke("save_data_to_file", {
          filename: "mode.json",
          data: JSON.stringify({ "mode": mode }),
        });
      } catch (err) {
        console.error("Failed to save mode:", err);
      }
    }
    if (!firstLoad) saveMode();
  }, [mode]);

  const toggleMode = () => {
    setMode(!mode);
  };

  function addTodo() {
    if (input.trim()) {
      setTodos([...todos, { text: input, done: false }]);
      setInput("");
    }
  };

  function toggleTodo(index) {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updated);
  };

  function deleteTodo(index) {
    setTodoToDelete(index);
    setShowDeletePopup(true);
  };

  function confirmDelete(confirmed) {
    if (confirmed) {
      const updated = todos.filter((_, i) => i !== todoToDelete);
      console.log("list length: " + updated.length)
      setTodos(updated);
    }
    setShowDeletePopup(false);
    setTodoToDelete(null);
  };

  // Handle Enter key to add todo
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && input.trim()) {
        addTodo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, todos]);

    return (
        <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
            <Header 
                mode={mode} 
                darkMode={darkMode}
                onToggleMode={toggleMode}
                onToggleDarkMode={toggleDarkMode}
            />
            <Form value={input} onChange={setInput} onClick={addTodo} mode={mode} darkMode={darkMode} />
            <Tasks todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} mode={mode} darkMode={darkMode} />
            {showDeletePopup && <DeletePopup onConfirm={confirmDelete} mode={mode} darkMode={darkMode} />}
        </div>
    );
}

export default App;