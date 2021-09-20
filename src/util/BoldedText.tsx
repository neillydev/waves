import React from "react";

export default function BoldedText(text: string, shouldBeBold: string) {
    const textArray = text.split(shouldBeBold);
    return (
        <span>
            {textArray.map((item, index) => (
                <>
                    {item}
                    {index !== textArray.length - 1 && (
                        <b>{shouldBeBold}</b>
                    )}
                </>
            ))}
        </span>
    );
}