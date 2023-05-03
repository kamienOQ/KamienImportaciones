
import { App } from './App'
import { ItemDetailContainer } from './Components/itemDetailContainer/ItemDetailContainer'
import { CategoriesPage } from './Pages/categoriesPage'
import { AppTheme } from './theme'

export const ImportsApp = () => {
  return (
    <AppTheme>
      <App />
      {/* <CategoriesPage/> */}
      {/* <ItemDetailContainer/> */}
    </AppTheme>
  )
}