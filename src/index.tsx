import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import { Button } from './components/button';

interface IPhaserEvent extends Event {
    detail: {
        data: string;
    }
}

const App = () => {
    // Create a state that will be shared between phaser and react
    const [count, setCount] = useState<number>(0);
    const [hidden, setHidden] = useState<boolean>(true);

    useEffect(() => {
        // Add a global event listener to the window
        window.addEventListener('phaser', (event) => {
            const e = event as IPhaserEvent;

            if (e.detail.data === 'ui') {
                setHidden(prevState => !prevState);
            }

            if (e.detail.data === 'count') {
                window.dispatchEvent(new CustomEvent('react', { detail: { data: count } }));
            }

        });
    }, []);

    if (hidden) return null;
    else return (
        // Overlay the react app on top of the phaser app
        <div style={{ position: 'absolute', }}>
            <h1>Welcome to my app {count}</h1>
            <Button onClick={() => {
                setCount(prevState => prevState + 1);
                window.dispatchEvent(new CustomEvent('react', { detail: { data: count } }));
            }} />

        </div>
    );

}

const root = createRoot(document.getElementById('app')!);
root.render(<App />);