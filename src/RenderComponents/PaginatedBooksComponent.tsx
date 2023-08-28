import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import BookComponent from "./BookComponent";
import ChangePageComponent from "./ChangePageComponent";
import FilterComponent from "./FilterComponent";
import { Cursor, PageParams, Books, Book } from "../types/types";
import { deleteBook, getAllBooks } from "../api/books";
import { urlQuery } from "../Helper/urlFormatter";
import ViewBookComponent from "./ViewBookComponent";

const PaginatedBooksComponent: React.FC = () => {
    const [books, setBooks] = useState<Books | null>(null);
    const [cursors, setCursors] = useState<Cursor | null>(null);
    const [parameters, setParameters] = useState<PageParams>({});
    const [firstPublishYears, setFirstPublishYears] = useState<number[]>([]);
    const [shouldFetchData, setShouldFetchData] = useState<boolean>(true);
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
    const [viewBook, setViewBook] = useState<boolean>(false);
    const navigate = useNavigate();

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

            const publishYears = data.books.map((book: { first_publish_year: number }) => book.first_publish_year);
            setFirstPublishYears(publishYears);

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
            console.log("book Deleted");
            setShouldFetchData(true);
        },
        onError: () => { }
    });

    const handleViewBookAction = (book: Book) => {
        setCurrentBook(book);
        setViewBook(true);

    };

    const handleDeleteBookAction = (id: number) => {
        const query = `/${id}`;
       // navigate(query);
        deleteBookMutation.mutate(id);
    };

    const handlePreviousPage = () => {
        setParameters((prevParams) => ({
            ...prevParams,
            direction: "previous",
            cursor: cursors?.previousCursor,
        }));
        const query = urlQuery(parameters);
       // navigate(query);
        setShouldFetchData(true); 
    };

    const handleNextPage = () => {
        setParameters((prevParams) => ({
            ...prevParams,
            direction: "next",
            cursor: cursors?.nextCursor,
        }));
        const query = urlQuery(parameters);
       // navigate(query);
        setShouldFetchData(true); 
    };

    const handleFilter = () => {
        setParameters((prevParams) => ({
            ...prevParams,
            cursor: "",
            direction: "",
        }));
        const query = urlQuery(parameters);
       // navigate(query);
        setShouldFetchData(true); 
    };

    const onTitleUpdate = (title: string | null) => {
        setParameters((prevParams) => ({
            ...prevParams,
            title: title,
        }));
    };

    const onYearUpdate = (year: number) => {
        setParameters((prevParams) => ({
            ...prevParams,
            first_publish_year: year,
        }));
    };

    const onLimitUpdate = (limit: number) => {
        setParameters((prevParams) => ({
            ...prevParams,
            limit: limit,
        }));
    };

    const onBookUpdate = () => {
        setShouldFetchData(true);
        setViewBook(false)
    };

    return (
        <>
            <FilterComponent
                onFilter={handleFilter}
                firstPublishYears={firstPublishYears}
                updateTitleParam={onTitleUpdate}
                updateYearParam={onYearUpdate}
                updateLimitParam={onLimitUpdate}
                
            />
            <BookComponent booksData={books} onViewBookAction={handleViewBookAction} onDeleteBookAction={handleDeleteBookAction} />
            {viewBook && <ViewBookComponent book={currentBook} onClose={onBookUpdate} />}
            <ChangePageComponent cursors={cursors} onPreviousPage={handlePreviousPage} onNextPage={handleNextPage} />

        </>
    );
};

export default PaginatedBooksComponent;
