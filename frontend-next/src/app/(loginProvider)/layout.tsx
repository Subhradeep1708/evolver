"use client";
import { AppProvider } from "@/context/AppContext";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <AppProvider>{children}</AppProvider>;
};

export default AuthLayout;