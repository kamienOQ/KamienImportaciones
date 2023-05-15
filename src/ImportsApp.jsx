import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme'

export const ImportsApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}