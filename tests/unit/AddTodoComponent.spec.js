import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from '@jest/globals';
import AddTodoComponent from '@/components/AddTodoComponent.vue';

describe('AddTodoComponent.vue', () => {
    // Test, ob das Formular korrekt gerendert wird
    it('sollte das Formular korrekt rendern', () => {
        // Die Komponente mounten
        const wrapper = shallowMount(AddTodoComponent);
        // Überprüfen, ob das Formular existiert
        expect(wrapper.find('v-form').exists()).toBe(true);
    });

    // Test, ob das "add-todo"-Event mit den korrekten Daten ausgelöst wird, wenn das Formular abgeschickt wird
    it('sollte das "add-todo"-Event mit den korrekten Daten auslösen, wenn das Formular abgeschickt wird', async () => {
        // Die Komponente mounten
        const wrapper = shallowMount(AddTodoComponent);
        // Die Daten des Formulars setzen
        await wrapper.setData({ title: 'Test Todo', dueDate: '2023-12-31' });
        // Den Klick auf den Button simulieren
        await wrapper.find('v-btn').trigger('click');
        // Überprüfen, ob das "add-todo"-Event ausgelöst wurde
        expect(wrapper.emitted('add-todo')).toBeTruthy();
        // Überprüfen, ob das "add-todo"-Event die korrekten Daten enthält
        expect(wrapper.emitted('add-todo')[0]).toEqual([{ title: 'Test Todo', dueDate: '2023-12-31' }]);
    });
});