import React, {useState} from 'react';
import { Column, Table, AutoSizer} from 'react-virtualized';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './students.css';

const list = [
  {
    name: 'Ivan Ivanovich Ivanov',
    born: '01.01.1990',
    rate: 5
  },
  {
    name: 'PetrPetrovich Petrov',
    born: '02.02.1992',
    rate: 54
  },
];

const rowClassName = ({index}) => {
  if (index < 0) {
    return 'headerRow';
  } else {
    return index % 2 === 0 ? 'evenRow' : 'oddRow';
  }
};

const Students = () => {

  const [deletionContext, setDeletionContext] = useState({isOpen: false, user: null});

  const closeDeletionModal = () => setDeletionContext({user: null, isOpen: false});
  const openDeletionModal = (user) => () => setDeletionContext({user, isOpen: true});

  const cellRenderer = ({rowData, cellData}) => {
    return <div>
      {cellData}
      <Button
        color="primary"
        size="sm"
        style={{float: 'right'}}
        onClick={openDeletionModal({...rowData})}
      >
        kick out
      </Button>
    </div>
  };

  return <>
    <AutoSizer>
      {({ height, width }) =>
        <Table
          width={width}
          height={height}
          headerHeight={30}
          rowHeight={30}
          rowCount={list.length}
          rowGetter={({index}) => list[index]}
          headerClassName='headerColumn'
          rowClassName={rowClassName}
        >
          <Column
            label='Name'
            dataKey='name'
            width={500}
            flexGrow={1}
          />
          <Column
            width={200}
            label='Born'
            dataKey='born'
            flexGrow={2}
          />
          <Column
            width={200}
            label={"Rate"}
            dataKey='rate'
            cellRenderer={cellRenderer}
          />
        </Table>
      }
    </AutoSizer>

    <Modal isOpen={deletionContext.isOpen} toggle={closeDeletionModal} >
      <ModalHeader toggle={closeDeletionModal}>Are you sure?</ModalHeader>
      <ModalBody>
        The student
        {' '}<span className="userName">{deletionContext.user && deletionContext.user.name}</span>{' '}
        is going to be deleted.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={closeDeletionModal}>Yes</Button>{' '}
        <Button color="secondary" onClick={closeDeletionModal}>No</Button>
      </ModalFooter>
    </Modal>
  </>
};

export default Students;