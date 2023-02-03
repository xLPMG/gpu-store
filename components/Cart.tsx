import type {CartItem, Product } from '../interfaces'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

export default function CartContainer(cartItem: CartItem) {
    return (
        <ListGroup.Item>Product: {cartItem.id} <Badge bg="primary" pill>{cartItem.qty}</Badge></ListGroup.Item>
    );
  }