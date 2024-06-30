import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from '@jest/globals';
import AddTodoComponent from '@/components/AddTodoComponent.vue';

describe('AddTodoComponent.vue', () => {
    it('should render the form correctly', () => {
        const wrapper = shallowMount(AddTodoComponent);
        expect(wrapper.find('v-form').exists()).toBe(true);
    });

    it('should emit "add-todo" event with correct data when form is submitted', async () => {
        const wrapper = shallowMount(AddTodoComponent);
        await wrapper.setData({ title: 'Test Todo', dueDate: '2023-12-31' });
        await wrapper.find('v-btn').trigger('click');
        expect(wrapper.emitted('add-todo')).toBeTruthy();
        expect(wrapper.emitted('add-todo')[0]).toEqual([{ title: 'Test Todo', dueDate: '2023-12-31' }]);
    });
});