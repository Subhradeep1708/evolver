"use client";
import React, { useEffect, useState } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "./ui/navigation-menu";
import { useAppStore } from "@/store";
import axios from "axios";
import apiRoutes from "@/lib/routes";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const LoggedInNavBar = () => {
    const user = useAppStore((state) => state.user);
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        const getUserName = async () => {
            try {
                const response = await axios.get(
                    `${apiRoutes.getUserName}/${user.userId}`
                );
                if (response.status === 200) {
                    setUserName(response.data.data.fullName || "GUEST");
                    setUserEmail(response.data.data.email || "N/A");
                }
            } catch (error) {
                console.error("Failed to fetch user name:", error);
            }
        };
        getUserName();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${apiRoutes.logout}/${user.userId}`,
                {},
                { withCredentials: true }
            );
            if (response.status === 200) {
                console.log("Logged out successfully");
                router.push("/");
            }
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };
    return (
        <div className="w-full bg-blue-50">
            <NavigationMenu className="w-full shadow-md p-2 max-w-screen">
                <NavigationMenuList className="w-full gap-4 justify-between">
                    {/* <NavigationMenuItem>{user.userId}</NavigationMenuItem> */}
                    <NavigationMenuItem className="">
                        <span className="font-bold">
                            {userName && <>{userName}</>}{" "}
                        </span>
                        ({userEmail && <>{userEmail}</>})
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Button onClick={handleLogout}>Log Out</Button>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default LoggedInNavBar;
