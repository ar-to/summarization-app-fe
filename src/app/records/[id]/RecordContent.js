"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"

export default function RecordContent({ id }) {
  const [record, setRecord] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [summary, setSummary] = useState("")
  const [recordDeleted, setRecordDeleted] = useState(false)
  // for prompt override
  const [promptOverride, setPromptOverride] = useState("")

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/records?filters[documentId][$eq]=${id}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch record")
        }
        const data = await response.json()
        if (data.data && data.data.length > 0) {
          setRecord(data.data[0])
        } else {
          throw new Error("Record not found")
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Fetch error:", error)
        setError(error.message)
        setIsLoading(false)
      }
    }

    fetchRecord()
  }, [id])

  function handlePromptOverrideChange(event) {
    setPromptOverride(event.target.value)
  }

  async function handleShowSummary() {
    setIsLoading(true)

    sendToAPI({
      method: "PUT",
      documentId: record.documentId,
      text: record.rawText
    })
  }

  async function handleDelete() {
    setIsLoading(true)

    sendToAPI({
      method: "DELETE",
      documentId: record.documentId
    })
  }

  function sendToAPI({ method, documentId, text }) {
    fetch("/api/records/", {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ documentId, text, promptOverride })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText)
        }
        return response.json()
      })
      .then((data) => {
        if (data.success) {
          if (data.deleted) {
            setRecord(null)
            setRecordDeleted(true)
          }
          setSummary(data.Summary)
        } else {
          throw new Error(data.message || "Unknown error occurred")
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (recordDeleted) return <div>Record deleted</div>
  if (!record) return <div>Record not found</div>

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{record.name}</h1>
      <div>
        <label
          htmlFor="sentence"
          className="block text-sm font-medium text-gray-200"
        >
          Override Prompt (Limit: 100 characters)
        </label>
        <p className="text-sm text-gray-400 mb-2">
          leave blank to default to a sentence summary
        </p>
        <input
          id="sentence"
          type="text"
          placeholder="Enter Sentence"
          maxLength={100}
          className="border border-gray-500 rounded p-2 mt-1 w-full text-white bg-gray-700"
          onChange={handlePromptOverrideChange}
          disabled={record.summarizedText || summary || isLoading}
        />
      </div>
      <div className="flex justify-between items-center my-2">
        <button
          type="button"
          onClick={handleShowSummary}
          className="text-white px-4 py-2 rounded hover:opacity-90 bg-[#4945ff] disabled:bg-gray-500"
          disabled={record.summarizedText || summary || isLoading}
        >
          Get Summary
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Delete Record
        </button>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Summarized Text</h2>
        <ReactMarkdown className="prose prose-invert max-w-none">
          {record.summarizedText || summary}
        </ReactMarkdown>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Raw Text</h2>
        <ReactMarkdown className="prose prose-invert max-w-none">
          {record.rawText}
        </ReactMarkdown>
      </div>
    </>
  )
}
