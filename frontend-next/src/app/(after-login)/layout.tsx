import { AppSidebar } from "@/components/AppSidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const AfterLoginLayout = ({ children }: { children: ReactNode }) => {
    return (
        <SidebarProvider open={true}>
            <AppSidebar />
            <main className="w-full">
                {/* <SidebarTrigger /> */}
                {children}
            </main>
        </SidebarProvider>
    );
};

export default AfterLoginLayout;
