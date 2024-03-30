import React from 'react'
import Hero from '../components/Hero'
import ProductSections from '../components/ProductSections'
import { useProductContext } from '../Context/ProductContext'
const HomePage = () => {
  const { featureProducts, isLoading, newlyLaunchedProducts } = useProductContext();
  if (isLoading) {
    return (
      <>
        <h1>Home Page Loadiing</h1>
      </>)
  }
  return (
    <div>
      <Hero />
      <ProductSections Data={featureProducts} height='200px' headingName="Feature Products" />
      <ProductSections Data={newlyLaunchedProducts} height='200px' headingName="Newly Launched" />
    </div>
  )
}

export default HomePage