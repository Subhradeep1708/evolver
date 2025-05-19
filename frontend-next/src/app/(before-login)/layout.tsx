import NavBar from "@/components/NavBar";
import React from "react";

function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full">
           <div className="w-full h-[8vh] my-8 rounded-full flex justify-evenly items-center ">
            <NavBar/>
           </div>
            {children}
        </div>
    );
}

export default layout;
