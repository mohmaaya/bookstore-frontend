
export interface Book {
    id: number;
    title: string;
    first_publish_year: number;
    number_of_pages_median: number;
    author_name: string;
    covers: {
        S?: string;
        M?: string;
        L?: string;
    };
}

export interface Cursor {
    currentCursor?: string | null;
    nextCursor?: string | null;
    previousCursor?: string | null;
}

export interface Books {
    books: Book[] | null;
}

export interface PageParams {
    cursor?: string | null;
    direction?: string | null;
    limit?: number | null;
    title?: string | null;
    first_publish_year?: number | null;
}