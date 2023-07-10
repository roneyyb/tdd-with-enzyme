import React from 'react';
import PropTypes from 'prop-types';

const CarouselSlide = ({
    imgUrl,
    description,
    attribution,
    dataAction,
    ...rest
}) => (
    <figure {...rest} data-action={dataAction}>
        <img src={imgUrl} />
        <figcaption>
            <strong>{description}</strong> {attribution}
        </figcaption>
    </figure>
);

CarouselSlide.propTypes = {
    imgUrl: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    attribution: PropTypes.node,
};

export default CarouselSlide;
