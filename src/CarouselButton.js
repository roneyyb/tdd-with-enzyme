// src/CarouselButton.js
import React from 'react';
import PropTypes from 'prop-types';

const CarouselButton = ({ children }) => <button>{children}</button>;

CarouselButton.propTypes = {
    children: PropTypes.node.isRequired, // 1
};

export default CarouselButton;
