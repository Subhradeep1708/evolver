import Link from "next/link";

const links = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "FAQ", url: "/faq" },
];
const NavBar = () => {
    return (
        <div className="absolute z-10 w-full h-[8vh] max-w-sm bg-[#D6E6FE] my-8 rounded-full flex justify-evenly items-center ">
            {links.map((link) => (
                <Link
                    href={link.url}
                    key={link.name}
                    className="basis-1/4 px-4 py-2 text-[#102353] font-bold text-lg text-center"
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
};

export default NavBar;
