import React from 'react';
import CarouselButton from './CarouselButton';

class Carousel extends React.PureComponent {
    state = {
        currentIndex: 0,
    };

    onClickPrevHandle = () => {
        this.setState(({ currentIndex }) => ({
            currentIndex: currentIndex != 0 ? currentIndex - 1 : 0,
        }));
    };

    onClickNextHandle = () => {
        this.setState(({ currentIndex }) => ({
            currentIndex: currentIndex + 1,
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
