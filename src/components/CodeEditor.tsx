"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import FileManager from "./FileManager";

// const files = {
//   "script.js": {
//     name: "script.js",
//     language: "javascript",
//     value: "console.log('Hello World')",
//   },
//   "style.css": {
//     name: "style.css",
//     language: "css",
//     value: "h1 {color: blue;}",
//   },
//   "index.html": {
//     name: "index.html",
//     language: "html",
//     value: "<h1>Hello</h1>",
//   },
// };

function CodeEditor() {
  const [file, setFile] = useState({});
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    const fetchFiles = await fetch("http://localhost:3333/file-structure");
    const res = await fetchFiles.json();
    setFiles(res);
    setFile(res[0]);
  };

  useEffect(() => {
    getFiles();
  }, []);
  return (
    <>
      <div className="flex">
        <div className="flex flex-col border-2 border-black mr-4 ml-2">
          <FileManager files={files} setFile={setFile} filee={file} />
        </div>

        <Editor
          height="60vh"
          width="60vh"
          theme="vs-dark"
          path={file.name}
          defaultLanguage={file.lang}
          defaultValue={file.content}
        />
        <iframe src=""></iframe>
      </div>
    </>
  );
}

export default CodeEditor;
