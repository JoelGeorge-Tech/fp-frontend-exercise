import { mount } from '@vue/test-utils'
import DonationForm from './../src/components/DonationForm.vue'


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
  

describe('DonationForm', () => {
    const wrapper = mount(DonationForm);

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

});