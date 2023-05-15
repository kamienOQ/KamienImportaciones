import { Drawer,Divider} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { GenderFilter, AttributeFilter} from './'
import {useAttributesStore} from "../hooks";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { startGetAttributesByCategory,cleanAttributesSelected,attributes} = useAttributesStore();

    function handleOpen() {
        startGetAttributesByCategory();
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
    }

    const attributesExample = [  
        {    attributeName: "attribute1",    
        attributesRelated: ["relatedAttribute1", "relatedAttribute2"]
        },
        {
            attributeName: "attribute2",
            attributesRelated: ["relatedAttribute3", "relatedAttribute4"]
        },
        {
            attributeName: "attribute3",
            attributesRelated: ["relatedAttribute5", "relatedAttribute6","relatedAttribute7"]
        }
    ];

    return (
        <div>
        <button onClick={handleOpen}>Abrir sidebar</button>
        <Drawer anchor="left" open={isOpen} onClose={handleClose}>
            <div style={{ width: 300 }}>
            <GenderFilter />
            <Divider />
            <AttributeFilter attributesList = {attributes} />
            </div>
        </Drawer>
        </div>
    );
}
