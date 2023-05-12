import { useEffect } from "react"
import { CategoriesCards } from "../Components/categories/CategoriesCards"
import { useCategoriesStore } from "../hooks/useCategoriesStore"
import { CategoriesEmpty } from "../Components/categories/CategoriesEmpty"


export const CategoriesPage = () => {
  const { categories, startGetCategories } = useCategoriesStore();

  useEffect(() => {
    localStorage.setItem('categorySelected', '');
    startGetCategories();
  }, [])


  return (
    <>
      {categories.length > 0 ? (
        <div className="grid-container">
          {categories.map((category) => (
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

  )
}