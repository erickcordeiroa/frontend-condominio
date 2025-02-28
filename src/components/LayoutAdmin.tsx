import { Navigate, Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import BreadcrumbProvider from "@/context/BreadcrumbContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { ChevronDownIcon } from "lucide-react";

export default function LayoutAdmin() {
  const { logout, userData } = useAuth();
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { label: "Admin", href: "#" },
    { label: "Propriedades", href: "/admin/properties" },
    { label: "Listar", href: "/admin/properties" },
  ]);

  const user = userData();

  const getUserInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : `${names[0][0]}`.toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error("Erro ao fazer logout. Tente novamente.");
    }
  };

  const data = {
    navMain: [
      {
        title: "Propriedades",
        url: "/admin/properties",
      },
      {
        title: "Frações",
        url: "/admin/fractions",
      },
    ],
  };

  return (
    <>
      {user ? (
        <SidebarProvider>
          <AppSidebar menu={data} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbProvider items={breadcrumbItems} />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                      {getUserInitials(user.name)}
                    </div>
                    <span className="font-medium">{user.name}</span>

                    <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 border border-gray-200 rounded-lg shadow-sm"
                >
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4">
              <Outlet context={{ setBreadcrumbItems }} />
            </div>

            <footer className="px-6 py-4 text-center text-sm">
              © {new Date().getFullYear()} Edifício Internacional. Todos os
              direitos reservados.
            </footer>
          </SidebarInset>
        </SidebarProvider>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}
