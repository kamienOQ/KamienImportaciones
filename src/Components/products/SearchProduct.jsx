import { Box, Button } from '@mui/material';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import './css/styless.css';

export const SearchProduct = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleClear = () => {
        onSearch('');
        // Borrar el texto del input
        setSearchTerm('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle search logic here
        onSearch(searchTerm);
    }

    return (
        <div className="search-product" >
            <h4 className='title-search'>Buscar producto</h4>
            <hr />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Producto a buscar"
                    className="form-control"
                    name="searchText"
                    autoComplete="off"
                    value={searchTerm}
                    onChange={handleChange}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button type='submit' className='search-button' style={{textTransform: 'none'}} endIcon={<SearchIcon />}>
                        Buscar
                    </Button>

                    <Button className='deleteSearch-button' style={{textTransform: 'none'}} onClick={handleClear} endIcon={<ClearIcon />}>
                        Borrar
                    </Button>
                </Box>

            </form>
        </div>
    );
}
