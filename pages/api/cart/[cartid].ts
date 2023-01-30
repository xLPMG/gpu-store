import type { NextApiRequest, NextApiResponse } from 'next'
import type { CartItem } from '../../../interfaces'


var cartItems: Array<CartItem> = Array();

 export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const requestMethod = req.method;
    const body = JSON.parse(req.body);
    switch (requestMethod) {
        //get cart data
      case 'GET':
        res.status(200).json({ message: `${body}` })
      case 'POST':
        let cart = body as CartItem
        res.status(200).json({ message: ` ${body}` })
      default:
        res.status(200).json({ message: 'use post or get'})
    }
  }

  function addItem(id: number, qty: number) {
      for(let key in cartItems){
       if(cartItems[key].id==id){
        cartItems[key].qty+=qty
       }else{
       cartItems.push({id: id, qty: qty})
       }
       console.log(cartItems[key])
      }
  }

  function removeItem(id: number, qty: number) {
    for(let key in cartItems){
     if(cartItems[key].id==id){
      if(cartItems[key].qty-qty>0){
        cartItems[key].qty-=qty
      }else{
        cartItems.splice(Number(key), 1)
      }
     }else{
     cartItems.splice(Number(key), 1)
     }
     console.log(cartItems[key])
    }
}