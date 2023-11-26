import { LoadingButton } from '@mui/lab';
import React, { useState, useEffect, useRef } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

const DropdownButton = ({ title, value, onChange, options, wrapperClass, buttonStyle, loading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const handleDocumentClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleDocumentClick);
        return () => {
            window.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <div className="relative inline-block z-15" ref={dropdownRef}>
            <div className="relative">
                <LoadingButton
                endIcon={isOpen ? <SlArrowUp size="16" /> : <SlArrowDown size="16" />}
                loadingPosition="end"
                loading={loading}
                disabled={loading}
                sx={{textTransform: 'capitalize'}}
                    className={`font-[500] w-full px-3 rounded-[10px] ${wrapperClass}`}
                    onClick={toggleOptions}
                >
                    {value || title}
                </LoadingButton>
                {isOpen && (
                    <div className="absolute shadow-lg top-full left-0 w-full mt-1 bg-white max-h-[200px] overflow-scroll">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className="md:text-[12px] text-[10px] font-[700] text-[#000] text-start py-4 px-3 md:px-3 z-15 cursor-pointer"
                                onClick={() => {
                                    onChange(option.value);
                                    toggleOptions();
                                }}
                            >
                                {option.value}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropdownButton;
