import { mount } from '@vue/test-utils'
import App from './../src/App.vue'

//Utils
afterEach(() => {    
  jest.clearAllMocks();
});


//Tests for the App.vue component
describe('Mounted App', () => {
  const wrapper = mount(App);
  //Tests around the rendering of the component
  describe('Rendering', () => {
    it('renders correctly', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('displays the US support header', () => {
      expect(wrapper.find('.header h2').text()).toBe('Support us from the US');
    });

    it('displays the amount input field', () => {
      const input = wrapper.find('#amount');
      expect(input.exists()).toBe(true);
      expect(input.attributes('type')).toBe('number');
      expect(input.attributes('placeholder')).toBe('Enter amount in USD');
      expect(input.attributes('min')).toBe('0');
    });

    it('displays the disabled estimate field', () => {
      const estimateInput = wrapper.find('#estimateBox');
      expect(estimateInput.exists()).toBe(true);
      expect(estimateInput.attributes('disabled')).toBe('disabled');
    });

    it('displays the calculate button', () => {
      const button = wrapper.find('.pledge-button');
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('Calculate');
    });

    it('displays the indie pledge section', () => {
      expect(wrapper.find('header').text()).toBe('Indie pledge');
      expect(wrapper.find('.location').text()).toBe('London, United Kingdom');
    });

    it('renders the correct markup', () => {
      expect(wrapper.html()).toContain('Support us from the US')
    })
  });

  //Tests around data display on the front end.
  


})
