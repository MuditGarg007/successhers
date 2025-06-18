"use client";

import { useState } from "react";

export default function Page() {
  const [requestDetails, setRequestDetails] = useState<string>("");
  const [responseData, setResponseData] = useState<string>("");

  async function handleShowRequest() {
    const url = "https://openrouter.ai/api/v1/auth/key";
    const headers = {
      Authorization: "Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_TOKEN}",
    };

    // Display the request details
    setRequestDetails(
      `GET ${url}\nHeaders:\n${Object.entries(headers)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")}`
    );

    // Actually send the request and display the response
    try {
      const response = await fetch(url, { method: "GET", headers });
      const data = await response.json();
      setResponseData(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponseData("Error fetching data.");
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={handleShowRequest}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Show Request Details
      </button>
      {requestDetails && (
        <pre className="mt-4 bg-black text-white p-2 rounded">
          {requestDetails}
        </pre>
      )}
      {responseData && (
        <pre className="mt-4 bg-gray-900 text-green-300 p-2 rounded">
          {responseData}
        </pre>
      )}
    </div>
  );
}