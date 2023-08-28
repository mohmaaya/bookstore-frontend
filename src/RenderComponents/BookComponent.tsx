import React from "react";
import { Books, Book, PageParams } from "../types/types";
import BookCardComponent from "./BookCardComponent";

interface BookComponentProps {
    booksData: Books | null;
    onViewBookAction: (book: Book) => void;
    onDeleteBookAction: (id: number) => void;
    onBookDeleted: Boolean;
    deletedBookId: number;
    bookNotFound: Boolean;
 
}

const BookComponent: React.FC<BookComponentProps> = ({ booksData,
                    onViewBookAction,
                    onDeleteBookAction,
                    onBookDeleted,
                    deletedBookId,
    bookNotFound }) => {
  
    return (
        <div className="mt-10 bg-gray-200 p-7 mb-5">
            {
                booksData?.books?.length !== 0 ?(
                    <ul>
                        {booksData?.books?.map((book: Book) => (
                            <li key={book.id} className="mb-4">
                                <BookCardComponent book={book} />

                                <button
                                    onClick={() => onViewBookAction(book)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md mx-2 mt-2"
                                >
                                    View Book
                                </button>

                                <button
                                    onClick={() => onDeleteBookAction(book.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md mt-2"
                                >
                                    Delete Book
                                </button>

                                {onBookDeleted && deletedBookId === book.id && (
                                    <p className="text-lg text-green-600 mb-1">
                                        {`Book with ID ${book.id} successfully deleted`}
                                    </p>
                                )}

                                {bookNotFound && deletedBookId === book.id && (
                                    <p className="text-lg text-red-600 mb-1">
                                        {`Book with ID ${book.id} not found in the Database`}
                                    </p>
                                )}

                            </li>
                        ))}
                    </ul>
                ) : (<p className="text-lg font-bold text-blue-600 mb-1">
                    {`No books available in the Database. Add some books.`}
                    </p>)
            }
        </div>
    );
}

export default BookComponent;





