import Head from 'next/head'
import { Inter } from '@next/font/google'
import type { Product } from '../interfaces'
import useSwr from 'swr'
import Link from 'next/link'
import ProductContainer from '../components/ProductContainer'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
        <Tabs
          defaultActiveKey="amd"
          id="uncontrolled-tab-example"
          className="mb-3">
          <Tab eventKey="amd" title="AMD">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {data.map((product) => (
                product.manufacturer == "AMD"
                  ? (<ProductContainer id={product.id} name={product.name} manufacturer={product.manufacturer} price={product.price}></ProductContainer>) : null
              ))}
            </div>
          </Tab>
          <Tab eventKey="nvidia" title="NVIDIA">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {data.map((product) => (
                product.manufacturer == "NVIDIA"
                  ? (<ProductContainer id={product.id} name={product.name} manufacturer={product.manufacturer} price={product.price}></ProductContainer>) : null
              ))}
            </div>
          </Tab>
        </Tabs>
      </main>
    </>
  )
}
