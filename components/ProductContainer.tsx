import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import type { Product } from '../interfaces'

const CardStyle = {
  border: "1px solid #03506f",
  borderRadius: "10px",
  padding: "10px",
  margin: "10px",
  width: "18rem",
};

function MainContainer(product: Product) {
  return (
    <Card style={CardStyle}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price}$</Card.Text>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default MainContainer;
