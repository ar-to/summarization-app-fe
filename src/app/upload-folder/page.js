"use client"
import { useState, useRef } from "react"
import Link from "next/link"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const fileInputRef = useRef(null)
  // folders
  const [files, setFiles] = useState([])

  const onFilesChange = (event) => {
    setFiles(event.target.files)
  }

  const handleUploadFolder = () => {
    const fileList = files
    Array.from(fileList).forEach((fileTemp) => {
      const reader = new FileReader()

      reader.onload = (event) => {
        const content = event.target.result
        // Process the file content
        // important to check for .txt custom as via html attribute is not supported
        if (fileTemp.name.endsWith(".txt")) {
          sendToAPI({
            name: fileTemp.name,
            path: "/" + fileTemp.webkitRelativePath,
            rawText: content
          })
        }
      }

      reader.onerror = (event) => {
        console.error(
          `Error reading file ${fileTemp.name}:`,
          event.target.error
        )
      }

      // Read the file as text
      reader.readAsText(fileTemp)
    })
  }

  function sendToAPI(fileData) {
    fetch("/api/records/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fileData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText)
        }
        return response.json()
      })
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message || "Unknown error occurred")
        }
        setIsUploaded(true)
        return data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleClear() {
    fileInputRef.current.value = null // Clear file input
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#32324d]">
      <div className="p-8 rounded shadow-md w-full max-w-md mb-6 border border-gray-600 bg-[#32324d]">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Upload TxT
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-200"
            >
              Upload Folder
            </label>
            <input
              id="file"
              type="file"
              name="files"
              accept=".txt" //does not seem to work with webkitdirectory
              onChange={onFilesChange}
              ref={fileInputRef}
              className="border border-gray-500 text-white rounded p-2 mt-1 w-full bg-gray-700"
              required
              webkitdirectory="true"
              multiple
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleUploadFolder}
              className="text-white px-4 py-2 rounded hover:opacity-90 bg-[#4945ff] disabled:bg-gray-500"
              disabled={!files || isUploaded || isLoading}
            >
              Upload Folder
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
            >
              Clear
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-200 mt-2">
              upload shows total available but further filter for .txt is
              applied on upload
            </p>
          </div>
        </form>

        {isLoading && <p className="text-yellow-300 mt-4">Uploading...</p>}
      </div>
      <div className="w-full max-w-md text-center">
        <Link
          href="/records"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500 transition-colors inline-block mx-2"
        >
          View Records
        </Link>
      </div>
    </div>
  )
}
