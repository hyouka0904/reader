import os 
import sys 
import tkinter as tk
from tkinter import filedialog, messagebox

from ebooklib import epub
import ebooklib
from bs4 import BeautifulSoup

for _stream in (sys.stdout, sys.stderr):
    if hasattr(_stream, "reconfigure"):
        _stream.reconfigure(encoding="utf-8", errors="replace")

def open_epub()->str:
    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)

    file_path = filedialog.askopenfilename(
        title = "open epub file", 
        filetype = [("epub files", "*.epub"), ("Other files", "*.*")]
    )

    root.destroy()
    return file_path

def convert2txt(path:str)->str:
    result = []

    for item in epub.read_epub(path).get_items():
        if item.get_type() == ebooklib.ITEM_DOCUMENT:
            soup = BeautifulSoup(item.get_content(), "html.parser")
            text = soup.get_text(separator="\n")
            result.append(text)

    return "\n\n".join(result)

def main():
    path = open_epub()

    if not path:
        print("no path exists")
        return

    if not path.lower().endswith(".epub"):
        messagebox.showwarning("not epub file")
        return

    try:
        print(f"try to convert {path}")
        content = convert2txt(path)
    except Exception as e:
        messagebox.showerror("error", f"{e}")
        return

    output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "files")
    os.makedirs(output_dir, exist_ok = True)

    filename = os.path.splitext(os.path.basename(path))[0]
    output_path = os.path.join(output_dir, f"{filename}.txt")

    with open(output_path, "w", encoding = "utf-8") as f:
        f.write(content)

    print(f"success, write in : {output_path}")
    messagebox.showinfo("success", f"write in : {output_path}")

if __name__ == "__main__":
    main()
