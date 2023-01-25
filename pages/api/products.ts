import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product } from '../../interfaces'

const products: Product[] = [{ id: 1, name: "RX 6700", price: 10 }, { id: 2, name: "RX 6700XT", price: 10 }, { id: 3, name: "RX 6750XT", price: 10 }]

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {

  res.status(200).json(products)
}