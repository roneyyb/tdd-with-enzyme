import { shallow } from 'enzyme/build';
import React from 'react';
import Carousel from '../Carousel';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
  let wrapper;
  const slides = [
    {
      imgUrl: 'https://example.com/slide1.png',
      description: 'Slide 1',
      attribution: 'Uno Pizzeria',
    },
    {
      imgUrl: 'https://example.com/slide2.png',
      description: 'Slide 2',
      attribution: 'Dos Equis',
    },
    {
      imgUrl: 'https://example.com/slide3.png',
      description: 'Slide 3',
      attribution: 'Three Amigos',
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<Carousel slides={slides} />);
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
    expect(wrapper.state('currentIndex')).toBe(2);
  });
  it('increases currentIndex when button is clicked', () => {
    wrapper.setState({ currentIndex: 1 });
    wrapper.find('[dataAction="next"]').simulate('click');
    expect(wrapper.state('currentIndex')).toBe(2);
    wrapper.find('[dataAction="next"]').simulate('click');
    expect(wrapper.state('currentIndex')).toBe(0);
  });

  describe('with a middle slide selected', () => {
    // 1
    beforeEach(() => {
      wrapper.setState({ currentIndex: 1 });
    });

    it('decrements `currentIndex` when Prev is clicked', () => {
      wrapper.find('[dataAction="prev"]').simulate('click');
      expect(wrapper.state('currentIndex')).toBe(0);
    });

    it('increments `currentIndex` when Next is clicked', () => {
      wrapper.setState({ currentIndex: 1 });
      wrapper.find('[dataAction="next"]').simulate('click');
      expect(wrapper.state('currentIndex')).toBe(2);
    });
  });

  describe('with the first slide selected', () => {
    it('wraps `currentIndex` to the max value when Prev is clicked', () => {
      wrapper.setState({ currentIndex: 0 });
      wrapper.find('[dataAction="prev"]').simulate('click');
      expect(wrapper.state('currentIndex')).toBe(slides.length - 1);
    });
  });

  describe('with the last slide selected', () => {
    it('wraps `currentIndex` to the min value when Next is clicked', () => {
      wrapper.setState({ currentIndex: slides.length - 1 });
      wrapper.find('[dataAction="next"]').simulate('click');
      expect(wrapper.state('currentIndex')).toBe(0);
    });
  });

  it('check slide rendering', () => {
    // expect(wrapper.prop('slides')).to(slides);
    let slideProps;
    wrapper.setState({ currentIndex: 0 }); // 3

    slideProps = wrapper.find(CarouselSlide).props();

    //    console.log('slide props', slideProps);
    expect(slideProps).toEqual({ ...CarouselSlide.defaultProps, ...slides[0] });
    wrapper.setState({ currentIndex: 1 }); // 3
    slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual({ ...CarouselSlide.defaultProps, ...slides[1] });
  });
  it('passes defaultImg and defaultImgHeight to the CarouselSlide', () => {
    const defaultImg = () => 'test';
    const defaultImgHeight = 1234;
    wrapper.setProps({ defaultImg, defaultImgHeight });
    expect(wrapper.find(CarouselSlide).prop('Img')).toBe(defaultImg);
    expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(
      defaultImgHeight
    );
  });

  it('allows individual slides to override Img and imgHeight', () => {
    const Img = () => 'test';
    const imgHeight = 1234;
    wrapper.setProps({ slides: [{ ...slides[0], Img, imgHeight }] });
    expect(wrapper.find(CarouselSlide).prop('Img')).toBe(Img);
    expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(imgHeight);
  });
});
