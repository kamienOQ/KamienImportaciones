import { Drawer,Divider} from '@mui/material';
import React from 'react';
import { GenderFilter, AttributeFilter} from './'
import {useAttributesStore} from '../hooks';

export const Sidebar = () => {
    const { attributes, setIsOpen, isOpen} = useAttributesStore();

    function handleClose() {
        setIsOpen(false);
    }

    return (
        <div>
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
