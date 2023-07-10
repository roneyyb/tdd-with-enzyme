import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';

class Carousel extends React.PureComponent {
    state = {
        currentIndex: 0,
    };

    onClickPrevHandle = () => {
        this.setState(({ currentIndex }) => ({
            currentIndex:
                currentIndex - 1 < 0
                    ? this.props.slides.length - 1
                    : currentIndex - 1,
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
                <CarouselButton
                    onClick={this.onClickPrevHandle}
                    dataAction={'prev'}
                >
                    Prev
                </CarouselButton>
                <CarouselSlide
                    {...this.props.slides[this.state.currentIndex]}
                />
                <CarouselButton
                    onClick={this.onClickNextHandle}
                    dataAction={'next'}
                >
                    Next
                </CarouselButton>
            </div>
        );
    }
}

export default Carousel;
