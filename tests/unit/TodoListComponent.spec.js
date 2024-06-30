import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import TodoListComponent from '@/components/TodoListComponent.vue';
import axios from 'axios';

// Mocking von axios, um sein Verhalten in Tests zu kontrollieren
jest.mock('axios');

describe('TodoListComponent.vue', () => {
    let wrapper;

    // Vor jedem Test die Komponente mounten
    beforeEach(() => {
        wrapper = shallowMount(TodoListComponent);
    });

    // Test, ob der Todo-Listen-Container gerendert wird
    it('sollte den Todo-Listen-Container rendern', () => {
        expect(wrapper.find('.todo-list-container').exists()).toBe(true);
    });

    // Test, ob Todos beim Mounten der Komponente abgerufen werden
    it('sollte Todos beim Mounten abrufen', async () => {
        const todos = [
            { id: 1, title: 'Test Todo 1', dueDate: '2023-12-31' },
            { id: 2, title: 'Test Todo 2', dueDate: '2024-01-01' }
        ];
        axios.get.mockResolvedValue({ data: todos });

        await wrapper.vm.fetchTodos();
        expect(wrapper.vm.todos).toEqual(todos);
    });

    // Test, ob ein neues Todo korrekt hinzugefügt wird
    it('sollte ein neues Todo hinzufügen', async () => {
        const newTodo = { id: 3, title: 'Neues Todo', dueDate: '2024-02-01' };
        axios.post.mockResolvedValue({ data: newTodo });

        await wrapper.vm.addTodo(newTodo);
        expect(wrapper.vm.todos).toContainEqual(newTodo);
    });

    // Test, ob ein Todo korrekt gelöscht wird
    it('sollte ein Todo löschen', async () => {
        const todos = [
            { id: 1, title: 'Test Todo 1', dueDate: '2023-12-31' },
            { id: 2, title: 'Test Todo 2', dueDate: '2024-01-01' }
        ];
        wrapper.setData({ todos });
        axios.delete.mockResolvedValue({});

        await wrapper.vm.deleteTodo(1);
        expect(wrapper.vm.todos).toEqual([{ id: 2, title: 'Test Todo 2', dueDate: '2024-01-01' }]);
    });

    // Test, ob der Bearbeitungsdialog geöffnet und geschlossen wird
    it('sollte den Bearbeitungsdialog öffnen und schließen', () => {
        const todo = { id: 1, title: 'Test Todo 1', dueDate: '2023-12-31' };
        wrapper.vm.openEditDialog(todo);
        expect(wrapper.vm.editDialog).toBe(true);
        expect(wrapper.vm.editedTodo).toEqual(todo);

        wrapper.vm.closeEditDialog();
        expect(wrapper.vm.editDialog).toBe(false);
    });

    // Test, ob ein bearbeitetes Todo gespeichert wird
    it('sollte ein bearbeitetes Todo speichern', async () => {
        const todos = [
            { id: 1, title: 'Test Todo 1', dueDate: '2023-12-31' }
        ];
        const editedTodo = { id: 1, title: 'Aktualisiertes Todo', dueDate: '2023-12-31' };
        wrapper.setData({ todos, editedTodo, editDialog: true });
        axios.put.mockResolvedValue({ data: editedTodo });

        await wrapper.vm.saveEdit();
        expect(wrapper.vm.todos).toEqual([editedTodo]);
        expect(wrapper.vm.editDialog).toBe(false);
    });

    // Test, ob zur Detailansicht eines Todos navigiert wird
    it('sollte zur Detailansicht eines Todos navigieren', () => {
        const todo = { id: 1, title: 'Test Todo 1', dueDate: '2023-12-31' };
        const push = jest.fn();
        wrapper.vm.$router = { push };

        wrapper.vm.viewDetails(todo);
        expect(push).toHaveBeenCalledWith({ name: 'todo-detail', query: { id: todo.id } });
    });
});