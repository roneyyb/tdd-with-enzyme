import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import PropTypes from 'prop-types';

class Carousel extends React.PureComponent {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    defaultImg: CarouselSlide.propTypes.Img,
  };

  static defaultProps = {
    defaultImg: CarouselSlide.defaultProps.Img,
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight, // 1
  };
  state = {
    currentIndex: 0,
  };

  onClickPrevHandle = () => {
    this.setState(({ currentIndex }) => ({
      currentIndex:
        currentIndex - 1 < 0 ? this.props.slides.length - 1 : currentIndex - 1,
    }));
  };

  onClickNextHandle = () => {
    this.setState(({ currentIndex }) => ({
      currentIndex: (currentIndex + 1) % this.props.slides.length,
    }));
  };

  render() {
    return (
      <div>
        <CarouselButton onClick={this.onClickPrevHandle} dataAction={'prev'}>
          Prev
        </CarouselButton>
        <CarouselSlide
          imgHeight={this.props.defaultImgHeight}
          Img={this.props.defaultImg}
          {...this.props.slides[this.state.currentIndex]}
        />
        <CarouselButton onClick={this.onClickNextHandle} dataAction={'next'}>
          Next
        </CarouselButton>
      </div>
    );
  }
}

export default Carousel;
