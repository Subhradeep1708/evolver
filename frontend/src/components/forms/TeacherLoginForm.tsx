"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import axios from "axios";
import apiRoutes from "@/lib/routes";
import { useAppStore } from "@/store";

const formSchema = z.object({
    email: z.string().email().min(5),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export function TeacherLoginForm() {
   const setUser = useAppStore((state) => state.setUser);
    const router = useRouter();
 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

 async   function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          const response=await axios.post(`${apiRoutes.teacherLogin}`,values,{ withCredentials: true,});
           if (response.status === 200) {
                const data = response.data.data;
                console.log("Login successful", data);
                setUser({
                    userId: data.id,
                    role: data.role,
                    isLoggedIn: true,
                });
                 router.push("/teacher");
            } else {
                console.error("Login failed", response);
            }
       } catch (error) {
        console.log(error)
       }
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-lg mx-auto  p-6"
                >
                    <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
                        Log in as Teacher
                    </h1>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="harrypotter@hogwarts.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    );
}
