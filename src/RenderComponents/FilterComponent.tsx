import React, { useState } from "react";
import { PageParams } from "../types/types";

interface FilterComponentProps {
    onFilter: (filterData: any) => void;
    firstPublishYears: number[];
    updateTitleParam: (title: string | null) => void;
    updateYearParam: (year: number) => void;
    updateLimitParam: (limit: number) => void; 
}

const FilterComponent: React.FC<FilterComponentProps> = ({
    onFilter,
    firstPublishYears,
    updateTitleParam,
    updateYearParam,
    updateLimitParam,
}) => {
    const [searchedTitle, setSearchedTitle] = useState("");
    const [selectedYear, setSelectedYear] = useState<number>(0);
    const [selectedLimit, setSelectedLimit] = useState<number>(10);

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
        onFilter({});
    };

    const perPageBooksLimits = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                value={searchedTitle}
                onChange={handleSearchChange}
            />
            <select value={selectedYear} onChange={handleYearChange}>
                <option value="">Select Year</option>
                {firstPublishYears.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <select value={selectedLimit} onChange={handleLimitChange}>
                {perPageBooksLimits.map((limit) => (
                    <option key={limit} value={limit}>
                        {limit} books per page
                    </option>
                ))}
            </select>
            <button onClick={handleFilterClick}>Filter</button>
        </div>
    );
};

export default FilterComponent;
