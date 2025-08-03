"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddPatchNoteForm = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/patch-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    setText("");
    router.refresh(); // re-fetch page data from server and re-render
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-x-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter patch note..."
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-[#1e9ffe] text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </form>
  );
};

export default AddPatchNoteForm;
