import PatchNote from "@/components/custom/patchNote";
import prisma from "@/lib/prisma";
import AddPatchNoteDialog from "@/components/custom/addPatchNoteDialog";
import { currentUser } from "@/lib/auth";

const Page = async () => {
  // Fetch patch notes from the database
  const user = await currentUser();
  const patchnotes = await prisma.patchNote.findMany({
    orderBy: [
      { releaseDate: "desc" },
      { version: "desc" },
    ],
  });

  // Determine the last version
  const lastVersion = patchnotes[0]?.version || "v0.0.0";

  return (
    <div className="space-y-6 h-full p-6 md:p-10 mt-10"> 
      <h1 className="text-3xl md:text-5xl">Patch Notes</h1>
      {user && <AddPatchNoteDialog lastVersion={lastVersion} />}
      <div className="space-y-4">
      {patchnotes.map(note => (
        <PatchNote
          key={note.id}
          id={note.id}
          text={note.text}
          releaseDate={note.releaseDate}
          version={note.version}
          canDelete={!!user}
        />
      ))}

  </div>

    </div>
  );
};

export default Page;