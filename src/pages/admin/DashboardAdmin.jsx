import { Sidebar } from "../../components/componentsadmin/sidebar/Sidebar";
import { Dashboard } from "../../components/componentsadmin/dashboard/Dashboard";

export default function DashboardAdmin() {
  return (
    <main className="bg-stone-200 grid gap-4 p-4 grid-cols-[220px_1fr]">
        <Sidebar/>
        <Dashboard/>
    </main>
  )
}
