import { useNavigate } from 'react-router-dom';
import { useCategoriesStore } from '../../hooks/useCategoriesStore';
import { Skeleton } from '@mui/material';

export const CategoriesCards = ({ urlImage, urlIcon, categoryName }) => {
  const { setCategorySelected } = useCategoriesStore();
  const navigate = useNavigate();

  const onhandleSelectCategory = () => {
    setCategorySelected(categoryName);
    localStorage.setItem('categorySelected', categoryName);
    navigate('/Producto');
  }

  // Determina si se están cargando los datos
  const isLoading = !urlImage || !urlIcon || !categoryName;

  return (
    <div className='container-categoriesCards'>
      <button className="categoriesCards-button"
        onClick={event => {
          event.preventDefault();
          onhandleSelectCategory();
        }}
      >
        {isLoading ? (
          <Skeleton variant='rectangular' width={200} height={200} />
        ) : (
          <>
            <figure className='container-figure-img'>
              <img src={urlImage} alt="" className='categoriesCards-img' loading="lazy" />
            </figure>
            <div className='main-container-categoriesCards-icon'>
              <div className='info-container-categoriesCards '>
                <div className='container-categoriesCards-icon'>
                  <div className='container-categoriesCards-content'>
                    <figure className='container-figure-icon'>
                      <img
                        src={urlIcon}
                        alt=""
                        className='categoriesCards-icon'
                        loading="lazy"
                      />
                    </figure>
                    <h2 className='categoriesCards-text'>{categoryName}</h2>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </button>
    </div>
  )
}
