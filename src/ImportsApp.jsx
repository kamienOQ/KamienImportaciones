import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme'

import { HelloWorldApp } from './filters/genderFilter'

export const ImportsApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}