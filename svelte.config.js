import adapter from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';

const config = {
    kit: {
        adapter: adapter()
    },
    preprocess: [mdsvex()],
    extensions: ['.svelte', '.svx']
};

export default config;
