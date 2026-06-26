import { SystemBuilderProvider } from './context/SystemBuilderProvider'
import { BundleBuilderPage } from './pages/BundleBuilder/BundleBuilderPage'

function App() {
  return (
    <SystemBuilderProvider>
      <BundleBuilderPage />
    </SystemBuilderProvider>
  )
}

export default App
