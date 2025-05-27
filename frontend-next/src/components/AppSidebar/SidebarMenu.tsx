"use client";
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { useAppStore } from "@/store";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/student/",
        // icon: Home,
        roles: ["student"],
    },

    {
        title: "My Results",
        url: "/student/my-results",
        // icon: Home,
        roles: ["student"],
    },
    {
        title: "Dashboard",
        url: "/teacher/",
        // icon: Inbox,
        roles: ["teacher", "controller"],
    },
    {
        title: "Exams",
        url: "/teacher/exams",
        // icon: Inbox,
        roles: ["teacher", "controller"],
    },
    {
        title: "Add Exams",
        url: "/teacher/exams/add",
        roles: ["controller", "teacher"],
    },
    {
        title: "Results",
        url: "/teacher/results",
        // icon: Inbox,
        roles: ["controller","teacher"],
    },
    {
        title: "All Students",
        url: "/teacher/students",
        // icon: Inbox,
        roles: ["controller"],
    },
    {
        title: "All Subjects",
        url: "/teacher/subjects",
        // icon: Inbox,
        roles: ["controller"],
    },
    {
        title: "All Teachers",
        url: "/teacher/teachers",
        // icon: Inbox,
        roles: ["controller"],
    },
    {
        title: "Add Students",
        url: "/teacher/students/add",
        // icon: Inbox,
        roles: ["controller"],
    },
    {
        title: "Add Subjects",
        url: "/teacher/subjects/add",
        // icon: Inbox,
        roles: ["controller"],
    },
    {
        title: "Add Teachers",
        url: "/teacher/teachers/add",
        // icon: Inbox,
        roles: ["controller"],
    },
];

const SidebarMenuLinks = () => {
    // const userRole = "teacher";
    const user = useAppStore((state) => state.user);
    const userRole = user?.role || "guest"; // Default to 'guest' if no user or role is found
    return (
        <SidebarMenu>
            {items
                .filter((item) => item.roles.includes(userRole))
                .map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                                {/* <item.icon /> */}
                                <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
        </SidebarMenu>
    );
};

export default SidebarMenuLinks;
