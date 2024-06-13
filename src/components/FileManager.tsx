const FileManager = ({ files, filee, setFile }) => {
  return (
    <>
      {files.map((file: any) => {
        return (
          <>
            <button
              className="border-b-2 border-black"
              disabled={file.name === filee.name}
              onClick={() => setFile(file)}>
              {file.name}
            </button>
          </>
        );
      })}
    </>
  );
};

export default FileManager;

// const renderFileStructure = (files) => {
//   return (
//     <ul>
//       {files.map((file) => (
//         <li
//           key={file.name}
//           onClick={() => file.type === "file" && onSelectFile(file)}>
//           {file.name} {file.type === "file" && `(${file.extension})`}
//           {file.type === "folder" && renderFileStructure(file.children)}
//         </li>
//       ))}
//     </ul>
//   );
// };

// return <div>{renderFileStructure(structure)}</div>;
