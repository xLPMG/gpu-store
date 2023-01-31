import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import type { Product } from '../interfaces'
import styles from '../styles/components/ProductContainer.module.css';
import Router from "next/router";

function MainContainer(product, cartId) {
  return (
    <Card className={styles.card}>
      <Card.Img variant="top" src={product.imageid}/>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price}$</Card.Text>
        <Button variant="primary" onClick={() =>buttonClick(product, cartId)}>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default MainContainer;

function buttonClick(product: Product, cartId: string){
  fetch('/api/cart/'+cartId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: product.id, qty: 1})
  })
  Router.reload()
}
