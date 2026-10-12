import '../../src/lib/styles/siku.css';
import { mount } from 'svelte';
import { applyScale, initInput } from '../../src/lib/index';
import App from './App.svelte';
applyScale({ min: 0.8, max: 1.25 }); // la doc se lit dans un navigateur, pas en jeu
initInput();
mount(App, { target: document.getElementById('app')! });
