import React from 'react';

const NoDataFound = (props) => {
  return (
    <tr className="odd">
      <td valign="top" colSpan={props.colSpan} className="dataTables_empty" style={{ textAlign: 'center' }}>
        No Matching records found
      </td>
    </tr>
  );
};

export default NoDataFound;
