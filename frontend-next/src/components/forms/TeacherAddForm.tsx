"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import apiRoutes from "@/lib/routes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TeacherFormTypes } from "@/types/form-types";

//dummy subjects data
const teacherFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    role: z.enum(["teacher", "controller"]),
    subjects: z.array(z.string()).optional(),
});

type TeacherFormValues = z.infer<typeof teacherFormSchema>;
type Subject = {
    id: string ;
    name: string;
    description: string;
    teachers: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        isController: boolean;
    }[];
};
export function TeacherAddForm({teacher}:{teacher?: TeacherFormTypes | null}) {
    const [subjects,setSubjects] =useState<Subject[]>([])
    const form = useForm<TeacherFormValues>({
        resolver: zodResolver(teacherFormSchema),
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            role: "teacher",
            subjects: [],
        },
    });
    const router = useRouter();
    async function onSubmit(values: TeacherFormValues) {
        const response = await axios.post(`${apiRoutes.teacherRegister}`, {
            ...values,
            password: "123456",
            isController: values.role === "controller" ? true : false,
        });
        console.log(response);
        if (response.status === 201) {
            toast.success("Teacher added successfully");
            form.reset();
            router.push("/teacher/teachers");
        } else {
            toast.error("Failed to add teacher");
        }
    }
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await axios.get(apiRoutes.getSubject);
                setSubjects(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSubjects();
    }, []);
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-3xl mx-auto p-6"
            >
                <h1 className="text-3xl font-semibold text-center border-b pb-2">
                    Add Teacher
                </h1>

                <p className="text-sm text-muted-foreground text-center">
                    Provide the teacher details below.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="First Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="middleName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Middle Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Middle Name (optional)"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="teacher">
                                        Teacher
                                    </SelectItem>
                                    <SelectItem value="controller">
                                        Controller
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {subjects.map((subject) => (
                        <FormField
                            key={subject.id}
                            control={form.control}
                            name="subjects"
                            render={({ field }) => (
                                <FormItem
                                    key={subject.id}
                                    className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(
                                                String(subject.id)
                                            )}
                                            onCheckedChange={(checked) => {
                                                const id = String(subject.id);
                                                if (checked) {
                                                    field.onChange([
                                                        ...(field.value || []),
                                                        id,
                                                    ]);
                                                } else {
                                                    field.onChange(
                                                        (
                                                            field.value || []
                                                        ).filter(
                                                            (val) => val !== id
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {subject.name}
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                    ))}
                </div>

                <Button type="submit" className="w-full">
                    Add
                </Button>
            </form>
        </Form>
    );
}
