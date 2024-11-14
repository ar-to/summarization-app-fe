"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

export default function Records() {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/records`)
      if (!response.ok) {
        throw new Error("Failed to fetch records")
      }
      const data = await response.json()
      setRecords(data.data || [])
      setIsLoading(false)
    } catch (error) {
      console.error("Fetch error:", error)
      setError(error.message)
      setIsLoading(false)
    }
  }

  if (isLoading) return <div className="text-white text-center">Loading...</div>
  if (error) return <div className="text-white text-center">Error: {error}</div>

  return (
    <div className="min-h-screen bg-[#32324d] py-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Records (Files & Directories)
        </h1>
        <Link
          href="/upload-folder"
          className="bg-[#4945ff] text-white px-4 py-2 rounded mb-4 inline-block mx-2"
        >
          Upload Folder
        </Link>
        <Link
          href="/upload-file"
          className="bg-[#4945ff] text-white px-4 py-2 rounded mb-4 inline-block mx-2"
        >
          Upload File
        </Link>
        <Link
          href="/file-manager"
          className="bg-[#4945ff] text-white px-4 py-2 rounded mb-4 inline-block mx-2"
        >
          File Manager
        </Link>
        {records.length === 0 ? (
          <p>No records available.</p>
        ) : (
          <table className="min-w-full bg-gray-800 border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-600 px-4 py-2">ID</th>
                <th className="border border-gray-600 px-4 py-2">Name</th>
                <th className="border border-gray-600 px-4 py-2">Path</th>
                <th className="border border-gray-600 px-4 py-2">Raw Text</th>
                <th className="border border-gray-600 px-4 py-2">
                  Summarized Text
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 px-4 py-2">
                    {record.id}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {record.name}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {record.path}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    <ReactMarkdown className="prose prose-invert max-w-none">
                      {typeof record.rawText === "string"
                        ? record.rawText.slice(0, 100) + "..."
                        : "rawText not available"}
                    </ReactMarkdown>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    <ReactMarkdown className="prose prose-invert max-w-none">
                      {typeof record.summarizedText === "string"
                        ? record.summarizedText.slice(0, 100) + "..."
                        : "summarizedText not available"}
                    </ReactMarkdown>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    <Link
                      href={`/records/${record.documentId}`}
                      className="bg-[#4945ff] text-white px-4 py-2 rounded"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
