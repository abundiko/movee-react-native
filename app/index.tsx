import { TStatusBar } from "@/components/Themed";
import Welcome from "@/components/Welcome";
import Init from "./Init";


export default function Index() {

  return (
    <Init>
      <TStatusBar />
      <Welcome />
    </Init>
  );
}
