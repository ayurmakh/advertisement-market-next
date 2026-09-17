'use client'

import Form, { UiElement } from "@/components/form";
import { UI_TYPE } from "@/components/form/ui-type";
import { NewGoodState } from "./types";
import { createGood } from "./actions/create-good";

const initialState: NewGoodState = {
    success: false,
};

const elements: UiElement[] = [
    { uiType: UI_TYPE.input, name: 'title', label: 'Title', type: 'text' },
    { uiType: UI_TYPE.textarea, name: 'description', label: 'Description' },
    { uiType: UI_TYPE.inputNumber, name: 'price', label: 'Price', type: 'number', step: '0.01', min: '0' },
    { uiType: UI_TYPE.file, name: 'images', label: 'Images', type: 'file', accept: 'image/*', multiple: true },
];

export default function NewGood() {
    return (
        <>
            <h3>New good</h3>
            <Form
                elements={elements}
                formAction={createGood}
                initialState={initialState}
            />
        </>
    );
}
