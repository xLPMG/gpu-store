import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product } from '../../../interfaces'
import productData from '../../../data/productInfo.json';
import { useRouter } from 'next/router'

export default function productHandler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const { query, method } = req
  var id = req.query

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json(getProductByID(productData, Number(id.productid)))
      break
    case 'PUT':
      // Update or create data in your database
      //res.status(200).json({ id, name, manufacturer, price, imageid: imageid })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

function getProductByID(json, id: number) {
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      var item = json[key];
      if(item.id==id){
        return {
          id: item.id,
          imageid: item.imageid,
          name: item.name,
          manufacturer: item.manufacturer,
          price: item.price
        }
      }
    }
  }
  return null;
}