import Head from 'next/head'
import { Inter } from '@next/font/google'
import type { Product } from '../interfaces'
import useSwr from 'swr'
import Link from 'next/link'
import ProductContainer from '../components/ProductContainer'

const inter = Inter({ subsets: ['latin'] })
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error, isLoading } = useSwr<Product[]>('/api/products', fetcher)
  if (error) return <div>Failed to load data</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null
  return (
    <>
      <Head>
        <title>gpu-store</title>
        <meta name="description" content="buy gpus!!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data.map((product) => (
            <ProductContainer name={product.name} id={product.id} price={product.price}></ProductContainer>
          ))}
          </div>
      </main>
    </>
  )
}
