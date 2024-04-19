import { useEffect } from 'react';
import { CategoriesCards } from '../Components/categories/CategoriesCards';
import { useCategoriesStore } from '../hooks/useCategoriesStore';
import { CategoriesEmpty } from '../Components/categories/CategoriesEmpty';

export const CategoriesPage = () => {
  const { categories, startGetCategories } = useCategoriesStore();

  useEffect(() => {
    localStorage.setItem('categorySelected', '');
    startGetCategories();
  }, [])

  // Definimos el orden deseado de las categorias
  const desiredOrder = [
    "Lentes",
    "Joyas",
    "Perfumes",
    "Relojes",
    "Relojes deportivos",
    "Bolsos",
    "Tenis",
    "Zapatos",
    "Sandalias"
  ];

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

  return (
    <>
      <>
        {categories.length > 0 ? (
          <div className="grid-container">
            {sortedCategories.map((category) => (
              <CategoriesCards
                key={category.categoryName}
                urlImage={category.image?.url}
                urlIcon={category.icon?.url}
                categoryName={category.categoryName}
              />
            ))}
          </div>)
          : (
            <CategoriesEmpty />
          )}
      </>
    </>
  )
}



