import { useEffect } from "react"
import { MasterPage } from "../Components/MasterPage"
import { CategoriesCards } from "../Components/categories/CategoriesCards"
import { useCategoriesStore } from "../hooks/useCategoriesStore"
import { CategoriesEmpty } from "../Components/categories/CategoriesEmpty"


export const CategoriesPage = () => {
  const { categories, startGetCategories } = useCategoriesStore();
  
  useEffect(() => {
    startGetCategories();
  }, [])


  return (
    <>
      <MasterPage filterType='Categories'>
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
    </MasterPage>
  </>

  )
}
