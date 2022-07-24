import React from 'react'
import { Button } from 'react-bootstrap';
import './ListNode.css';

function ListNode(props: any) {
  return ( <div className='list-node'>
    <Button className='rounded-btn' variant='outline-primary'>{props.value}</Button>
  </div> );
}

export default ListNode;