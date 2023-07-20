import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Img = styled.img`
  object-fit: contain;
  width: 100%;

  height: ${(props) =>
    typeof props.imageHeight === "number"
      ? `${props.imageHeight}px`
      : props.imageHeight};
`;

const CarouselSlide = ({
  imgUrl,
  imgHeight,
  description,
  attribution,
  dataAction,
  ...rest
}) => (
  <figure {...rest} data-action={dataAction}>
    <Img imageHeight={imgHeight} src={imgUrl} />
    <figcaption>
      <strong>{description}</strong> {attribution}
    </figcaption>
  </figure>
);

CarouselSlide.propTypes = {
  imgHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 2
  imgUrl: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  attribution: PropTypes.node,
};

CarouselSlide.defaultProps = {
  // 3
  imgHeight: 500,
};
export default CarouselSlide;
