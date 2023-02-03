import type { NextApiRequest, NextApiResponse } from 'next'
import { readFileSync, writeFileSync, existsSync } from 'fs';

import type { Cart } from '../../interfaces'
var carts: Array<Cart> = Array();
var cartIDCounter: number = loadCounter()

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<String>
  ) {
    const { query, method } = req
    switch (method) {
      case 'GET':
        console.log("carts: GET")
        res.status(200).json(cartIDCounter+"")
        break
      case 'PUT':
        console.log("carts: PUT")
        cartIDCounter++
        saveCounter(cartIDCounter)
        res.status(201).json(cartIDCounter+"")
        break
      case 'POST':
      default:
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }

  function loadCounter(): number{
    var count: number = <number> JSON.parse(readFileSync("./data/cartCounter.json", 'utf8'));
    return count;
  }

  function saveCounter(count: number){
    writeFileSync("./data/cartCounter.json", count+"", {
      flag: 'w',
    });
  }