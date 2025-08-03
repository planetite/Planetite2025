"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { format } from "date-fns";

interface Props {
  lastVersion: string;
}

function bumpVersion(v: string) {
  const parts = v.replace("v", "").split(".");
  let [major, minor, patch] = parts.map(Number);
  patch++;
  return `v${major}.${minor}.${patch}`;
}

const AddPatchNoteDialog = ({ lastVersion }: Props) => {
  const router = useRouter();
  const defaultVersion = bumpVersion(lastVersion || "v0.0.0");
  const [open, setOpen] = useState(false);

  const [version, setVersion] = useState(defaultVersion);
  const [text, setText] = useState("");
  const [releaseDate, setReleaseDate] = useState(format(new Date(), "yyyy-MM-dd"));

  async function handleSubmit() {
    await fetch("/api/patch-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ version, text, releaseDate }),
    });
    router.refresh();
    // reset & close the dialog
    setVersion(defaultVersion);
    setText("");
    setReleaseDate(format(new Date(), "yyyy-MM-dd"));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <button className="z-10 fixed bottom-6 right-6 bg-[#1e9ffe] text-white p-4 rounded-full shadow-lg hover:bg-blue-[#1e9ffe] transition">
          <Plus className="w-6 h-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>Add Patch Note</DialogTitle>

        <label className="text-sm font-medium">Version</label>
        <Input value={version} onChange={(e) => setVersion(e.target.value)} />
        <p className="text-xs text-muted-foreground">
          Format: <code>v&lt;major&gt;.&lt;minor&gt;.&lt;patch&gt;</code>
        </p>

        <label className="text-sm font-medium mt-4">Release Date</label>
        <Input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />

        <label className="text-sm font-medium mt-4">Text (Markdown)</label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="resize-y"
          placeholder="Write your patch note in markdown..."
        />

        <Button onClick={handleSubmit} className="mt-4">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatchNoteDialog;
