use std::fs;
use dirs::data_dir;

#[tauri::command]
fn save_data_to_file(filename: String, data: String) -> Result<(), String> {
    let mut path = data_dir().ok_or("Failed to get user data dir")?;
    path.push("DuBuList"); // optional app-specific folder
    fs::create_dir_all(&path).map_err(|e| e.to_string())?;
    path.push(filename);

    fs::write(path, data).map_err(|e| e.to_string())
}

#[tauri::command]
fn read_data_from_file(filename: String) -> Result<String, String> {
    let mut path = data_dir().ok_or("Failed to get user data dir")?;
    path.push("DuBuList");
    path.push(filename);

    fs::read_to_string(path).map_err(|e| e.to_string())
}

#[tauri::command]
fn file_exists(filename: String) -> Result<bool, String> {
    let mut path = data_dir().ok_or("Failed to get user data dir")?;
    path.push("DuBuList");
    path.push(filename);

    Ok(path.exists())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![file_exists, save_data_to_file, read_data_from_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
