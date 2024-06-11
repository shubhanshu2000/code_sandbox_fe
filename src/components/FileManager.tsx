const FileManager = ({ files, filee, setFile }) => {
  return (
    <>
      {files.map((file) => {
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
