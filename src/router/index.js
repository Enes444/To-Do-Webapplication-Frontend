import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TodoDetailView from '../views/ToDoDetailView.vue';

// Definieren der Routen für die Anwendung
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView // Komponente für die Startseite
    },
    {
        path: '/todo-detail',
        name: 'todo-detail',
        component: TodoDetailView,
        props: route => ({ id: route.query.id }) // id als Query-Parameter
    }
];

// Erstellen des Routers mit Web History-Modus
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes // Hinzufügen der definierten Routen
});

export default router; // Exportieren des Routers zur Verwendung in der Hauptanwendungzur Verwendung in der Hauptanwendung