"use client";

import React, { useState } from "react";
import { generateNewApiKeyAction } from "@/lib/actions/api-dev";

export default function AdminAPIDevClient() {
  const [keyName, setKeyName] = useState("WedyPlan Mobile App Key");

  const handleGenerateKey = async () => {
    const res = await generateNewApiKeyAction({
      keyName,
      scopes: ["read", "write"],
    });

    if (res.success) {
      alert("✨ " + res.message + " - Yeni Key: " + res.newApiKey);
    }
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">API Dev Portal</h1>
      <button
        onClick={handleGenerateKey}
        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
      >
        Yeni API Key Üret
      </button>
    </div>
  );
}