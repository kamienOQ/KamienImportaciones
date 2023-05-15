import { Drawer,Divider} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { GenderFilter, AttributeFilter} from './'
import {useAttributesStore} from "../hooks";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { startGetAttributesByCategory,cleanAttributesSelected} = useAttributesStore();

    function handleOpen() {
        startGetAttributesByCategory();
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
    }

    return (
        <div>
        <button onClick={handleOpen}>Abrir sidebar</button>
        <Drawer anchor="left" open={isOpen} onClose={handleClose}>
            <div style={{ width: 300 }}>
            <GenderFilter />
            <Divider />
            <AttributeFilter />
            </div>
        </Drawer>
        </div>
    );
}
