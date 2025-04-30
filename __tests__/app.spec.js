import { mount } from '@vue/test-utils'
import App from './../src/App.vue'

//Utils
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      quotes: {
        USDGBP: 0.75
      }
    }),
  })
);
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
  describe('Data Binding', () => {
    it('binds amount data to input field', async () => {
      await wrapper.setData({ amount: 100 });
      const input = wrapper.find('#amount');
      expect(input.element.value).toBe('100');
    });

    it('binds estimate data to estimate field', async () => {
      await wrapper.setData({ estimate: 75.50 });
      const estimateInput = wrapper.find('#estimateBox');
      expect(estimateInput.element.value).toBe('75.5');
    });
  });

  //Testing of business logic
  describe('Methods', () => {
    describe('setAmount', () => {
      it('sets the amount correctly', () => {
        wrapper.vm.setAmount(50);
        expect(wrapper.vm.amount).toBe(50);
      });
    });

    describe('calculateConversion', () => {
      it('calculates conversion correctly with valid data', async () => {
        await wrapper.setData({ amount: 100 });
        await wrapper.vm.calculateConversion();
        
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
          'https://founderspledge.github.io/fp-interview-exercise-api/currency.json'
        );
        
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.estimate).toBe('75.00');
      });

      it('handles invalid response data', async () => {
        fetch.mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(null),
          })
        );
        
        await wrapper.setData({ amount: 100 });
        await wrapper.vm.calculateConversion();
        
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.estimate).toBeNull();
      });

      describe('when amount is not set', () => {
        it('does nothing when amount is null', async () => {
          await wrapper.setData({ amount: null });
          await wrapper.vm.calculateConversion();
          expect(fetch).not.toHaveBeenCalled();
          expect(wrapper.vm.estimate).toBeNull();
        });
      
        it('does nothing when amount is undefined', async () => {
          await wrapper.setData({ amount: undefined });
          await wrapper.vm.calculateConversion();
          expect(fetch).not.toHaveBeenCalled();
          expect(wrapper.vm.estimate).toBeNull();
        });
      
        it('does nothing when amount is NaN', async () => {
          await wrapper.setData({ amount: NaN });
          await wrapper.vm.calculateConversion();
          expect(fetch).not.toHaveBeenCalled();
          expect(wrapper.vm.estimate).toBeNull();
        });
      
        it('does nothing when amount is 0', async () => {
          await wrapper.setData({ amount: 0 });
          await wrapper.vm.calculateConversion();
          expect(fetch).not.toHaveBeenCalled();
          expect(wrapper.vm.estimate).toBeNull();
        });
      
        it('does nothing when amount is negative', async () => {
          await wrapper.setData({ amount: -10 });
          await wrapper.vm.calculateConversion();
          expect(fetch).not.toHaveBeenCalled();
          expect(wrapper.vm.estimate).toBeNull();
        });
      });

      it('handles negative amounts by treating as positive', async () => {
        await wrapper.setData({ amount: -100 });
        await wrapper.vm.calculateConversion();
        
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.estimate).toBe(null);
      });
    });
  });
  
  //Testing of user interaction
  describe('User Interaction', () => {
    it('triggers calculation when button is clicked', async () => {
      const mockCalculate = jest.spyOn(wrapper.vm, 'calculateConversion');
      await wrapper.setData({ amount: 50 });
      
      const button = wrapper.find('.pledge-button');
      await button.trigger('click');
      
      expect(mockCalculate).toHaveBeenCalled();
      mockCalculate.mockRestore();
    });

    it('updates amount when input changes', async () => {
      const input = wrapper.find('#amount');
      await input.setValue(200);
      
      expect(wrapper.vm.amount).toBe(200);
    });
  });

})
