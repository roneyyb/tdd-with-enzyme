import { shallow } from 'enzyme/build';
import React from 'react';
import Carousel, { Carousel as CoreCarousel } from '../Carousel';
import CarouselSlide from '../CarouselSlide';
import { mount } from 'enzyme';

describe('Carousel', () => {
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

  const slideIndexDecrement = jest.fn(); // 1
  const slideIndexIncrement = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CoreCarousel
        slides={slides}
        slideIndex={0}
        slideIndexDecrement={slideIndexDecrement}
        slideIndexIncrement={slideIndexIncrement}
      />
    );
  });

  it('renders a div component', () => {
    expect(wrapper.type()).toBe('div');
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

  it('decrements `slideIndex` when Prev is clicked', () => {
    wrapper.find('[dataAction="prev"]').simulate('click');
    expect(slideIndexDecrement).toHaveBeenCalledWith(slides.length); // 2
  });

  it('increments `slideIndex` when Next is clicked', () => {
    wrapper.find('[dataAction="next"]').simulate('click');
    expect(slideIndexIncrement).toHaveBeenCalledWith(slides.length);
  });

  describe('with a middle slide selected', () => {
    // 1
    beforeEach(() => {
      wrapper.setState({ slideIndex: 1 });
    });

    it('decrements `slideIndex` when Prev is clicked', () => {
      wrapper.find('[dataAction="prev"]').simulate('click');
      expect(slideIndexDecrement).toHaveBeenCalledWith(slides.length);
    });

    it('increments `slideIndex` when Next is clicked', () => {
      wrapper.setProps({ slideIndex: 1 });
      wrapper.find('[dataAction="next"]').simulate('click');
      expect(slideIndexIncrement).toHaveBeenCalledWith(slides.length);
    });
  });

  describe('with the first slide selected', () => {
    it('wraps `slideIndex` to the max value when Prev is clicked', () => {
      wrapper.setProps({ slideIndex: 0 });
      wrapper.find('[dataAction="prev"]').simulate('click');
      expect(slideIndexDecrement).toHaveBeenCalledWith(slides.length);
    });
  });

  describe('with the last slide selected', () => {
    it('wraps `slideIndex` to the min value when Next is clicked', () => {
      wrapper.setProps({ slideIndex: slides.length - 1 });
      wrapper.find('[dataAction="next"]').simulate('click');
      expect(slideIndexIncrement).toHaveBeenCalledWith(slides.length);
    });
  });

  it('check slide rendering', () => {
    // expect(wrapper.prop('slides')).to(slides);
    let slideProps;
    wrapper.setProps({ slideIndex: 0 }); // 3

    slideProps = wrapper.find(CarouselSlide).props();

    //    console.log('slide props', slideProps);
    expect(slideProps).toEqual({ ...CarouselSlide.defaultProps, ...slides[0] });
    wrapper.setProps({ slideIndex: 1 }); // 3
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

  describe('component with HOC', () => {
    let mounted;

    beforeEach(() => {
      mounted = mount(<Carousel slides={slides} />);
    });

    it('passes `slides` down to the core component', () => {
      expect(mounted.find(CoreCarousel).prop('slides')).toBe(slides);
    });

    it('sets slideIndex={0} on the core component', () => {
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('allows `slideIndex` to be controlled', () => {
      mounted = mount(<Carousel slides={slides} slideIndex={1} />);
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(1);
      mounted.setProps({ slideIndex: 0 });
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('advances the slide after `autoAdvanceDelay` elapses', () => {
      jest.useFakeTimers();
      const autoAdvanceDelay = 10e3;
      mounted = mount(
        <Carousel slides={slides} autoAdvanceDelay={autoAdvanceDelay} />
      );
      jest.advanceTimersByTime(autoAdvanceDelay);
      mounted.update(); // 1
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(1);
    });
  });

  describe('core component', () => {
    // Tests against CoreCarousel will go here
  });
});
