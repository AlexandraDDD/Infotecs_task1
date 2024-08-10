import React, { useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css';
import { MDBContainer } from 'mdb-react-ui-kit';
import { Table } from './components/Table';
import { FilterBar } from './components/FilterBar';
import { ModalUser } from './components/ModalUser';



function App() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleModal = (id: number, show: boolean ) => {
    setSelectedUserId(id);
    setShowModal(show)
  };
  const handleClose = () => setShowModal(false);

  return (
    <div className="App">
      <MDBContainer breakpoint="xl">
        <FilterBar />
        <Table handleModal={handleModal} />
        <ModalUser selectedUserId={selectedUserId} show={showModal} handleClose={handleClose} />
      </MDBContainer>
    </div>
  );
}

export default App;
