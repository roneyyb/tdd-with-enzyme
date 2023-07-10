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
});
