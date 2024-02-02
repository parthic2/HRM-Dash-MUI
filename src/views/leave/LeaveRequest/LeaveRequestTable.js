import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Button, Typography } from '@mui/material';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { LeaveReqHeadCells } from 'src/data/data';
import { getComparator, stableSort } from 'src/common/CommonLogic';

const LeaveRequestTable = ({ leaveReqData, router, updateLeaveRequestStatus }) => {
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - leaveReqData.length) : 0;

  const visibleRows = stableSort(leaveReqData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Change approved or reject button
  const handleApprove = (id) => {
    // Assuming updateLeaveRequestStatus takes an ID and a status
    updateLeaveRequestStatus(id, 'Approved');
  };

  const handleReject = (id) => {
    // Assuming updateLeaveRequestStatus takes an ID and a status
    updateLeaveRequestStatus(id, 'Rejected');
  };

  // Remove karvanu che employee api aave aatle
  const authTokenEmp = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('employee-details')) : null;
  const roleEmp = authTokenEmp?.roles;

  return (
    <Box sx={{ width: '100%' }}>
      {visibleRows && visibleRows.length === 0 ? (
        <Typography variant='h5' my={6} textAlign={"center"} fontWeight={600}>No Data Found!</Typography>
      ) : (
        <>
          <TableContainer sx={{ height: "330px" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 1100 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                headCells={LeaveReqHeadCells}
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
                      <TableCell align="left">{row.apply_date}</TableCell>
                      <TableCell align="left">{row.leave_type}</TableCell>
                      <TableCell align="left">{row.start_date}</TableCell>
                      <TableCell align="left">{row.end_date}</TableCell>
                      <TableCell align="left">{row.total_days}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>

                      <TableCell align="left">
                        {router.pathname === "/" ? "" :
                          roleEmp === "Employee" ? (
                            <Button
                              size='small'
                              variant="contained"
                              color="warning"
                              sx={{ color: "#FFF !important" }}
                            >
                              Pending
                            </Button>
                          ) : (
                            <>
                              {(row.status === 'Pending' || !row.status) && (
                                <>
                                  <Button
                                    size='small'
                                    variant="contained"
                                    color="success"
                                    sx={{ color: "#FFF !important", mr: 3 }}
                                    onClick={() => handleApprove(row.id)}
                                  >
                                    Approved
                                  </Button>
                                  <Button
                                    size='small'
                                    variant="contained"
                                    color="error"
                                    sx={{ color: "#FFF !important" }}
                                    onClick={() => handleReject(row.id)}
                                  >
                                    Rejected
                                  </Button>
                                </>
                              )}
                              {row.status === 'Approved' && (
                                <Button
                                  size='small'
                                  variant="contained"
                                  sx={{
                                    color: "#FFF !important",
                                    background: "#56ca00ba",
                                    cursor: "not-allowed",
                                    '&.MuiButton-root:hover': {
                                      background: "#56ca00ba"
                                    }
                                  }}
                                >
                                  Approved
                                </Button>
                              )}
                              {row.status === 'Rejected' && (
                                <Button
                                  size='small'
                                  variant="contained"
                                  sx={{
                                    color: "#FFF !important",
                                    background: "#ff4c51cc",
                                    cursor: "not-allowed",
                                    '&.MuiButton-root:hover': {
                                      background: "#ff4c51cc"
                                    }
                                  }}
                                >
                                  Rejected
                                </Button>
                              )}
                            </>
                          )
                        }
                      </TableCell>

                    </TableRow>
                  );
                })}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={LeaveReqHeadCells.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {router.pathname === "/" ? "" :
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={leaveReqData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
        </>
      )}
    </Box>
  )
}

export default LeaveRequestTable;