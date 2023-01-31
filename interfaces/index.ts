export type Product = {
    id: number,
    name: string,
    manufacturer: string,
    price: number,
    imageid?: string
  }
export type CartItem =  {
    id: number,
    qty: number
 }

 export type Cart =  {
  id: number
  items: Array<CartItem>
}