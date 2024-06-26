import { useEffect, useState } from "react";
import { useProductsStore } from "../hooks/useProductsStore";
import { ProductsEmpty } from "../Components/products/ProductsEmpty";
import { ProductsCards } from "../Components/products/ProductsCards";
import { useUiStore } from "../hooks/useUiStore";
import { ProductsModalDetail } from "../Components/products/ProductsModalDetail";
import { useCategoriesStore } from "../hooks/useCategoriesStore";
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  Box,
  CircularProgress,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { GenderFilter, AttributeFilter } from "../filters";
import { useAttributesStore } from "../hooks";
import Carousel from "../Components/Carousel/Carousel";
import { imagePaths, numberOfImages } from "./NoticesImages";
import { CommentsCard } from "../Components/ClientsComments/CommentsCard";
import { SearchProduct } from "../Components/products/SearchProduct";
import Spinner from "../Spinner";

export const ProductsPage = () => {
  const { startGetAttributesByCategory, setIsOpen, isOpen } =
    useAttributesStore();
  const { closeProductModal, isProductModalOpen } = useUiStore();
  const { products, startGetProducts, message, activeProduct } =
    useProductsStore();
  const { categorySelected, setCategorySelected } = useCategoriesStore();

  const [loading, setLoading] = useState(false);
  const [searchProduct, setSearchProduct] = useState('');

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleSearch(product) {
    setSearchProduct(product);
  }

  useEffect(() => {
    if (!!message.success) {
      closeProductModal();
    }
  }, [message.success]);

  useEffect(() => {
    setCategorySelected(localStorage.getItem("categorySelected"));
    setLoading(true);
    startGetProducts(categorySelected);
    startGetAttributesByCategory();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [categorySelected]);

  const filteredProducts = products.filter((product) => 
    product.productName.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const gridClassName = searchProduct ? 'grid-container-search-results' : 'grid-container-product';
  const gridClassNameComment = searchProduct ? 'comments-container-search-results' : 'comments-container';

  return (
    <>
      <Box className="animate__animated animate__fadeIn animate__slower" sx={{ display: "flex" }}>
        <div>
          <Drawer
            anchor="left"
            open={isOpen}
            onClose={handleClose}
            variant="persistent"
          >
            <div style={{ width: 300 }}>
              <IconButton onClick={handleClose}>
                <ChevronLeftIcon />
              </IconButton>
              <GenderFilter />
              <Divider />
              <AttributeFilter />
            </div>
          </Drawer>
        </div>
        <Grid
          container
          className={`secundary-products-container ${isOpen ? "open" : ""}`}
          spacing={2}
          sx={{
            padding: 2,
            mt: 6,
            borderRadius: 1.2,
            display: "flex",
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item sx={{ width: "90%", display: "flex", alignItems: "center" }}>
            <Tooltip title="Filtros">
              <IconButton onClick={handleOpen}>
                <FilterAltIcon sx={{ fontSize: 45 }} />
              </IconButton>
            </Tooltip>
            <Typography className="category" variant="h4">
              {categorySelected}
            </Typography>
          </Grid>

          <div>
            <Carousel slides={imagePaths} options={numberOfImages} />
          </div>

          <Grid item sx={{ width: "90%", display: "flex", justifyContent: 'start' }}>
            <SearchProduct onSearch={handleSearch} />
          </Grid>

          {loading ? (
            <Spinner />
          ) : filteredProducts.length > 0 ? (
            <div className={`${gridClassName} ${filteredProducts.length <=  10 ? 'small-grid' : ''}`}>
              {filteredProducts.map((product) => (
                <ProductsCards
                  key={product.productName}
                  price={product.price}
                  relatedListAttributes={
                    Array.isArray(product.relatedListAttributes)
                      ? product.relatedListAttributes.map((item) => item.feature)
                      : []
                  }
                  urlImage={product.image?.url}
                  urlIcon={product.icon?.url}
                  urlPhoto={product.photo?.url}
                  productName={product.productName}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <ProductsEmpty />
          )}
          {isProductModalOpen && (
            <ProductsModalDetail
              key={activeProduct.productName}
              price={activeProduct.price}
              relatedListAttributes={activeProduct.relatedListAttributes}
              relatedAttributes={Array.from(
                new Set(
                  activeProduct.relatedListAttributes.map(
                    (item) => item.attributeSelected
                  )
                )
              )}
              urlImage={activeProduct.urlImage}
              urlIcon={activeProduct.urlIcon}
              urlPhoto={activeProduct.photo?.url}
              productName={activeProduct.productName}
              product={activeProduct}
            />
          )}
        </Grid>
      </Box>
      <div className={`${gridClassNameComment} ${filteredProducts.length <= 10 ? 'small' : ''}`}>
        <CommentsCard />
      </div>
    </>
  );
};
