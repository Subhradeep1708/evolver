"use client";
import { AppSidebar } from "@/components/AppSidebar/AppSidebar";
import LoggedInNavBar from "@/components/LoggedInNavBar";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { AppProvider } from "@/context/AppContext";
import { ReactNode } from "react";

const AfterLoginLayout = ({ children }: { children: ReactNode }) => {
    return (
        <SidebarProvider open={true}>
            <AppSidebar />
            <main className="w-full ">
                <LoggedInNavBar />
                {/* <SidebarTrigger /> */}
                {children}
            </main>
        </SidebarProvider>
    );
};

export default AfterLoginLayout;
