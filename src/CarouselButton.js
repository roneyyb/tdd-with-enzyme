// src/CarouselButton.js
import React from 'react';
import PropTypes from 'prop-types';

const CarouselButton = ({ children, onClick, className, dataAction }) => (
    <button data-action={dataAction} onClick={onClick} className={className}>
        {children}
    </button>
);

CarouselButton.propTypes = {
    children: PropTypes.node.isRequired, // 1
    onClick: PropTypes.func,
    className: PropTypes.string,
    dataAction: PropTypes.string,
};

export default CarouselButton;
