import type { NextApiRequest, NextApiResponse } from 'next'
import type { CartItem } from '../../../interfaces'

var cartItems: Array<CartItem> = Array();
 export default function handler(req: NextApiRequest, res: NextApiResponse<Array<CartItem>>) {
    const requestMethod = req.method;

    switch (requestMethod) {
      case 'GET':
        break;
      case 'POST':
        let item = req.body as CartItem
        if(item.qty>=0){
          addItem(item.id, item.qty);
        }else{
          removeItem(item.id, item.qty)
        }
        res.status(200).json(cartItems)
      default:
    }
  }

  function addItem(id: number, qty: number) {
    let contains: boolean=false
    for(let key in cartItems){
      if(cartItems[key].id==id){
        console.log("contains")
        cartItems[key].qty+=qty
        contains=true
      }
    }
    if(!contains){
      cartItems.push({id: id, qty: qty})
    }
  }

  function removeItem(id: number, qty: number) {
    for(let key in cartItems){
     if(cartItems[key].id==id){
      if(cartItems[key].qty+qty>0){
        cartItems[key].qty+=qty
      }else{
        cartItems.splice(Number(key), 1)
      }
     }else{
     cartItems.splice(Number(key), 1)
     }
     console.log(cartItems[key])
    }
}