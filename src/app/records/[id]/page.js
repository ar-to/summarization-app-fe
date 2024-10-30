import { Suspense } from "react";
import Link from "next/link";
import RecordContent from "./RecordContent";

export default async function RecordsPage({ params }) {
    // asynchronous access of `params.id`.
    const { id } = await params
  return (
    <div className="min-h-screen bg-[#32324d] py-8 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/records"
          className="bg-[#4945ff] text-white px-4 py-2 rounded mb-4 inline-block"
        >
          Back to Records
        </Link>

        <Suspense fallback={<div>Loading...</div>}>
          <RecordContent id={id} />
        </Suspense>
      </div>
    </div>
  );
}
