import React from 'react';

const NoDataFound = () => {
  return (
    <tr className="odd">
      <td valign="top" colSpan={7} className="dataTables_empty" style={{ textAlign: 'center' }}>
        No Matching records found
      </td>
    </tr>
  );
};

export default NoDataFound;
