import React, { useState, useEffect, useCallback } from 'react';
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { FiChevronDown } from 'react-icons/fi';

const FilterDate = ({ setFilters, resetFilter }) => {
    const [selectedDates, setSelectedDates] = useState([]);

    const handleDateChange = useCallback((value) => {
        setSelectedDates(value);
        setFilters(prev => ({
            ...prev,
            startDate: value[0]?.format("YYYY-MM-DD") || '',
            endDate: value[1]?.format("YYYY-MM-DD") || ''
        }));
    }, [setFilters]); // Dependency array ensures the function is recreated only when setFilters changes

    useEffect(() => {
        if (resetFilter) {
            setSelectedDates([]); // Reset the DatePicker by clearing state
            setFilters(prev => ({
                ...prev,
                startDate: '',
                endDate: '',
            }));
        }
    }, [resetFilter, setFilters]);

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '11px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
        }}>
            <DatePicker
                value={selectedDates}
                multiple
                max={2}
                placeholder='Select Date'
                highlightToday={false}
                onChange={handleDateChange} // Memoized callback
                style={{
                    border: 'none',
                    height: '100%',
                    width: '100%',
                    outline: 'none',
                    boxShadow: 'none',
                    cursor: 'pointer'
                }}
                plugins={[<DatePanel />]}
            />
            <FiChevronDown
                size={19}
                style={{
                    color: '#202224',
                    cursor: 'pointer',
                }}
            />
            <style>
                {`
                    input::placeholder {
                        color: #202224;
                    }
                `}
            </style>
        </div>
    );
};

export default FilterDate;
