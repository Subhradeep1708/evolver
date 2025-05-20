import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const AfterLoginLayout = ({ children }: { children: ReactNode }) => {
    return (
        <SidebarProvider open={true}>
            <AppSidebar />
            <main>
                {/* <SidebarTrigger /> */}
                {children}
            </main>
        </SidebarProvider>
    );
};

export default AfterLoginLayout;
