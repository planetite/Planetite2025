"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const PatchNote = ({
  id,
  text,
  version,
  releaseDate,
  canDelete,
}: {
  id: number;
  text: string;
  version: string;
  releaseDate?: Date;
  canDelete?: boolean;
}) => {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);

  async function handleDelete() {
    await fetch(`/api/patch-note?id=${id}`, { method: "DELETE" });
    router.refresh();
    setOpenConfirm(false);
  }

  return (
    <Card className="relative">
      {canDelete && (
        <button onClick={()=>setOpenConfirm(true)} className="absolute top-6 right-6 text-red-500 cursor-pointer hover:text-red-700">
          <Trash2 size={18}/>
        </button>
      )}

      <CardHeader>
        <CardTitle>{version}</CardTitle>
        <CardDescription>        
          {releaseDate?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        </CardDescription>

      </CardHeader>
      <CardContent>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      
      </CardContent>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          <DialogTitle>
            Delete patch <b>{version}</b>?
          </DialogTitle>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PatchNote;
