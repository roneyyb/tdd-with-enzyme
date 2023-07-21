import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Img = styled.img`
  object-fit: contain;
  width: 100%;
  height: ${(props) =>
    typeof props.imgHeight === 'number'
      ? `${props.imgHeight}px`
      : props.imgHeight};
`;

const CarouselSlide = ({
  imgUrl,
  imgHeight,
  description,
  attribution,
  dataAction,
  Img,
  ...rest
}) => (
  <figure {...rest} data-action={dataAction}>
    <Img imgHeight={imgHeight} src={imgUrl} />
    <figcaption>
      <strong>{description}</strong> {attribution}
    </figcaption>
  </figure>
);

CarouselSlide.propTypes = {
  Img: PropTypes.elementType,
  imgHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 2
  imgUrl: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  attribution: PropTypes.node,
  dataAction: PropTypes.string,
};

CarouselSlide.defaultProps = {
  // 3
  imgHeight: 500,
  Img: Img,
};
export default CarouselSlide;
