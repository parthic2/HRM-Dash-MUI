import React, { useState } from 'react';
import { Card, Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Button, Select, MenuItem, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import Pen from 'mdi-material-ui/Pen';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { EmpHeadCells } from 'src/data/data';
import { getComparator, stableSort } from 'src/common/CommonLogic';

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

const EmployeeTable = ({ employeeData, updateEmployeeDesignation, deleteEmployee }) => {
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
    <Box sx={{ width: '100%' }}>
      {visibleRows && visibleRows.length === 0 ? (
        <Typography variant='h5' my={6} textAlign={"center"} fontWeight={600}>No Data Found!</Typography>
      ) : (
        <>
          <TableContainer sx={{ height: "390px" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 3000 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                headCells={EmpHeadCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {visibleRows && visibleRows.map((row) => {
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
                              sx={{ fontSize: '15px', ml: 2, color: "#9155FD" }}
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
                      {/* <TableCell align="left">
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
                        </TableCell> */}
                      <TableCell align="left">-</TableCell>
                      <TableCell align="left">-</TableCell>
                      <TableCell align="left">-</TableCell>
                      <TableCell align="left">-</TableCell>
                      <TableCell align="left">-</TableCell>
                      <TableCell align="left">-</TableCell>
                      <TableCell align="left">
                        <img src={row.gov_doc} alt="Government Document" width={40} height={40} />
                      </TableCell>
                      <TableCell align="left">
                        <DeleteOutline onClick={() => deleteEmployee(row.id)} sx={{ color: "#9155FD" }} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={EmpHeadCells.length} />
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
        </>
      )}
    </Box>
  )
}

export default EmployeeTable;