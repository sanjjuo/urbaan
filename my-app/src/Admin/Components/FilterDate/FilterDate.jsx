import React from 'react'
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import { FiChevronDown } from 'react-icons/fi' // Importing an icon from react-icons

const FilterDate = ({ setFilters, resetFilter }) => {

    const handleDateChange = (value) => {
        setFilters(prev => ({
            ...prev,
            startDate: value[0]?.format("YYYY-MM-DD") || '',
            endDate: value[1]?.format("YYYY-MM-DD") || ''
        }));
    };

    // Reset date fields if resetFilter prop is triggered
    React.useEffect(() => {
        if (resetFilter) {
            setFilters((prev) => ({
                ...prev,
                startDate: '',
                endDate: '',
            }));
        }
    }, [resetFilter, setFilters]);

    return (
        <>
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
                    multiple
                    max={2}
                    placeholder='Select Date'
                    className="#C21E56"
                    highlightToday={false}
                    onChange={handleDateChange}
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
                        color: '#202224', // Adjust color of the arrow
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
        </>
    )
}

export default FilterDate
