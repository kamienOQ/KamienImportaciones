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
  Pagination,
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
import ImageBuy from "../assets/imageNavBar.webp";

export const ProductsPage = () => {
  const { startGetAttributesByCategory, setIsOpen, isOpen } =
    useAttributesStore();

  const { closeProductModal, isProductModalOpen } = useUiStore();

  const { products, startGetProducts, message, activeProduct } =
    useProductsStore();

  const { categorySelected, setCategorySelected } = useCategoriesStore();

  const [loading, setLoading] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleSearch(product) {
    setSearchProduct(product);
  }

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  }

  // Products pagination
  const [currentPage, setCurrentPage] = useState(() => {
    // Try to keep the page saved if the category is the same
    const savedPage = Number(localStorage.getItem("currentPage"));
    const savedCategory = localStorage.getItem("CurrentPageCategory");
    return savedCategory === categorySelected && savedPage > 0 ? savedPage : 1;
  });
  const productPerPage = 25;

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchProduct.toLowerCase())
  );

  // Get current products and calculated this actual page
  const totalPages = Math.ceil(filteredProducts.length / productPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productPerPage,
    currentPage * productPerPage
  );

  useEffect(() => {
    // Saved the current page and category in localStorage
    localStorage.setItem("currentPage", currentPage);
    localStorage.setItem("CurrentPageCategory", categorySelected);
  }, [currentPage, categorySelected]);

  // Restart page when change the category
  useEffect(() => {
    setCurrentPage(1);
  }, [categorySelected]);

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

  const gridClassName = searchProduct
    ? "grid-container-search-results"
    : "grid-container-product";
  const gridClassNameComment = searchProduct
    ? "comments-container-search-results"
    : "comments-container";

  return (
    <>
      <Box
        className="animate__animated animate__fadeIn animate__slower"
        sx={{ display: "flex" }}
      >
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
          <Grid
            item
            sx={{
              width: "90%",
              display: "flex",
              alignItems: "center",
              "@media (min-width: 200px)": {
                mt: "-65px",
              },
              "@media (min-width: 250px)": {
                mt: "-220px",
              },
              "@media (min-width: 300px)": {
                mt: "-220px",
              },
              "@media (min-width: 350px)": {
                mt: "-220px",
              },
              "@media (min-width: 400px)": {
                mt: "-220px",
              },
            }}
          >
            <Tooltip title="Filtros">
              <IconButton onClick={handleOpen}>
                <FilterAltIcon
                  sx={{
                    fontSize: 45,
                    "@media (min-width: 200px)": {
                      ml: "-27px",
                      mt: "-120px",
                      fontSize: "38px",
                    },
                    "@media (min-width: 250px)": {
                      ml: "-25px",
                      mt: "40px",
                    },
                    "@media (min-width: 300px)": {
                      ml: "-25px",
                      mt: "50px",
                    },
                    "@media (min-width: 350px)": {
                      ml: "-30px",
                      mt: "-105px",
                      fontSize: "40px",
                    },
                    "@media (min-width: 400px)": {
                      ml: "-30px",
                      mt: "-120px",
                      fontSize: "40px",
                    },
                    "@media (min-width: 700px)": {
                      ml: "-30px",
                      mt: "-124px",
                      fontSize: "42px",
                    },
                    "@media (min-width: 900px)": {
                      ml: "1px",
                      mt: "-120px",
                    },
                    "@media (min-width: 1000px)": {
                      ml: "1px",
                      mt: "-120px",
                    },
                    "@media (min-width: 1100px)": {
                      ml: "1px",
                      mt: "-120px",
                    },
                    "@media (min-width: 1200px)": {
                      ml: "1px",
                      mt: "-120px",
                    },
                    "@media (min-width: 1300px)": {
                      ml: "2px",
                      mt: "-120px",
                    },
                    "@media (min-width: 1400px)": {
                      ml: "1px",
                      mt: "-120px",
                    },
                    "@media (min-width: 1500px)": {
                      mt: "-80px",
                      fontSize: "40px",
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
            <Typography
              className="category-selected animate__animated animate__fadeInLeft animate__slow"
              variant="h4"
              sx={{
                "@media (min-width: 200px)": {
                  mt: "-120px",
                  fontSize: "18px",
                },
                "@media (min-width: 250px)": {
                  mt: "40px",
                  fontSize: "18px",
                },
                "@media (min-width: 300px)": {
                  mt: "50px",
                  fontSize: "28px",
                },
                "@media (min-width: 350px)": {
                  mt: "-100px",
                },
                "@media (min-width: 400px)": {
                  mt: "-120px",
                  fontSize: "30px",
                },
                "@media (min-width: 700px)": {
                  mt: "-120px",
                  fontSize: "30px",
                },
                "@media (min-width: 900px)": {
                  mt: "-120px",
                },
                "@media (min-width: 1100px)": {
                  mt: "-120px",
                },
                "@media (min-width: 1400px)": {},
                "@media (min-width: 1500px)": {
                  mt: "-80px",
                  fontSize: "32px",
                },
              }}
            >
              {categorySelected}
            </Typography>
            <div>
              <Grid
                item
                className="animate__animated animate__fadeInLeft animate__slow"
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "end",
                  "@media (min-width: 200px)": {
                    mt: "60px",
                    ml: "31px",
                  },
                  "@media (min-width: 250px)": {
                    mt: "110px",
                    ml: "-50px",
                  },
                  "@media (min-width: 300px)": {
                    mt: "180px",
                    ml: "-60px",
                  },
                  "@media (min-width: 350px)": {
                    mb: "170px",
                    ml: "-40px",
                  },
                  "@media (min-width: 400px)": {
                    mt: "190px",
                    ml: "-26px",
                  },
                  "@media (min-width: 450px)": {
                    mt: "190px",
                    ml: "-15px",
                  },
                  "@media (min-width: 500px)": {
                    mt: "190px",
                    ml: "-10px",
                  },
                  "@media (min-width: 550px)": {
                    mt: "190px",
                    ml: "-10px",
                  },
                  "@media (min-width: 600px)": {
                    mt: "190px",
                    ml: "-10px",
                  },
                  "@media (min-width: 650px)": {
                    mt: "190px",
                    ml: "-15px",
                  },
                  "@media (min-width: 700px)": {
                    mt: "170px",
                    ml: "-10px",
                  },
                  "@media (min-width: 750px)": {
                    mt: "170px",
                    ml: "2px",
                  },
                  "@media (min-width: 800px)": {
                    mt: "180px",
                    ml: "20px",
                  },
                  "@media (min-width: 850px)": {
                    mt: "180px",
                    ml: "25px",
                  },
                  "@media (min-width: 900px)": {
                    mt: "180px",
                    ml: "30px",
                  },
                  "@media (min-width: 950px)": {
                    mt: "180px",
                    ml: "30px",
                  },
                  "@media (min-width: 1000px)": {
                    mt: "180px",
                    ml: "45px",
                  },
                  "@media (min-width: 1050px)": {
                    mt: "180px",
                    ml: "50px",
                  },
                  "@media (min-width: 1100px)": {
                    mt: "180px",
                    ml: "80px",
                  },
                  "@media (min-width: 1150px)": {
                    mt: "180px",
                    ml: "100px",
                  },
                  "@media (min-width: 1200px)": {
                    mt: "180px",
                    ml: "130px",
                  },
                  "@media (min-width: 1250px)": {
                    mt: "180px",
                    ml: "150px",
                  },
                  "@media (min-width: 1300px)": {
                    mt: "180px",
                    ml: "176px",
                  },
                  "@media (min-width: 1350px)": {
                    mt: "180px",
                    ml: "200px",
                  },
                  "@media (min-width: 1400px)": {
                    mt: "180px",
                    ml: "210px",
                  },
                  "@media (min-width: 1450px)": {
                    mt: "180px",
                    ml: "250px",
                  },
                  "@media (min-width: 1500px)": {
                    mt: "180px",
                    ml: "270px",
                  },
                  "@media (min-width: 1550px)": {
                    mt: "180px",
                    ml: "270px",
                  },
                  "@media (min-width: 1600px)": {
                    mt: "180px",
                    ml: "290px",
                  },
                  "@media (min-width: 1650px)": {
                    mt: "180px",
                    ml: "310px",
                  },
                  "@media (min-width: 1700px)": {
                    mt: "180px",
                    ml: "330px",
                  },
                  "@media (min-width: 1750px)": {
                    mt: "180px",
                    ml: "320px",
                  },
                  "@media (min-width: 1800px)": {
                    mt: "180px",
                    ml: "340px",
                  },
                  "@media (min-width: 1850px)": {
                    mt: "180px",
                    ml: "360px",
                  },
                  "@media (min-width: 1900px)": {
                    mt: "180px",
                    ml: "370px",
                  },
                }}
              >
                <img
                  src={ImageBuy}
                  className="image-buy-secure"
                  alt="Imagen compra segura"
                />
              </Grid>
            </div>
          </Grid>

          <div className="animate__animated animate__fadeInLeft animate__slow">
            <Carousel slides={imagePaths} options={numberOfImages} />
          </div>

          <Grid
            item
            className="animate__animated animate__fadeInLeft animate__slow"
            sx={{
              width: "90%",
              display: "flex",
              justifyContent: "start",
              "@media (min-width: 200px)": {
                mt: "-60px",
                mb: "-40px;",
                ml: "-15px",
              },
              "@media (min-width: 250px)": {
                mt: "-60px;",
                mb: "-20px;",
                ml: "-12px;",
              },
              "@media (min-width: 300px)": {
                mt: "-20px;",
                mb: "-30px;",
                ml: "-12px;",
              },
              "@media (min-width: 350px)": {
                mt: "-159px;",
                mb: "-30px;",
                ml: "-24px;",
              },
              "@media (min-width: 400px)": {
                mt: "-140px;",
                mb: "-25px;",
                ml: "-20px;",
              },
              "@media (min-width: 450px)": {
                mt: "-110px;",
                mb: "-20px;",
                ml: "-20px;",
              },
              "@media (min-width: 500px)": {
                mt: "-90px;",
                mb: "-20px;",
                ml: "-20px;",
              },
              "@media (min-width: 550px)": {
                mt: "-90px;",
                mb: "-25px;",
                ml: "-18px;",
              },
              "@media (min-width: 600px)": {
                mt: "-80px;",
                mb: "-25px;",
                ml: "-20px;",
              },
              "@media (min-width: 650px)": {
                mt: "-50px;",
                mb: "-20px;",
                ml: "-18px;",
              },
              "@media (min-width: 700px)": {
                mt: "-10px;",
                ml: "-20px;",
              },
              "@media (min-width: 750px)": {
                ml: "-18px;",
                mb: "5px;",
              },
              "@media (min-width: 800px)": {
                ml: "-20px;",
                mb: "5px;",
              },
              "@media (min-width: 830px)": {
                ml: "-20px;",
                mb: "5px;",
              },
              "@media (min-width: 850px)": {
                ml: "-20px;",
                mb: "5px;",
              },
              "@media (min-width: 900px)": {
                ml: "38px;",
                mb: "-5px;",
              },
              "@media (min-width: 950px)": {
                ml: "40px;",
                mb: "-5px;",
              },
              "@media (min-width: 1000px)": {
                ml: "34px;",
                mb: "5px;",
              },
              "@media (min-width: 1050px)": {
                ml: "32px;",
                mb: "5px;",
              },
              "@media (min-width: 1100px)": {
                ml: "30px;",
                mb: "5px;",
              },
              "@media (min-width: 1150px)": {
                ml: "35px;",
                mb: "5px;",
              },
              "@media (min-width: 1200px)": {
                ml: "32px;",
                mb: "5px;",
              },
              "@media (min-width: 1250px)": {
                ml: "35px;",
                mb: "5px;",
              },
              "@media (min-width: 1300px)": {
                ml: "32px;",
                mb: "5px;",
              },
              "@media (min-width: 1350px)": {
                ml: "30px;",
                mb: "5px;",
              },
              "@media (min-width: 1400px)": {
                ml: "35px;",
                mb: "5px;",
                mt: "15px",
              },
              "@media (min-width: 1450px)": {
                ml: "35px;",
                mb: "5px;",
              },
              "@media (min-width: 1500px)": {
                ml: "34px;",
                mb: "5px;",
              },
              "@media (min-width: 1550px)": {
                ml: "24px;",
                mb: "5px;",
              },
              "@media (min-width: 1600px)": {
                ml: "27px;",
                mb: "5px;",
              },
              "@media (min-width: 1650px)": {
                mt: "15px;",
                ml: "29px;",
                mb: "5px;",
              },
              "@media (min-width: 1700px)": {
                mt: "15px;",
                ml: "25px;",
                mb: "5px;",
              },
              "@media (min-width: 1750px)": {
                ml: "26px;",
              },
              "@media (min-width: 1800px)": {
                ml: "36px;",
              },
              "@media (min-width: 1850px)": {
                ml: "25px;",
              },
            }}
          >
            <SearchProduct onSearch={handleSearch} />
          </Grid>

          {loading ? (
            <Spinner />
          ) : paginatedProducts.length > 0 ? (
            <>
              <div
                className={`${gridClassName} ${paginatedProducts.length <= 10 ? "small-grid" : ""
                  }`}
              >
                {paginatedProducts.map((product) => (
                  <ProductsCards
                    key={product.productName}
                    price={product.price}
                    relatedListAttributes={
                      Array.isArray(product.relatedListAttributes)
                        ? product.relatedListAttributes.map(
                          (item) => item.feature
                        )
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
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  siblingCount={1}
                  boundaryCount={1}
                />
              </Box>
            </>
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
      <div
        className={`${gridClassNameComment} ${filteredProducts.length <= 10 ? "small" : ""
          }`}
      >
        <CommentsCard />
      </div>
    </>
  );
};
