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
  description,
  attribution,
  dataAction,
  ...rest
}) => (
  <figure {...rest} data-action={dataAction}>
    <Img imageHeight={500} src={imgUrl} />
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
