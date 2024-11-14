"use client"
import { useState, useRef } from "react"
import Link from "next/link"

export default function Home() {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const fileInputRef = useRef(null)

  function onFileChange(event) {
    setFile(event.target.files[0])
  }

  /**
   * Handles the Show Summary button click event
   *
   * Reads the file content and sends it to the API
   *
   * Supports .txt
   */
  async function handleShowSummaryTxt() {
    if (!file) {
      return
    }
    setIsLoading(true)
    const fileReader = new FileReader()
    fileReader.onload = async (event) => {
      const text = event.target.result
      sendToAPI({
        name: file.name,
        path: "",
        rawText: text
      })
    }
    // useful for .txt or .csv files
    fileReader.readAsText(file)
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
    setFile(null)
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
              Upload TxT
            </label>
            <input
              id="file"
              type="file"
              name="file"
              accept=".txt"
              onChange={onFileChange}
              ref={fileInputRef}
              className="border border-gray-500 text-white rounded p-2 mt-1 w-full bg-gray-700"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleShowSummaryTxt}
              className="text-white px-4 py-2 rounded hover:opacity-90 bg-[#4945ff] disabled:bg-gray-500"
              disabled={!file || isUploaded || isLoading}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
            >
              Clear
            </button>
          </div>
        </form>

        {isLoading && <p className="text-yellow-300 mt-4">Loading...</p>}
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
