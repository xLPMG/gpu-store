import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product } from '../../interfaces'
import productData from '../../data/productInfo.json';

function jsonToArray(json) {
  var array = [];
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      var item = json[key];
      array.push({
        id: item.id,
        imageid: item.imageid,
        name: item.name,
        manufacturer: item.manufacturer,
        price: item.price
      });
    }
  }
  return array;
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {

  res.status(200).json(jsonToArray(productData))
}