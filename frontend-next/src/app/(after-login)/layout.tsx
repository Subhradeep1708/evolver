"use client";
import { AppSidebar } from "@/components/AppSidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppProvider } from "@/context/AppContext";
import { ReactNode } from "react";

const AfterLoginLayout = ({ children }: { children: ReactNode }) => {
    return (
        <AppProvider>
            <SidebarProvider open={true}>
                <AppSidebar />
                <main className="w-full">
                    {/* <SidebarTrigger /> */}
                    {children}
                </main>
            </SidebarProvider>
        </AppProvider>
    );
};

export default AfterLoginLayout;
