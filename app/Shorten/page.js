"use client"

import React, { useState } from "react";
import Link from "next/link";

const Shorten = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!url || !shortUrl) {
      alert("Please enter both URL and short URL text");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shorturl: shortUrl }),
      });

      const result = await response.json();

      if (result.error) {
        alert(`Error: ${result.error}`);
      } else {
        const host = process.env.NEXT_PUBLIC_HOST || window.location.origin;
        const generatedLink = `${host}/${shortUrl}`;
        setGenerated(generatedLink);
        alert(result.message || "Short URL generated!");
      }

      setUrl("");
      setShortUrl("");
    } catch (err) {
      console.error(err);
      alert("Failed to generate URL. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg">
      <h1 className="font-extrabold text-2xl p-2 text-center">
        Generate your short URLs
      </h1>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={url}
          placeholder="Enter your URL here"
          onChange={(e) => setUrl(e.target.value)}
          className="border-2 border-gray-300 bg-white rounded-2xl text-center p-2 w-full"
        />
        <input
          type="text"
          value={shortUrl}
          placeholder="Enter your preferred short URL text"
          onChange={(e) => setShortUrl(e.target.value)}
          className="border-2 bg-white rounded-2xl text-center border-gray-300 p-2 w-full"
        />
        <button
          onClick={generate}
          disabled={loading}
          className="bg-purple-900 rounded-lg shadow-lg p-3 font-bold text-white mt-3 hover:bg-purple-800 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Shorten"}
        </button>
      </div>

      {generated && (
        <div className="mt-5">
          <span className="font-semibold">YOUR LINK: </span>
          <code>
            <Link
              href={generated}
              target="_blank"
              className="text-blue-500 underline break-all"
            >
              {generated}
            </Link>
          </code>
        </div>
      )}
    </div>
  );
};

export default Shorten;
