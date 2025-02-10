import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import BreadcrumbProvider from "@/context/BreadcrumbContext";
import { useState } from "react";
export default function LayoutAdmin() {

  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { label: 'Admin', href: '#' },
      { label: 'Propriedades', href: '/admin/property/list' },
      { label: 'Listar', href: '/admin/property/list' },
  ]);

  const data = {
    navMain: [
      {
        title: "Propriedades",
        url: "/admin/property/list",
      },
      {
        title: "Usuários",
        url: "#",
      }
    ],
  };

  return (
    <SidebarProvider>
      <AppSidebar menu={data} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbProvider items={breadcrumbItems} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet context={{ setBreadcrumbItems }} />
        </div>
        <footer className="px-6 py-4 text-center text-sm">
      © {new Date().getFullYear()} Edifício Internacional. Todos os direitos reservados.
    </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
