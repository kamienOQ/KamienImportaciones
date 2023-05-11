import { Modal, Box, Typography, Dialog, DialogContent } from '@mui/material';
import { useUiStore, useProductsStore } from '../../hooks';
// import { makeStyles } from '@mui/styles';

useProductsStore

export const ProductView = () => {
    const { closeModalViewProduct, isModalViewOpenProduct } = useUiStore();
    const { activeProduct } = useProductsStore();

    return (
        <Dialog
            className="modal-container-products"
            open={isModalViewOpenProduct}
            onClose={closeModalViewProduct}
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
            <DialogContent 
                className='view-product-container'
                sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexDirection: 'column',
                    outline: 'none',
                    textAlign: 'center',
                    width: 600,
                    height: 630,
                }}
            >
                <img className='view-product-image' src={activeProduct?.image?.url} alt="" />
                <img className='view-product-icon' src={activeProduct?.icon?.url} alt="" />
                <Typography variant="h6">
                    {activeProduct?.productName}
                </Typography>
                <Typography variant='h6'>
                    {activeProduct?.relatedCategories}
                </Typography>
                <Typography variant='h6'>
                    {activeProduct?.relatedAttributes + ' ' + " "}
                </Typography>
                <Typography variant='h6'>
                    {activeProduct?.relatedListAttributes?.feature}
                </Typography>
            </DialogContent>
        </Dialog>
    );
}
