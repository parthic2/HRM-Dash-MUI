import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Chip, Typography } from '@mui/material';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { DepartmentHeadCells, statusObj } from 'src/data/data';
import { getComparator, stableSort } from 'src/common/CommonLogic';

const DepartmentTable = ({ departmentData, updateDepartmentStatus }) => {
  // for table 
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - departmentData.length) : 0;

  const visibleRows = stableSort(departmentData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // For toggle status
  const handleStatusToggle = (id, currentStatus) => {
    // Assume you have a function to update the status in your data
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    updateDepartmentStatus(id, newStatus);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {visibleRows && visibleRows.length === 0 ? (
        <Typography variant='h5' my={6} textAlign={"center"} fontWeight={600}>No Data Found!</Typography>
      ) : (
        <>
          <TableContainer sx={{ height: "390px" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 1000 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                headCells={DepartmentHeadCells}
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
                      <TableCell align="left">{row.depart_name}</TableCell>
                      <TableCell align="left">{row.depart_head}</TableCell>
                      <TableCell align="left">{row.depart_email}</TableCell>
                      <TableCell align="left">{row.start_date}</TableCell>
                      <TableCell align="left">{row.team_member}</TableCell>
                      <TableCell align="left">
                        <Chip
                          label={row.status}
                          color={statusObj[row.status]}
                          onClick={() => handleStatusToggle(row.id, row.status)}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }}
                        />
                      </TableCell>
                      {/* <TableCell align="left">
                          <PencilOutline
                            onClick={() => handleEdit(row.id)}
                            sx={{ mr: 2, color: "#9155FD" }}
                          />
                          <DeleteOutline
                            onClick={() => deleteDepartment(row.id)}
                            sx={{ color: "#9155FD" }}
                          />
                        </TableCell> */}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={DepartmentHeadCells.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={departmentData.length}
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

export default DepartmentTable;