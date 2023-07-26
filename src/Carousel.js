import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import HasIndex from './HasIndex';
import PropTypes from 'prop-types';

export class Carousel extends React.PureComponent {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    defaultImg: CarouselSlide.propTypes.Img,
    slideIndex: PropTypes.number.isRequired,
    slideIndexDecrement: PropTypes.func.isRequired,
    slideIndexIncrement: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultImg: CarouselSlide.defaultProps.Img,
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight, // 1
  };

  onClickPrevHandle = () => {
    const { slideIndexDecrement, slides } = this.props;
    slideIndexDecrement(slides.length);
  };

  onClickNextHandle = () => {
    const { slideIndexIncrement, slides } = this.props;
    slideIndexIncrement(slides.length);
  };

  render() {
    const {
      defaultImg,
      defaultImgHeight,
      slideIndex,
      slideIndexDecrement: _slideIndexDecrement, // 1
      slideIndexIncrement: _slideIndexIncrement,
      slides,
      ...rest
    } = this.props;
    return (
      <div {...rest}>
        <CarouselButton onClick={this.onClickPrevHandle} dataAction={'prev'}>
          Prev
        </CarouselButton>
        <CarouselSlide
          imgHeight={defaultImgHeight}
          Img={defaultImg}
          {...slides[slideIndex]}
        />
        <CarouselButton onClick={this.onClickNextHandle} dataAction={'next'}>
          Next
        </CarouselButton>
      </div>
    );
  }
}

export default HasIndex(Carousel, 'slideIndex');
