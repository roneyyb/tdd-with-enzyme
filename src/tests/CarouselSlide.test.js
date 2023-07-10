import React from 'react'; // 1
import { shallow } from 'enzyme'; // 2
import CarouselSlide from '../CarouselSlide';

describe('CarouselSlide', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <CarouselSlide
                imgUrl='https://example.com/default.jpg'
                description='Default test image'
            />
        );
    });
    it('renders a <figure>', () => {
        expect(wrapper.type()).toBe('figure');
    });

    it('renders an <img> and a <figcaption> as children', () => {
        expect(wrapper.childAt(0).type()).toBe('img');
        expect(wrapper.childAt(1).type()).toBe('figcaption');
    });

    it('passes imgUrl as props to <img> component', () => {
        const imgUrl = 'https://example.com/image.png';
        wrapper.setProps({ imgUrl });
        const imgComponent = wrapper.find('img');
        expect(imgComponent.type()).toBe('img');
        expect(imgComponent.prop('src')).toBe(imgUrl);
    });

    it('uses `description` and `attribution` as the <figcaption>', () => {
        const description = 'A jaw-droppingly spectacular image';
        const attribution = 'Trevor Burnham';
        wrapper.setProps({ description, attribution });
        expect(wrapper.find('figcaption').text()).toBe(
            `${description} ${attribution}`
        );
        expect(wrapper.find('figcaption strong').text()).toBe(description);
    });
    it('passes other props to the figure', () => {
        const onClick = () => {};
        const className = 'my-carousel-button';
        const dataAction = 'prev';
        wrapper.setProps({ onClick, className, dataAction: dataAction }); // 1
        expect(wrapper.prop('onClick')).toBe(onClick);
        expect(wrapper.prop('className')).toBe(className);
        expect(wrapper.prop('data-action')).toBe(dataAction);
    });
});
