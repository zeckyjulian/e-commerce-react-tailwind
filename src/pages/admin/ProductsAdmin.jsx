import { Sidebar } from "../../components/componentsadmin/sidebar/Sidebar";
import { Products } from "../../components/componentsadmin/products/Products";

export default function ProductsAdmin() {
  return (
    <div className="bg-stone-200 min-h-screen flex">
      <Sidebar/>
      <main className="flex-1 p-4">
          <Products/>
      </main>
    </div>
  )
}
