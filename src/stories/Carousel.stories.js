import Carousel from '../Carousel';
import slides from '../../example/slides';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Example/Carousel',
  component: Carousel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    slides: slides,
  },
};

export const Carousel1 = {
  args: {
    slides: slides.slice(2),
  },
};
// storiesOf('Carousel', module).add('default', () => (
//   <Carousel slides={slides} />
// ));
