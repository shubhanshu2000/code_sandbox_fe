"use client";

import Editor from "@monaco-editor/react";
import { emmetCSS, emmetHTML, emmetJSX } from "emmet-monaco-es";
import { useEffect, useRef, useState } from "react";
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
  const disposeEmmetHTMLRef = useRef();
  const disposeEmmetCSSRef = useRef();
  const disposeEmmetJSRef = useRef();
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleEditorWillMount = (monaco) => {
    // emmetHTML(monaco, ['html']);
    disposeEmmetHTMLRef.current = emmetHTML(monaco);
    disposeEmmetHTMLRef.current = emmetCSS(monaco);
    disposeEmmetJSRef.current = emmetJSX(monaco);
  };

  useEffect(() => {
    return () => {
      disposeEmmetHTMLRef.current ? disposeEmmetHTMLRef.current() : null;
      disposeEmmetCSSRef.current ? disposeEmmetCSSRef.current() : null;
      disposeEmmetJSRef.current ? disposeEmmetJSRef.current() : null;
    };
  }, []);

  const getFiles = async () => {
    const fetchFiles = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/file-structure`
    );
    const res = await fetchFiles.json();
    setFiles(res);
    setFile(res[0]);
  };
  const updateFileContent = async (filePath, content) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update-file`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath, content }),
    });
  };
  const handleCodeChange = async () => {
    let code = editorRef.current.getValue();
    if (file.name) {
      file.content = code;
      await updateFileContent(file.name, file.content);
      // alert("File saved successfully!");
    }
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
          beforeMount={handleEditorWillMount}
          path={file.name}
          defaultLanguage={file.lang}
          defaultValue={file.content}
          onMount={handleEditorDidMount}
          onChange={handleCodeChange}
        />
        <iframe src=""></iframe>
      </div>
    </>
  );
}

export default CodeEditor;
