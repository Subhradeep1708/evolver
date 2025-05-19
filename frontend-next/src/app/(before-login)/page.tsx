import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

// welcome to the home page

export default function HomePage() {
    return (
        <div className="relative flex flex-col min-h-screen">
            <Image
                src="/images/clouds.png"
                alt="clouds"
                className="absolute top-28 left-0 z-10 scale-110"
                height={200}
                width={300}
            />
            {/* <HomeNav /> */}
            <div className="flex flex-1 w-full h-screen justify-between px-24 py-8">
                <div className="flex flex-col p-20 w-[60%] relative space-y-12 items-start">
                    <div className="z-10 space-y-8">
                        <h1 className="text-6xl font-bold text-[#324667]">
                            Evolver
                        </h1>
                        <p className="text-xl max-w-sm text-[#324667]">
                            Welcome to the best online exam portal, test
                            yourself here. Get started by logging in.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Link
                            href="/auth/student"
                            className="inline-flex items-center gap-2 bg-[#D6E6FE] text-[#102353] px-6 py-3 text-lg rounded-lg hover:bg-[#c3dbfc] transition"
                        >
                            Login to continue
                            <FaArrowRight />
                        </Link>
                        <p className="text-sm text-[#102353]">
                            Are you a teacher?{" "}
                            <Link
                                href="/auth/teacher"
                                className="underline font-medium"
                            >
                                Log in here
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="w-[40%] flex items-center justify-center">
                    <Image
                        height={500}
                        width={500}
                        src="/images/image.png"
                        alt="welcome"
                    />
                </div>
            </div>
        </div>
    );
}
