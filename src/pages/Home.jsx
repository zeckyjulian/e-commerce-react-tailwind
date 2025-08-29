'use client'

import CategorySection from '../components/CategorySection'
import { Footer } from '../components/Footer'
import Head from '../components/Head'
import PromoSection from '../components/PromoSection'
import { ProductList } from './ProductList'

export default function Home() {
  return (
    <div className="bg-white">
        <Head />
        <PromoSection />
        <CategorySection />
        <ProductList />
        <Footer />
    </div>
  )
}
