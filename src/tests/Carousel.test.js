// src/tests/CarouselButton.test.js
import React from 'react'; // 1
import { shallow } from 'enzyme'; // 2
import CarouselButton from '../CarouselButton';
import CarouselSlide from '../CarouselSlide';

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

    it('passes other props through to the button', () => {
        const onClick = () => {};
        const className = 'my-carousel-button';
        const dataAction = 'prev';
        wrapper.setProps({ onClick, className, dataAction: dataAction }); // 1
        expect(wrapper.prop('onClick')).toBe(onClick);
        expect(wrapper.prop('className')).toBe(className);
        expect(wrapper.prop('data-action')).toBe(dataAction);
    });
});

describe('CarouselSlide', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<CarouselSlide />);
    });
    it('renders a <figure>', () => {
        expect(wrapper.type()).toBe('figure');
    });

    it('renders an <img> and a <figcaption> as children', () => {
        expect(wrapper.childAt(0).type()).toBe('img');
        expect(wrapper.childAt(1).type()).toBe('figcaption');
    });
});
