import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import BookComponent from "./BookComponent";
import ChangePageComponent from "./ChangePageComponent";
import FilterComponent from "./FilterComponent";
import { Cursor, PageParams, Books, Book } from "../types/types";
import { deleteBook, getAllBooks } from "../api/books";
import ViewBookComponent from "./ViewBookComponent";
import { AxiosError } from "axios";

const PaginatedBooksComponent: React.FC = () => {
    const [books, setBooks] = useState<Books | null>(null);
    const [cursors, setCursors] = useState<Cursor | null>(null);
    const [parameters, setParameters] = useState<PageParams>({});
    const [deletedBookId, setDeletedBookId] = useState<number>(0);
    const [shouldFetchData, setShouldFetchData] = useState<boolean>(true);
    const [viewBook, setViewBook] = useState<Boolean>(false);
    const [onBookDeleted, setOnBookDeleted] = useState<Boolean>(false);
    const [onBookNotFound, setOnBookNotFound] = useState<Boolean>(false);
    const [currentBook, setCurrentBook] = useState<Book>({
        id: 0,
        title: "",
        first_publish_year: 0,
        number_of_pages_median: 0,
        author_name: "",
        covers: {
            S: "",
            M: "",
            L: "",
        }
    });

    useEffect(() => {
        if (shouldFetchData) {
            fetchData();
        }
    }, [shouldFetchData]);

    const fetchData = async () => {
        try {
            const data = await getAllBooks(parameters);

            const booksData: Books = {
                books: data.books,
            };

            const newCursors: Cursor = {
                currentCursor: data.cursor.currentCursor,
                nextCursor: data.cursor.nextCursor,
                previousCursor: data.cursor.previousCursor,
            };

            setCursors(newCursors);
            setBooks(booksData);
            setShouldFetchData(false); 
        } catch (error) {
            console.log(error);
        }
    };


    const deleteBookMutation = useMutation(deleteBook, {
        onSuccess: (data) => {
            setOnBookDeleted(true);
            setOnBookNotFound(false);
            setTimeout(() => {
                setOnBookDeleted(false);
                setShouldFetchData(true);
            }, 1500);
          
        },
        onError: (error: AxiosError) => {
            
            if (error.response && error.response.status === 400) {
                setOnBookNotFound(true);
            }
}
    });

   

    const handleViewBookAction = (book: Book) => {
        setCurrentBook(book);
        setViewBook(true);

    };

    const handleDeleteBookAction = (id: number) => {
        setDeletedBookId(id);
        deleteBookMutation.mutate(id);
    };

    const handlePreviousPage = () => {
        setParameters((prevParams) => ({
            ...prevParams,
            direction: "previous",
            cursor: cursors?.previousCursor,
        }));
      
        setShouldFetchData(true); 
    };

    const handleNextPage = () => {
        setParameters((prevParams) => ({
            ...prevParams,
            direction: "next",
            cursor: cursors?.nextCursor,
        }));
        
        setShouldFetchData(true); 
    };

    const handleFilter = (title: string, year: number, limit: number) => {
      
        setParameters((prevParams) => ({
            direction: (title || year) ? "" : prevParams.direction,
            cursor: (title || year) ? "" : prevParams.cursor,
            title: title,
            first_publish_year: year,
            limit: limit
        }));
     
        setShouldFetchData(true); 
    };

    const handleReset = () => {
        setParameters(() => ({
            limit: 10,
            cursor: "",
            direction: "",
            title: "",
            first_publish_year: null
        }));
       
        setShouldFetchData(true);
    };

    const onTitleUpdate = (title: string) => {
        setParameters((prevParams) => ({
            ...prevParams,
          
        }));
    };

    const onYearUpdate = (year: number) => {
        setParameters((prevParams) => ({
            ...prevParams,
           
        }));
    };

    const onLimitUpdate = (limit: number) => {
        setParameters((prevParams) => ({
            ...prevParams,
           
        }));
    };

    const onBookUpdate = () => {
        setShouldFetchData(true);
        setViewBook(false)
    };

    return (
        
        <div className="flex flex-col items-center mt-20">
            <FilterComponent
                onFilter={handleFilter}
                onReset={handleReset}
                updateTitleParam={onTitleUpdate}
                updateYearParam={onYearUpdate}
                updateLimitParam={onLimitUpdate}
                
                
            />
            
            <div className=" w-[800px]">
                <div className="overflow-auto h-full"> 
                    <BookComponent
                        booksData={books}
                        onViewBookAction={handleViewBookAction}
                        onDeleteBookAction={handleDeleteBookAction}
                        onBookDeleted={onBookDeleted}
                        deletedBookId={deletedBookId}
                        bookNotFound={onBookNotFound}
                    />
                </div>
            </div>

            {viewBook && <ViewBookComponent book={currentBook} onClose={onBookUpdate} />}

            
            <ChangePageComponent cursors={cursors} onPreviousPage={handlePreviousPage} onNextPage={handleNextPage} />
            
       </div>
    );
};

export default PaginatedBooksComponent;
