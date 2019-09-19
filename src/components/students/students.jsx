import React from 'react';
import { Column, Table, AutoSizer} from 'react-virtualized';

import './students.css';

const list = [
  {
    fio: 'Ivan Ivanovich Ivanov',
    born: '01.01.1990',
    rate: 5
  },
  {
    fio: 'PetrPetrovich Petrov',
    born: '02.02.1992',
    rate: 5
  },
]


class Students extends React.PureComponent {

  render() {
    return <AutoSizer>
      {({ height, width }) =>
        <Table
          width={width}
          height={height}
          headerHeight={30}
          rowHeight={30}
          rowCount={list.length}
          rowGetter={({index}) => list[index]}
          headerClassName='headerColumn'
          rowClassName={this._rowClassName}
        >
          <Column
            label='Name'
            dataKey='fio'
            width={500}
          />
          <Column
            width={200}
            label='Born'
            dataKey='born'
          />
          <Column
            width={200}
            label={"Rate"}
            dataKey='rate'
          />
        </Table>
      }
    </AutoSizer>
  }

  _rowClassName({index}) {
    if (index < 0) {
      return 'headerRow';
    } else {
      return index % 2 === 0 ? 'evenRow' : 'oddRow';
    }
  }
};

export default Students;