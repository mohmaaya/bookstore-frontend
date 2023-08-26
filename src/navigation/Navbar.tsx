import React from "react";
import { Link } from "react-router-dom";

interface CustomLinkProps {
    to: string;
    children: React.ReactNode;
}

function CustomLink({ to, children, ...props }: CustomLinkProps) {
    return (
        <li>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}

export default function Navbar() {
    return (
        <>
            <CustomLink to="/books/allbooks">All Books</CustomLink>
            <CustomLink to="/books/paginatedbooks">Paginated Books</CustomLink>
        </>
    );
}
