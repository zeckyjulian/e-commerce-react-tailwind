import { Sidebar } from "../../components/componentsadmin/Sidebar";
import { Dashboard } from "./Dashboard";

export default function HomeAdmin() {
  return (
    <main className="bg-stone-200 grid gap-4 p-4 grid-cols-[220px_1fr]">
        <Sidebar/>
        <Dashboard/>
    </main>
  )
}
