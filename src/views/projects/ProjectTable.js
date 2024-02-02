import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Chip, Typography } from '@mui/material';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { ProjectHeadCells, statusObj } from 'src/data/data';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import PencilOutline from 'mdi-material-ui/PencilOutline';
import { getComparator, stableSort } from 'src/common/CommonLogic';
import { useRouter } from 'next/router';

const ProjectTable = ({ projectData, updateProjectStatus, deleteProjects, handleEdit }) => {
  // For fetch login detail wise role
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
  const role = authToken?.role;

  // Remove karvanu che employee api aave aatle
  const authTokenEmp = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('employee-details')) : null;
  const roleEmp = authTokenEmp?.roles;

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projectData.length) : 0;

  const visibleRows = stableSort(projectData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // For toggle status
  const handleStatusToggle = (id, currentStatus) => {
    // Assume you have a function to update the status in your data
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    updateProjectStatus(id, newStatus);
  };

  // Filter the Active and Inactive status separately
  const activeRows = visibleRows.filter((item) => item.status === 'Active');
  const inactiveRows = visibleRows.filter((item) => item.status === 'Inactive');

  // Concatenate active and inactive rows
  const allVisibleRows = activeRows.concat(inactiveRows);

  return (
    <Box sx={{ width: '100%' }}>
      {allVisibleRows && allVisibleRows.length === 0 ? (
        <Typography variant='h5' my={6} textAlign={"center"} fontWeight={600}>No Data Found!</Typography>
      ) : (
        <>
          <TableContainer sx={{ height: "390px" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 1500 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                headCells={ProjectHeadCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {role === "Admin" &&
                  allVisibleRows && allVisibleRows.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell align="left">{row.project_name}</TableCell>
                        <TableCell align="left">{row.client_name}</TableCell>
                        <TableCell align="left">{row.client_email}</TableCell>
                        <TableCell align="left">{row.start_date}</TableCell>
                        <TableCell align="left">{row.end_date}</TableCell>
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
                        <TableCell align="left">{row.team_member}</TableCell>
                        <TableCell align="left">
                          <img src={row.gov_doc} alt="Document" width={40} height={40} />
                        </TableCell>
                        <TableCell align="left">
                          <PencilOutline
                            onClick={() => handleEdit(row.id)}
                            sx={{ mr: 2, color: "#9155FD" }}
                          />
                          <DeleteOutline
                            onClick={() => deleteProjects(row.id)}
                            sx={{ color: "#9155FD" }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                }

                {roleEmp === "Employee" &&
                  activeRows && activeRows.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell align="left">{row.project_name}</TableCell>
                        <TableCell align="left">{row.client_name}</TableCell>
                        <TableCell align="left">{row.client_email}</TableCell>
                        <TableCell align="left">{row.start_date}</TableCell>
                        <TableCell align="left">{row.end_date}</TableCell>
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
                        <TableCell align="left">{row.team_member}</TableCell>
                        <TableCell align="left">
                          <img src={row.gov_doc} alt="Document" width={40} height={40} />
                        </TableCell>
                        <TableCell align="left">
                          <PencilOutline
                            onClick={() => handleEdit(row.id)}
                            sx={{ mr: 2, color: "#9155FD" }}
                          />
                          <DeleteOutline
                            onClick={() => deleteProjects(row.id)}
                            sx={{ color: "#9155FD" }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })
                }

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={ProjectHeadCells.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={projectData.length}
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

export default ProjectTable;