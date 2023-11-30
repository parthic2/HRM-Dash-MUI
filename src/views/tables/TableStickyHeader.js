import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import PencilOutline from 'mdi-material-ui/PencilOutline';
import { visuallyHidden } from '@mui/utils';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'employee name', label: 'Employee Name' },
  { id: 'designation', label: 'Designation' },
  { id: 'email', label: 'Email' },
  { id: 'address', label: 'Address' },
  { id: 'mobile', label: 'Mobile No' },
  { id: 'alt', label: 'Alt. No' },
  { id: 'birth', label: 'Birth Date' },
  { id: 'joining', label: 'Joining Date' },
  { id: 'blood', label: 'Blood Group' },
  { id: 'role', label: 'Role' },
  { id: 'status', label: 'Status' },
  { id: 'document', label: 'Gov. Document' },
  { id: '', label: '' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable({ employeeData, deleteEmployee, handleEditButtonClick }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeData.length) : 0;

  const visibleRows = stableSort(employeeData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell align="left">{row.user_name}</TableCell>
                  <TableCell align="left">{row.designation}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.phone_no}</TableCell>
                  <TableCell align="left">{row.alternative_phone || "-"}</TableCell>
                  <TableCell align="left">{row.birth_date}</TableCell>
                  <TableCell align="left">{row.joining_date}</TableCell>
                  <TableCell align="left">{row.blood_group}</TableCell>
                  <TableCell align="left">{row.role}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">
                    <img src={row.gov_doc} alt="Government Document" width={40} height={40} />
                  </TableCell>
                  <TableCell align="left">
                    <PencilOutline onClick={() => handleEditButtonClick(row.id)} />
                    <DeleteOutline onClick={() => deleteEmployee(row.id)} />
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={headCells.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employeeData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}