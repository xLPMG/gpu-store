import Head from 'next/head'
import { Inter } from '@next/font/google'
import Cookies from 'universal-cookie';
import type { CartItem } from '../interfaces'
import useSwr from 'swr'
import ProductContainer from '../components/ProductContainer'
import Cart from '../components/Cart'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { hasCookie, getCookie, setCookie } from 'cookies-next';

const inter = Inter({ subsets: ['latin'] })
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export async function getStaticProps(context) {
   const resProd = await fetch(checkEnvironment().concat('/api/products'))
   const products = await resProd.json()
   return {
      props: { products }
   };
}

export default function Home({ products }) {

   const cookies = new Cookies();
   var cartItemData: CartItem[]
   var cartID: string
   var cartIDCookie: string = cookies.get('cartid')
   console.log("hascookie " + cartIDCookie)
   if (cartIDCookie != undefined) {
      console.log("cookie found " + cartIDCookie)
      cartID = cartIDCookie
   } else {
      fetch('/api/carts', {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         }
      })
      var { data: cartIDData, error: cartIDError } = useSwr('/api/carts', fetcher)
      
      if (!cartIDData) return <div>Loading...</div>

      cartID = JSON.stringify(cartIDData)
      console.log("set cart cookie " + JSON.stringify(cartIDData))
      cookies.set('cartid', cartID, { path: '/' });
   }
   var { data: cartItemData, error: cartItemError } = useSwr<CartItem[]>('/api/cart/' + cartID, fetcher)
   if (cartItemError) return <div>Failed to load cartItems</div>
   if (!cartItemData) return <div>Loading...</div>

   return (
      <>
         <Head>
            <title>gpu-store</title>
            <meta name="description" content="buy gpus!!" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
         </Head>
         <main>
            <Button variant="dark">get a cart id</Button>
            <p>Your Cart ID: {cartID}</p>
            <ListGroup>
               {cartItemData.map((cartItem) => (
                  <Cart id={cartItem.id} qty={cartItem.qty} ></Cart>
               ))}
            </ListGroup>
            <Tabs
               defaultActiveKey="amd"
               id="uncontrolled-tab-example"
               className="mb-3">
               <Tab eventKey="amd" title="AMD">
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                     {products.map((product) => (
                        product.manufacturer == "AMD"
                           ? (<ProductContainer id={product.id} name={product.name} manufacturer={product.manufacturer} price={product.price} imageid={product.imageid || "/placeholder.jpeg"} cartId={cartID}></ProductContainer>) : null
                     ))}
                  </div>
               </Tab>
               <Tab eventKey="nvidia" title="NVIDIA">
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                     {products.map((product) => (
                        product.manufacturer == "NVIDIA"
                           ? (<ProductContainer id={product.id} name={product.name} manufacturer={product.manufacturer} price={product.price} imageid={product.imageid || "/placeholder.jpeg"} cartId={cartID}></ProductContainer>) : null
                     ))}
                  </div>
               </Tab>
               <Tab eventKey="intel" title="Intel">
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                     {products.map((product) => (
                        product.manufacturer == "Intel"
                           ? (<ProductContainer id={product.id} name={product.name} manufacturer={product.manufacturer} price={product.price} imageid={product.imageid || "/placeholder.jpeg"} cartId={cartID}></ProductContainer>) : null
                     ))}
                  </div>
               </Tab>
            </Tabs>
         </main>
      </>
   )
}

export const checkEnvironment = () => {
   let base_url =
      process.env.NODE_ENV === "development"
         ? "http://localhost:3000"
         : "https://example.com";

   return base_url;
};
