import { CreateNotepadForm } from "./create-notepad-form";
import { NotepadsList } from "./notepads-list";

export default function Home() {
  return (
    <div className="flex flex-row">
      <div>
        <CreateNotepadForm />
      </div>
      <div className="flex-1">
        <NotepadsList />
      </div>
    </div>
  );
}
