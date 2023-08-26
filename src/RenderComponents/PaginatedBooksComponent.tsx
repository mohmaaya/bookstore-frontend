import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getAllBooks } from "../api/books";
import { useNavigate } from "react-router-dom";
import BookComponent from "./BookComponent";
import { Cursor, PageParams, Books, Book } from "../types/types"
import ChangePageComponent from "./ChangePageComponent";


const PaginatedBooksComponent: React.FC = () => {

    const [books, setBooks] = useState<Books | null>(null);
    const [cursors, setCursors] = useState<Cursor | null>(null);
    const parameters = useRef<PageParams | null>(null); 
    const navigate = useNavigate();
    

    const getBooks = useQuery(
        {
            queryKey: ["findBooks"],
            queryFn: () => {

                navigate(`?cursor=${parameters.current?.cursor}&limit=${parameters.current?.limit}&direction=${parameters.current?.direction}`);
                return getAllBooks(parameters.current);
            },
            onSuccess: (data) => {

                const books: Books = {
                    books: data.books,

                };

                const newCursors: Cursor = {
                    currentCursor: data.cursor.currentCursor,
                    nextCursor: data.cursor.nextCursor,
                    previousCursor: data.cursor.previousCursor
                }

                parameters.current = {
                    cursor: data.cursor.currentCursor,
                    direction: data.direction,
                    limit: data.limit,
                    title: null,
                    first_publish_year: null,
                }

                setBooks(books);
                setCursors(newCursors);

            }
            
            
        }
    )
    
    const handleViewBookAction = (book: Book) => {
        
    }

    const handleDeleteBookAction = (id: number) => {
       
        
    }

    const handlePreviousPage = () => {
        parameters.current = {
            ...parameters.current!,
            direction: "previous",
            cursor: cursors?.previousCursor,
        };
      
        getBooks.refetch({ stale: true });
    }

    const handleNextPage = () => {
        parameters.current = {
            ...parameters.current!,
            direction: "next",
            cursor: cursors?.nextCursor,
        };
     
        getBooks.refetch({ stale: true });
       
       

    }


    return (
        <>
            <BookComponent booksData={books} onViewBookAction={handleViewBookAction} onDeleteBookAction={handleDeleteBookAction} />
            <ChangePageComponent cursors={cursors} onPreviousPage={handlePreviousPage} onNextPage={handleNextPage} />
        </>
    );
}   

export default PaginatedBooksComponent;