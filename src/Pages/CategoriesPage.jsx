import { MasterPage } from "../Components/MasterPage"
import { CategoriesCards } from "../Components/categories/CategoriesCards"


export const CategoriesPage = () => {
  const listData = [1,2,3,4,5]

  return (
    <>
      <MasterPage filterType='Categories'>
        <CategoriesCards/>
      </MasterPage>
    </>

  )
}
