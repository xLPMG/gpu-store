import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product } from '../../../interfaces'

export default function productHandler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const { query, method } = req
  const id = parseInt(query.id as string, 10)
  const name = query.name as string
  const price = parseInt(query.price as string, 10)

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ id, name: name, price: price })
      break
    case 'PUT':
      // Update or create data in your database
      res.status(200).json({ id, name, price })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}