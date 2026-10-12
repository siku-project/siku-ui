import '@siku/ui/styles.css';
import './app.css';
import { mount } from 'svelte';
import { initSiku } from '@siku/ui';
import App from './App.svelte';

initSiku();
mount(App, { target: document.getElementById('app')! });
