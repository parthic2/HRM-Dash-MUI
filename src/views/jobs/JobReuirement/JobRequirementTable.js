import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { JobReqHeadCells } from 'src/data/data';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import PencilOutline from 'mdi-material-ui/PencilOutline';
import { getComparator, stableSort } from 'src/common/CommonLogic';

const JobRequirementTable = ({ jobData, router, deleteJobs, handleEdit }) => {
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - jobData.length) : 0;

  const visibleRows = stableSort(jobData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // For different width
  const tableHeight = router.pathname === '/' ? '390px' : '330px';

  return (
    <Box sx={{ width: '100%' }}>
      {visibleRows && visibleRows.length === 0 ? (
        <Typography variant='h5' my={6} textAlign={"center"} fontWeight={600}>No Data Found!</Typography>
      ) : (
        <>
          <TableContainer sx={{ height: tableHeight }}>
            <Table
              stickyHeader
              sx={{ minWidth: 1000 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                headCells={JobReqHeadCells}
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
                      <TableCell align="left">{row.job_title}</TableCell>
                      <TableCell align="left">{row.position}</TableCell>
                      <TableCell align="left">{row.department}</TableCell>
                      <TableCell align="left">{row.no_position}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="center">
                        {router.pathname === "/" ? "" :
                          <>
                            <PencilOutline
                              onClick={() => handleEdit(row.id)}
                              sx={{ mr: 2, color: "#9155FD" }}
                            />
                            <DeleteOutline
                              onClick={() => deleteJobs(row.id)}
                              sx={{ color: "#9155FD" }}
                            />
                          </>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={JobReqHeadCells.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {router.pathname === "/" ? "" :
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={jobData.length}
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

export default JobRequirementTable;