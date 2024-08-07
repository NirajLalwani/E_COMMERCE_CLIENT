import React from 'react'
import Hero from '../components/Hero'
import ProductSections from '../components/ProductSections'
import { useProductContext } from '../Context/ProductContext'
import Loading from '../components/Loading'
const HomePage = () => {
  const { featureProducts, isLoading, newlyLaunchedProducts } = useProductContext();
  if (isLoading) {
    return (
      <>
        <isLoading />
      </>)
  }
  return (
    <div className='HomePage'>
      <Hero />
      <ProductSections Data={featureProducts} height='200px' headingName="Feature Products" />
      <ProductSections Data={newlyLaunchedProducts} height='200px' headingName="Newly Launched" />
    </div>
  )
  
}   

export default HomePage