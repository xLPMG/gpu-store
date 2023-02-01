import type { NextApiRequest, NextApiResponse } from 'next'
import type { CartItem } from '../../../interfaces'
import { readFileSync, writeFileSync, existsSync } from 'fs';

var cartItems: CartItem[] = []
var cartID: string

 export default function handler(req: NextApiRequest, res: NextApiResponse<CartItem[]>) {
    const requestMethod = req.method;
    const productType = req.query
    cartID = productType.cartid
    if (existsSync("./data/carts/cart-"+cartID+".json")) {
      cartItems = <CartItem[]> JSON.parse(readFileSync("./data/carts/cart-"+cartID+".json"));
    }else{
      cartItems = [];
    }
  
    switch (requestMethod) {
      case 'GET':
        res.status(200).json(cartItems)
        break
      case 'POST':
        let item = req.body as CartItem
          addItem(item.id, item.qty);
          syncWriteFile(cartItems)
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

  function syncWriteFile(data) {
    /**
     * flags:
     *  - w = Open file for reading and writing. File is created if not exists
     *  - a+ = Open file for reading and appending. The file is created if not exists
     */
    writeFileSync("./data/carts/cart-"+cartID+".json", JSON.stringify(cartItems), {
      flag: 'w',
    });
  }

  function jsonToArray(json) {
    var array = [];
    for (var key in JSON.parse(json)) {
      if (json.hasOwnProperty(key)) {
        var item = json[key];
        array.push({
          id: item.id,
          qty: item.qty
        });
      }
    }
    return array;
  }