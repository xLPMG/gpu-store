import type { NextApiRequest, NextApiResponse } from 'next'
//vergebe cart ids
import type { Cart } from '../../interfaces'
var carts: Array<Cart> = Array();
var cartIDCounter: number = 0;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<String>
  ) {
    const { query, method } = req
    switch (method) {
      case 'PUT':
        res.status(201).json(cartIDCounter+"")
        cartIDCounter++
        break
      default:
        res.setHeader('Allow', ['PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }