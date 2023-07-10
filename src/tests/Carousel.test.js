import { shallow } from 'enzyme/build';
import React from 'react';
import Carousel from '../Carousel';

describe('Carousel', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Carousel />);
    });
    it('renders a div component', () => {
        expect(wrapper.type()).toBe('div');
    });

    it('check current index', () => {
        expect(wrapper.state('currentIndex')).toBe(0);
    });

    it('render a CarouselButton labeled Prev', () => {
        expect(
            wrapper
                .find('CarouselButton')
                .at(0)
                .prop('children')
        ).toBe('Prev');
    });
    it('render a CarouselButton labeled Next', () => {
        expect(
            wrapper
                .find('CarouselButton')
                .at(1)
                .prop('children')
        ).toBe('Next');
    });

    it('decreases currentIndex when Prev button is clicked', () => {
        wrapper.setState({ currentIndex: 1 });
        wrapper.find('[dataAction="prev"]').simulate('click');
        expect(wrapper.state('currentIndex')).toBe(0);
        wrapper.find('[dataAction="prev"]').simulate('click');
        expect(wrapper.state('currentIndex')).toBe(0);
    });
    it('increases currentIndex when button is clicked', () => {
        wrapper.setState({ currentIndex: 1 });
        wrapper.find('[dataAction="next"]').simulate('click');
        expect(wrapper.state('currentIndex')).toBe(2);
        wrapper.find('[dataAction="next"]').simulate('click');
        expect(wrapper.state('currentIndex')).toBe(3);
    });
});
