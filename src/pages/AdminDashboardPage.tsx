import type { FooterProps } from "../types/types.ts";
import { useEffect } from "react";
import { AdminDashboardTable } from "../components/AdminDashboardTable.tsx";


const AdminDashboardPage = ({footer}: FooterProps) => {

  useEffect(() => {
    document.title = "myReserva | Dashboard";
  }, []);

  return (
    <>
      <main className="h-[82vh] w-full flex flex-col">
        <AdminDashboardTable />
      </main>

      {footer}
    </>

  )
}

export default AdminDashboardPage;