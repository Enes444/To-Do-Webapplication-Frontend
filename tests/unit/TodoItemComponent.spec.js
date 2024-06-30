import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, jest } from '@jest/globals';
import TodoItemComponent from '@/components/TodoItemComponent.vue';

describe('TodoItemComponent.vue', () => {
    // Beispiel-Todo-Daten
    const todo = {
        id: 1,
        title: 'Test Todo',
        dueDate: '2023-12-31'
    };

    // Wrapper für die Komponente
    let wrapper;

    // Vor jedem Test die Komponente mounten
    beforeEach(() => {
        wrapper = shallowMount(TodoItemComponent, {
            props: { todo }
        });
    });

    // Test, ob die Komponente korrekt gerendert wird
    it('sollte die Komponente korrekt rendern', () => {
        expect(wrapper.find('v-card-title').text()).toBe(todo.title);
        expect(wrapper.find('v-card-subtitle').text()).toBe(`Due: ${wrapper.vm.formatDate(todo.dueDate)}`);
    });

    // Test, ob das Löschen-Event korrekt ausgelöst wird
    it('sollte das "delete-todo"-Event auslösen', async () => {
        await wrapper.find('v-btn[color="red"]').trigger('click');
        expect(wrapper.emitted('delete-todo')).toBeTruthy();
        expect(wrapper.emitted('delete-todo')[0]).toEqual([todo.id]);
    });

    // Test, ob das Details-Event korrekt ausgelöst wird
    it('sollte das "view-details"-Event auslösen', async () => {
        await wrapper.find('v-btn[color="secondary"]').trigger('click');
        expect(wrapper.emitted('view-details')).toBeTruthy();
        expect(wrapper.emitted('view-details')[0]).toEqual([todo]);
    });

    // Test, ob das Bearbeiten-Event korrekt ausgelöst wird
    it('sollte das "update-todo"-Event auslösen', async () => {
        await wrapper.find('v-btn[color="primary"]').trigger('click');
        expect(wrapper.emitted('update-todo')).toBeTruthy();
        expect(wrapper.emitted('update-todo')[0]).toEqual([todo]);
    });

    // Test, ob das Datum korrekt formatiert wird
    it('sollte das Datum korrekt formatieren', () => {
        const formattedDate = wrapper.vm.formatDate(todo.dueDate);
        expect(formattedDate).toBe('2023-12-31');
    });

    // Test, ob die Komponente im Dark Mode korrekt gerendert wird
    it('sollte die Komponente im Dark Mode korrekt rendern', async () => {
        wrapper.vm.$root = { darkMode: true };
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.dark-mode-card').exists()).toBe(true);
    });
});