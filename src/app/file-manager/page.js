"use client";
import { useState } from "react";
import Link from "next/link";
import "./styles.css";
import { useEffect } from "react";

// sample data to help test file manager
// uncomment to test manually
// eslint-disable-next-line
const pathsTest = [
  {
    name: "test.txt",
    path: "", // supports empty path as a root orphan file
  },
  {
    //supports root file for orphan files outside of folders
    name: "test.txt",
    path: "/test.txt",
  },
  {
    name: "test0",
    path: "/",
    // isDirectory: true,
  },
  {
    name: "test",
    path: "/test",
    isDirectory: true,
  },
  {
    name: "test1.txt",
    path: "/Test",
  },
  {
    name: "test.txt",
    path: "/TestDirectory 3/test.txt",
  },
  {
    name: "sample-simple.pdf",
    path: "/TestDirectory 3/pdfs/sample-simple.pdf",
  },
  {
    name: "sample-simple2.pdf",
    path: "/TestDirectory 2/pdfs/sample-simple.pdf",
  },
];

const handleSummarize = () => {
  console.log("summarize clicked");
};

const handleUploadFolder = () => {
  console.log("upload folder clicked");
};

const handleUploadFile = () => {
  console.log("upload file clicked");
};

const handleDelete = () => {
  console.log("delete record clicked");
};

const Directory = ({ files }) => {
  const [isExpanded, toggleExpanded] = useState(false);

  if (files.type === "folder") {
    return (
      <div key={files.id} className="folder">
        <h2
          className="folder-title"
          onClick={() => toggleExpanded(!isExpanded)}
        >
          <span className="folder-icon">📁</span> {files.name}
          <span className="file-count">({files.items.length})</span>{" "}
          <button
            type="button"
            className="text-white px-2 py-1 rounded hover:opacity-90 bg-[#4945ff] mx-2 disabled:bg-gray-500"
            onClick={(e) => {
              // prevents the event from bubbling up the DOM tree and causing bugs between button clicks and folder clicks
              e.stopPropagation();
              handleSummarize();
            }}
            disabled={files.hasSummary}
          >
            Summarize
          </button>
          <button
            type="button"
            className="text-white px-2 py-1 rounded hover:opacity-90 bg-[#4945ff] mx-2"
            onClick={(e) => {
              e.stopPropagation();
              handleUploadFolder();
            }}
          >
            Upload Folder
          </button>
          <button
            type="button"
            className="text-white px-2 py-1 rounded hover:opacity-90 bg-[#4945ff] mx-2"
            onClick={(e) => {
              e.stopPropagation();
              handleUploadFile();
            }}
          >
            Upload File
          </button>
          {files.documentId !== "root" && (
            <Link
              href={`/records/${files.documentId}`}
              className="bg-[#4945ff] text-white px-4 py-2 rounded mb-4 inline-block mx-2"
            >
              View
            </Link>
          )}
        </h2>
        <br />
        {isExpanded &&
          files.items.map((item) => <Directory files={item} key={item.id} />)}
      </div>
    );
  }
  return (
    <>
      <h3 className="file-name">
        {files.name}
        <button
          type="button"
          className="text-white px-2 py-1 rounded hover:opacity-90 bg-[#4945ff] mx-2 disabled:bg-gray-500"
          onClick={(e) => {
            // prevents the event from bubbling up the DOM tree and causing bugs between button clicks and folder clicks
            e.stopPropagation();
            handleSummarize();
          }}
          disabled={files.hasSummary}
        >
          Summarize
        </button>
        <Link
          href={`/records/${files.documentId}`}
          className="bg-[#4945ff] text-white px-4 py-2 rounded mb-4 inline-block mx-2"
        >
          View
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Delete Record
        </button>
      </h3>
      <br />
    </>
  );
};

/**
 * Builds a tree structure from a list of paths
 * @param {*} paths 
 * @returns 
 */
const buildParsedPaths = (paths) => {
  const parsedPaths = {
    type: "folder",
    name: "root",
    id: "root",
    documentId: "root",
    hasSummary: false,
    items: [],
  };

  paths.forEach((path) => {
    // catches null paths avoiding errors
    let pathTemp = path.path;
    if (!pathTemp) {
      pathTemp = ""
    }
    const pathParts = pathTemp.split("/");
    // const pathParts = path.path.split("/");
    let currentFolder = parsedPaths;

    for (let i = 1; i < pathParts.length; i++) {
      const folderName = pathParts[i];

      // ensure that we don't create folders for file paths e.g /text.txt
      // if you expect it update it to remove the extension first
      if (folderName.includes(".")) {
        continue;
      }

      let folder = currentFolder.items.find(
        (item) => item.name === folderName && item.type === "folder"
      );

      if (!folder) {
        folder = {
          // supports paths e.g. / and /test
          name: folderName || path.name,
          type: "folder",
          id: path.id,
          // TODO: needs to be integrated into BE to get the documentId properly
          documentId: "folder",
          hasSummary: false,
          items: [],
        };
        currentFolder.items.push(folder);
      }

      currentFolder = folder;
    }

    if (path.isDirectory) {
      return;
    }

    if (!path.name.includes(".")) {
      return;
    }

    currentFolder.items.push({
      name: path.name,
      type: "file",
      id: path.id,
      documentId: path.documentId,
      hasSummary: !!path.summarizedText,
    });
  });

  return parsedPaths;
};

export default function Page() {
  const [files, setFiles] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line
  }, []);

  const handleRecordsParsing = (data) => {
    const paths = data.data || [];
    const parsedPaths = buildParsedPaths(paths);
    setFiles(parsedPaths);
  };

  const fetchRecords = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/records");
      if (!response.ok) {
        throw new Error("Failed to fetch records");
      }
      const data = await response.json();
      handleRecordsParsing(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-white text-center">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#32324d] py-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">File Manager</h1>
        <Link
          href="/records"
          className="bg-[#4945ff] text-white px-4 py-2 rounded mb-4 inline-block mx-2"
        >
          Back to Records
        </Link>
        <Directory files={files} />
      </div>
    </div>
  );
}
