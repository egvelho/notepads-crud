import { NotepadsList } from "./notepads-list";
import { AuthChecker } from "./auth-checker";

export const instant = false;

export default function Home() {
  return (
    <AuthChecker>
      <NotepadsList />
    </AuthChecker>
  );
}
