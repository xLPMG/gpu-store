import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import type { Product } from '../interfaces'
import styles from '../styles/components/ProductContainer.module.css';

function MainContainer(product: Product) {
  return (
    <Card className={styles.card}>
      <Card.Img variant="top" src={product.imageid}/>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price}$</Card.Text>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default MainContainer;
