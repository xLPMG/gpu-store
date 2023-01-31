import type { NextApiRequest, NextApiResponse } from 'next'
import type { CartItem } from '../../../interfaces'

var cartItems: CartItem[] = [];
 export default function handler(req: NextApiRequest, res: NextApiResponse<CartItem[]>) {
    const requestMethod = req.method;

    switch (requestMethod) {
      case 'GET':
        res.status(200).json(cartItems)
        break
      case 'POST':
        let item = req.body as CartItem
          addItem(item.id, item.qty);
        res.status(200).json(cartItems)
        break
      default:
        res.status(200).json(cartItems)
        break
    }
  }

  function addItem(id: number, qty: number) {
    let contains: boolean=false
    for(let key in cartItems){
      if(cartItems[key].id==id){
        cartItems[key].qty+=qty
        contains=true
      }
    }
    if(!contains){
      cartItems.push({id: id, qty: qty})
    }
  }