import React from 'react';
import HasIndex from '../HasIndex';
import { shallow } from 'enzyme';

describe('HasIndex()', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';

  const MockComponentWithIndex = HasIndex(MockComponent, 'index');

  it('Has a display name of HasIndex(MockComponent)', () => {
    expect(MockComponentWithIndex.displayName).toBe('HasIndex(MockComponent)');
  });

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MockComponentWithIndex />);
  });

  it('has an initial `index` state set to 0', () => {
    expect(wrapper.state('index')).toBe(0);
  });

  it('pass the index state down as index prop', () => {
    expect(wrapper.prop('index')).toBe(0);
    wrapper.setState({ index: 1 });
    expect(wrapper.prop('index')).toBe(1);
  });

  it('has an `index` state of 2 on decrement from 3', () => {
    wrapper.setState({ index: 3 });
    wrapper.prop('indexDecrement')();
    expect(wrapper.state('index')).toBe(2);
  });

  it('has an `index` state of 1 on increment', () => {
    wrapper.prop('indexIncrement')();
    expect(wrapper.state('index')).toBe(1);
  });

  it('has the max `index` state on decrement from 0', () => {
    wrapper.setState({ index: 0 });
    wrapper.prop('indexDecrement')(3);
    expect(wrapper.state('index')).toBe(2);
  });

  it('has the min `index` state on increment from the max', () => {
    wrapper.setState({ index: 2 });
    wrapper.prop('indexIncrement')(3);
    expect(wrapper.state('index')).toBe(0);
  });

  it('has initial `index` state equal to the `defaultIndex` prop', () => {
    // 1
    expect(wrapper.state('index')).toBe(0);
    const wrapper2 = shallow(<MockComponentWithIndex defaultIndex={1} />);
    expect(wrapper2.state('index')).toBe(1);
  });

  it('always has `index` state equal to the `index` prop', () => {
    // 2
    const wrapperWithInitialIndex = shallow(
      <MockComponentWithIndex index={1} />
    );
    expect(wrapperWithInitialIndex.state('index')).toBe(1);
    wrapper.setProps({ index: 2 });
    expect(wrapper.state('index')).toBe(2);
  });

  it('allows `index` state to change if the `index` prop is unset', () => {
    // 3
    const wrapperWithInitialIndex = shallow(
      <MockComponentWithIndex index={1} />
    );
    wrapperWithInitialIndex.setProps({ index: undefined });
    wrapperWithInitialIndex.setState({ index: 3 });
    expect(wrapperWithInitialIndex.state('index')).toBe(3);
  });

  it('calls `onIndexChange` on decrement/increment', () => {
    // 4
    const onIndexChange = jest.fn();
    wrapper.setProps({ index: 0, onIndexChange });
    wrapper.prop('indexDecrement')(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 2 } });
    wrapper.prop('indexIncrement')(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 1 } });
  });
});
