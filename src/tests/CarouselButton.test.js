// src/tests/CarouselButton.test.js
import React from 'react'; // 1
import { configure, shallow } from 'enzyme'; // 2
import Adapter from 'enzyme-adapter-react-16';
import CarouselButton from '../CarouselButton';

configure({ adapter: new Adapter() });

describe('CarouselButton', () => {
    const text = 'Button text';
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<CarouselButton>{text}</CarouselButton>);
    });

    it('renders a <button>', () => {
        const wrapper = shallow(<CarouselButton />); // 3
        expect(wrapper.type()).toBe('button');
    });

    it('passes children through the button', () => {
        expect(wrapper.prop('children')).toBe(text);
    });
});
