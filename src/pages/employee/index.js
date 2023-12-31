import React, { useState } from 'react';
import { Card, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Chip, Input, Button, Select, MenuItem } from '@mui/material';
import useEmployeeData from 'src/hooks/useEmployeeData';
import PropTypes from 'prop-types';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import Pen from 'mdi-material-ui/Pen';
import { visuallyHidden } from '@mui/utils';
import EmployeeModal from 'src/components/EmployeeModal/EmployeeModal';
import { motion } from "framer-motion";

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
  { id: 'salary', label: 'Salary' },
  { id: 'holder', label: 'Bank Account Holder Name' },
  { id: 'account', label: 'Bank Account Number' },
  { id: 'bankName', label: 'Bank Name' },
  { id: 'ifsc', label: 'Bank IFSC Code' },
  { id: 'location', label: 'Bank Branch Location' },
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

function EmployeeDesignationEditor({ employee, onSave, onCancel }) {
  const [editedDesignation, setEditedDesignation] = useState(employee.designation);

  const handleSave = () => {
    onSave(editedDesignation);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <Select
        value={editedDesignation}
        onChange={(e) => setEditedDesignation(e.target.value)}
        onBlur={handleSave}
        autoFocus
        fullWidth
        sx={{ height: "40px" }}
      >
        <MenuItem value='Front-end'>Front end</MenuItem>
        <MenuItem value='Back-end'>Back end</MenuItem>
      </Select>
      <Box sx={{ mt: 2 }}>
        <Button size='small' variant='outlined' onClick={handleSave}>Save</Button>
        <Button size='small' variant='outlined' onClick={handleCancel} sx={{ ml: 1 }}>Cancel</Button>
      </Box>
    </>
  );
}

EmployeeDesignationEditor.propTypes = {
  employee: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const statusObj = {
  Active: 'success',
  Inactive: 'error',
}

const Employee = () => {
  const { deleteEmployee, editEmployeeId, employeeData, open, setOpen, scroll, handleClickOpen, handleClose, updateEmployeeDesignation } = useEmployeeData();

  // for table 
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Add a state variable to track the editing employee ID
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

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
    <>
      <EmployeeModal editEmployeeId={editEmployeeId} employeeData={employeeData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card sx={{ mt: 3 }}>
          <Box sx={{ width: '100%' }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 3000 }}
                aria-labelledby="tableTitle"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {visibleRows.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell align="left">{row.user_name}</TableCell>
                        <TableCell align="left">
                          {editingEmployeeId === row.id ? (
                            <EmployeeDesignationEditor
                              employee={row}
                              onSave={(updatedDesignation) => {
                                updateEmployeeDesignation(row.id, updatedDesignation);
                                setEditingEmployeeId(null);
                              }}
                              onCancel={() => setEditingEmployeeId(null)}
                            />
                          ) : (
                            <>
                              {row.designation}
                              <Pen
                                sx={{ fontSize: '15px', ml: 2 }}
                                onClick={() => setEditingEmployeeId(row.id)}
                              />
                            </>
                          )}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.address}</TableCell>
                        <TableCell align="left">{row.phone_no}</TableCell>
                        <TableCell align="left">{row.alternative_phone || "-"}</TableCell>
                        <TableCell align="left">{row.birth_date}</TableCell>
                        <TableCell align="left">{row.joining_date}</TableCell>
                        <TableCell align="left">{row.blood_group}</TableCell>
                        <TableCell align="left">{row.role}</TableCell>
                        <TableCell align="left">
                          <Chip
                            label={row.status}
                            color={statusObj[row.status]}
                            sx={{
                              height: 24,
                              fontSize: '0.75rem',
                              textTransform: 'capitalize',
                              '& .MuiChip-label': { fontWeight: 500 }
                            }}
                          />
                        </TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">
                          <img src={row.gov_doc} alt="Government Document" width={40} height={40} />
                        </TableCell>
                        <TableCell align="center">
                          {/* <PencilOutline onClick={() => handleEditButtonClick(row.id)} /> */}
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
        </Card>
      </motion.div>
    </>
  )
}

export default Employee;