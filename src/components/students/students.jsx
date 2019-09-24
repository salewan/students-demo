import React, {useState} from 'react';
import { Column, Table, AutoSizer} from 'react-virtualized';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './students.css';
import {deleteStudent, editStudent} from '../../actions/students.action';

const rowClassName = ({index}) => {
  if (index < 0) {
    return 'headerRow';
  } else {
    return index % 2 === 0 ? 'evenRow' : 'oddRow';
  }
};

const Students = ({list, deleteStudent, editStudent}) => {

  const [deletionContext, setDeletionContext] = useState({isOpen: false, user: null});

  const closeDeletionModal = () => setDeletionContext({user: null, isOpen: false});
  const openDeletionModal = (user) => (evt) => {
    setDeletionContext({user, isOpen: true});
    evt.stopPropagation();
  };

  const _deleteStudent = () => {
    deleteStudent(deletionContext.user);
    closeDeletionModal();
  };

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
          onRowClick={editStudent}
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
        <Button color="primary" onClick={_deleteStudent}>Yes</Button>{' '}
        <Button color="secondary" onClick={closeDeletionModal}>No</Button>
      </ModalFooter>
    </Modal>
  </>
};

function mapStateToProps(state) {
  return {
    list: state.students.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({deleteStudent, editStudent}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);