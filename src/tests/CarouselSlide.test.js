import React from 'react'; // 1
import { mount, shallow } from 'enzyme'; // 2
import CarouselSlide from '../CarouselSlide';
import styled from 'styled-components';

describe('CarouselSlide', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <CarouselSlide
        imgUrl="https://example.com/default.jpg"
        description="Default test image"
      />
    );
  });
  it('renders a <figure>', () => {
    expect(wrapper.type()).toBe('figure');
  });

  it('renders an <img> and a <figcaption> as children', () => {
    expect(wrapper.childAt(0).type()).toBe(CarouselSlide.defaultProps.Img);
    expect(wrapper.childAt(1).type()).toBe('figcaption');
  });

  it('passes imgUrl as props to <img> component', () => {
    const imgUrl = 'https://example.com/image.png';
    wrapper.setProps({ imgUrl });
    const imgComponent = wrapper.find(CarouselSlide.defaultProps.Img);

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

  it('renders correctly', () => {
    wrapper.setProps({
      description: 'Description',
      attribution: 'Attribution',
    });

    expect(wrapper).toMatchSnapshot();
  });
});

describe('Img', () => {
  let mounted;
  const imgUrl = 'https://example.com/default.jpg';

  beforeEach(() => {
    const Img = CarouselSlide.defaultProps.Img;
    mounted = mount(<Img src={imgUrl} imgHeight={500} />);
  });

  it('should return an img component with src props', () => {
    expect(mounted.containsMatchingElement(<img src={imgUrl} />)).toBe(true);
  });

  it('renders correctly', () => {
    expect(mounted.find('img')).toMatchSnapshot();
  });

  it('should have the static styles', () => {
    expect(mounted).toHaveStyleRule('width', '100%');
    expect(mounted).toHaveStyleRule('object-fit', 'cover');
  });

  it('uses imageHeight as styled user property', () => {
    expect(mounted).toHaveStyleRule('height', '500px');
    mounted.setProps({ imgHeight: 'calc(100vh - 100px)' });
    expect(mounted).toHaveStyleRule('height', 'calc(100vh - 100px)');
  });

  it('allows styles to be overridden', () => {
    const TestImg = styled(CarouselSlide.defaultProps.Img)`
      width: auto;
      height: auto;
      object-fit: fill;
    `;

    mounted = mount(
      <CarouselSlide
        Img={TestImg}
        imgUrl={imgUrl}
        description="This prop is required"
      />
    );

    expect(mounted.find(TestImg)).toHaveStyleRule('width', 'auto');
    expect(mounted.find(TestImg)).toHaveStyleRule('height', 'auto');
    expect(mounted.find(TestImg)).toHaveStyleRule('object-fit', 'fill');
  });
});
