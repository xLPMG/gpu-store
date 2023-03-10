import Head from 'next/head'
import { Inter } from '@next/font/google'
import Cookies from 'universal-cookie';
import type { CartItem } from '../interfaces'
import useSwr from 'swr'
import ProductContainer from '../components/ProductContainer'
import Cart from '../components/Cart'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';

const inter = Inter({ subsets: ['latin'] })
const fetcher = (url: string) => fetch(url).then((res) => res.json())
const cookies = new Cookies();

export async function getStaticProps(context) {
   const resProd = await fetch(checkEnvironment().concat('/api/products'))
   const products = await resProd.json()

   var cartIDCookie: string = cookies.get('cartid')
   var cartID: string = ""

   var hasCookie: boolean = cartIDCookie != undefined
   console.log("has cookie? :" + hasCookie)
   if (hasCookie) {
      console.log("cookie found " + cartIDCookie)
      cartID = cartIDCookie
   }else{
      cartID = await getCartID()
   }

   return {
      props: { products, cartID }
   };
}

export default function Home({ products, cartID }) {
   console.log("set cookie to "+cartID)
   cookies.set('cartid', cartID, { path: '/' });

   var { data: cartItemData, error: cartItemError } = useSwr<CartItem[]>('/api/cart/' + cartID, fetcher)
   if (cartItemError) return <div>Failed to load cartItems</div>
   if (!cartItemData) return <div>Loading...</div>

   var cartItemData: CartItem[]
   return (
      <>
         <Head>
            <title>gpu-store</title>
            <meta name="description" content="buy gpus!!" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
         </Head>
         <main>
         <div id='cart'>
            <p>Your Cart ID: {cartID}</p>
            <ListGroup>
               {
               cartItemData.map((cartItem) => (
                <Cart id={cartItem.id} qty={cartItem.qty} ></Cart>
               ))
               }
            </ListGroup>
            </div>
            <div id='products'>
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
            </div>
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

async function getCartID(): Promise<string> {
   var cartID: string = ""
      var resCartID = await fetch(checkEnvironment().concat('/api/carts'), {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         }
      })
      cartID = await resCartID.json()
   return cartID
}
