import { useState } from "react";
import { PanelShell } from "@/components/layout/PanelShell";
import { seedNotes } from "@/data/seed";
import type { Note } from "@/lib/types";

export function NotesPanel() {
  const [notes, setNotes] = useState<Note[]>(seedNotes);
  const [draft, setDraft] = useState("");

  function addNote() {
    if (!draft.trim()) return;
    const note: Note = {
      id: crypto.randomUUID(),
      text: draft.trim(),
      created_at: new Date().toISOString(),
    };
    setNotes([note, ...notes]);
    setDraft("");
  }

  function deleteNote(id: string) {
    setNotes(notes.filter((n) => n.id !== id));
  }

  return (
    <PanelShell title="Notes" icon="📝" count={notes.length}>
      <div className="flex flex-col h-full">
        <div className="p-2 border-b border-border">
          <div className="flex gap-1.5">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNote()}
              placeholder="Add a note..."
              className="flex-1 bg-bg-card border border-border rounded px-2 py-1.5 text-sm text-text placeholder:text-text-dim/50 font-mono text-[11px] outline-none focus:border-gold/50"
            />
            <button
              onClick={addNote}
              className="px-3 py-1.5 bg-gold/10 text-gold border border-gold/25 rounded font-mono text-[10px] font-bold hover:bg-gold/20 transition-colors"
            >
              ADD
            </button>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[280px]">
          {notes.map((note) => (
            <div
              key={note.id}
              className="px-3 py-2 border-b border-border group hover:bg-gold/[0.06] transition-colors"
            >
              <p className="text-sm text-text leading-snug">{note.text}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono text-[9px] text-text-dim">
                  {new Date(note.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="font-mono text-[9px] text-red opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
