import React, { FC, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../../hooks/UseFetch';
import { User } from '../../types/types';
import { Spinner } from 'react-bootstrap';
import { ModalUserProps } from './types';

export const ModalUser: FC<ModalUserProps> = ({ selectedUserId, show, handleClose }) => {
  const [url, setUrl] = useState<string | null>(null);
  const [user, setUser] = useState<User>()

  useEffect(() => {
    if (selectedUserId && show) {
      setUrl(`https://dummyjson.com/users/${selectedUserId}?select=firstName,lastName,maidenName,gender,age,phone,address,height,weight,email`);
    }
  }, [selectedUserId, show]);
  
  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      if ('users' in data) {
        setUser(data.users[0]);
      } else {
        setUser(data);
      }
    }
  }, [data, setUser]);
  

  if (loading) return (
    <Spinner></Spinner>
  )
  if (error instanceof Error) return (
    <h2>Fetch ERROR: {error.message}</h2>
  )
  
  
  return (
    <>
      {user &&
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>id: {selectedUserId} - {user.firstName +' '+ user.lastName +' '+ user.maidenName} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Пол: {user.gender}</p>
            <p>Возраст: {user.age}</p>
            <p>Телефон: {user.phone}</p>
            <p>email: {user.email}</p>
            <p>Вес: {user.weight}</p>
            <p>Рост: {user.height}</p>
            <p>Адрес: {user.address.address}, {user.address.city}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      }

    </>
  )
}
