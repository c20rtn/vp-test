import { ProductsPage } from "../components/pages/productsPage"
import { ProductsProvider } from "../context/productsContext"

const Home = () => {
  return (
    <ProductsProvider>
      <ProductsPage />
    </ProductsProvider>
  )
}

export default Home