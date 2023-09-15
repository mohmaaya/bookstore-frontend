import React, { useState } from "react";

interface FilterComponentProps {
    onFilter: (title: string, year: number, limit: number) => void;
    onReset: () => void;
    updateTitleParam: (title: string) => void;
    updateYearParam: (year: number) => void;
    updateLimitParam: (limit: number) => void; 
}

const FilterComponent: React.FC<FilterComponentProps> = ({
    onFilter,
    onReset,
    updateTitleParam,
    updateYearParam,
    updateLimitParam,
}) => {
    const [searchedTitle, setSearchedTitle] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<number>(0);
    const [selectedLimit, setSelectedLimit] = useState<number>(10);
    const [filterEnabled, setFilterEnabled] = useState<Boolean>(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;
        setSearchedTitle(newTitle);
        updateTitleParam(newTitle);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = Number(event.target.value);
        setSelectedYear(newYear);
        updateYearParam(newYear);
    };

    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = Number(event.target.value);
        setSelectedLimit(newLimit);
        updateLimitParam(newLimit);
    };

    const handleFilterClick = () => {
        onFilter(searchedTitle, selectedYear, selectedLimit);
        setFilterEnabled(true);
        setTimeout(() => {
            setFilterEnabled(false);
        }, 2000);

    };

    const handleResetClick = () => {
        setSearchedTitle("");
        setSelectedLimit(10);
        setSelectedYear(0);

        onReset();
    };

    const perPageBooksLimits = [3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    const booksPublishedSince = [1500, 1600, 1650, 1700, 1800, 1900, 1930, 1960, 1980, 2000, 2010];

    return (
        <>
        <div className="my-4 mt-5 flex space-x-2 items-center">
            <input
                type="text"
                placeholder="Search Books by Title"
                value={searchedTitle}
                onChange={handleSearchChange}
                className="px-2 py-1 rounded border"
            />
            <select value={selectedYear}
                onChange={handleYearChange}
                className="px-2 py-1 rounded border"
            >
                <option value="">Books Published Since</option>
                {booksPublishedSince.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <select value={selectedLimit}
                onChange={handleLimitChange}
                className="px-2 py-1 rounded border"
            >
                {perPageBooksLimits.map((limit) => (
                    <option key={limit} value={limit}>
                        {limit} books per page
                    </option>
                ))}
            </select>
            <button
                onClick={handleFilterClick}
                    className="bg-blue-500 
                                text-white 
                                px-4 py-2 
                                rounded     
                                hover:bg-gray-300 
                                hover:text-gray-800 "
            >Filter
            </button>
            <button
                onClick={handleResetClick}
                    className="bg-blue-500 
                               text-white 
                               px-4 py-2 
                               rounded 
                               hover:bg-gray-300 
                               hover:text-gray-800 "
            >Reset
            </button>
        </div>
            {filterEnabled && (
                <h3 className="text-lg text-green-600">
                        Books filtered
                </h3>
            )}
        </>
    );
};

export default FilterComponent;
