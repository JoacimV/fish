import React from "react";

export interface ButtonProps {
    onClick: () => void;
}

export function Button(props: ButtonProps): JSX.Element {
    // Create a function that will be called when the button is clicked
    function handleClick() {
        props.onClick();
    }

    return (
        <button onClick={handleClick}>
            <h1>my button</h1>
        </button>
    );

}