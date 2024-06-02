import React from 'react';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const GoBackButton = () => {
    return (
        <Link to={-1} className="btn btn-neutral rounded-none hover:bg-slate-500 text-xl">
            <IoArrowUndoOutline /> Go Back
        </Link>
    );
};

export default GoBackButton;