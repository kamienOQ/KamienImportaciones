import { CategoriesCards } from '../Components/categories/CategoriesCards';
import { CategoriesEmpty } from '../Components/categories/CategoriesEmpty';
import { useCategoriesStore } from '../hooks/useCategoriesStore';
import { useEffect, useState } from 'react';

export const CategoriesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { categories, startGetCategories } = useCategoriesStore();

  useEffect(() => {
    localStorage.setItem('categorySelected', '');
    startGetCategories();
  }, [])

  console.log(categories);

  // Definimos el orden deseado de las categorias
  const desiredOrder = [
    "Lentes",
    "Perfumes",
    "Relojes",
    "Relojes deportivos",
    "Bolsos",
    "Tennis",
    "Zapatos",
    "Sandalias",
    "Anime",
    "Ropa Deportiva",
    "Accesorios para Celulares",
    "En Promoción ",
  ];

  /* Usamos el arreglo categories directamente después de obtenerlo del hook 
  useCategoriesStore(). Sin embargo, los arrays retornados por hooks en 
  React son inmutables, por lo que no puedes modificarlos directamente.*/

  // Copiamos el arreglo de categorías para evitar modificar el original
  const sortedCategories = [...categories];

  // Ordenamos el arreglo de categorías según el orden deseado
  sortedCategories.sort((a, b) => {
    // Obtenemos el índice de cada categoría en el arreglo de orden deseado
    const indexA = desiredOrder.indexOf(a.categoryName);
    const indexB = desiredOrder.indexOf(b.categoryName);

    // Comparamos los índices y retornamos el resultado de la comparación
    if (indexA === -1) return 1; // Si no se encuentra en desiredOrder, se coloca al final
    if (indexB === -1) return -1; // Si no se encuentra en desiredOrder, se coloca al inicio
    return indexA - indexB; // Ordenamos según los índices en desiredOrder
  });

  const handleSelectCategory = (categoryName) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Esperar 4 segundos antes de cargar la nueva categoría
  };

  return (
    <>
      <>
        <div className='categories-page'>
          {isLoading ? (
            <CategoriesEmpty />
          ) : (
            <div className='categories-grid'>
              {categories.length > 0 ? (
                <div className="grid-container">
                  {sortedCategories.map((category) => (
                    <CategoriesCards
                      key={category.categoryName}
                      urlImage={category.image?.url}
                      urlIcon={category.icon?.url}
                      categoryName={category.categoryName}
                      onSelectCategory={handleSelectCategory}
                    />
                  ))}
                </div>)
                : (
                  <CategoriesEmpty />
                )}
            </div>
          )}
        </div>
      </>
    </>
  )
}



