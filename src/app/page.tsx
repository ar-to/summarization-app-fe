import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#32324d] py-8 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Welcome
        </h1>
        <Link
          href="/records"
          className="bg-[#4945ff] text-white px-4 py-2 rounded mb-4 inline-block mx-2"
        >
          Enter Records Page
        </Link>
      </div>
    </div>
  )
}