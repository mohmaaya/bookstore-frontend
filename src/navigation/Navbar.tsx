import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

interface CustomLinkProps {
    to: string;
    children: React.ReactNode;
}

function CustomLink({ to, children, ...props }: CustomLinkProps) {

    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "bg-gray-600" : ""}>
            <Link
                to={to}
                className="block text-white hover:bg-gray-600 px-4 py-2 rounded transition duration-300"
                
                {...props}
            >
                {children}
            </Link>
        </li>
    );
}

export default function Navbar() {
    return (
        <nav className="bg-blue-500 fixed top-0 w-full z-10 py-2 px-2 rounded-lg">
            <div className="container mx-auto">
                <ul className="flex space-x-4">
                    <CustomLink to="/books/about">About</CustomLink>
                    <CustomLink to="/books/paginatedbooks">Paginated Books</CustomLink>
                    <CustomLink to="/books/addbook">Add Book</CustomLink>
                </ul>
            </div>
        </nav>
    );
}
