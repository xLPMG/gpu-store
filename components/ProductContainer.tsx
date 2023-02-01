import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import type { Product } from '../interfaces'
import styles from '../styles/components/ProductContainer.module.css';
import Router from "next/router";

function MainContainer(props) {
  return (
    <Card className={styles.card}>
      <Card.Img variant="top" src={props.imageid}/>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.price}$</Card.Text>
        <Button variant="primary" onClick={() =>buttonClick(props, props.cartId)}>Add to cart</Button>
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
  //Router.reload()
}
