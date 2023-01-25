import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function MainContainer() {
  return (
    <Card style={{ width: "18rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>Mulm</Card.Title>
        <Card.Text>Description</Card.Text>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default MainContainer;
