import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import PencilOutline from 'mdi-material-ui/PencilOutline';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { ApplicantHeadCells } from 'src/data/data';
import { getComparator, stableSort } from 'src/common/CommonLogic';

const ApplicantListTable = () => {
  // for table 
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [applicant, setApplicant] = useState([]);

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - applicant.length) : 0;

  const visibleRows = stableSort(applicant, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%' }}>
      {visibleRows && visibleRows.length === 0 ? (
        <Typography variant='h5' my={6} textAlign={"center"} fontWeight={600}>No Data Found!</Typography>
      ) : (
        <>
          <TableContainer sx={{ height: "380px" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 700 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                headCells={ApplicantHeadCells}
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
                      <TableCell align="left">{row.applicant_name}</TableCell>
                      <TableCell align="left">{row.applicant_email}</TableCell>
                      <TableCell align="left">{row.phone_no}</TableCell>
                      <TableCell align="left">{row.cv}</TableCell>
                      <TableCell align="center">
                        <PencilOutline onClick={() => handleEditButtonClick(row.id)} />
                        <DeleteOutline onClick={() => deleteEmployee(row.id)} />
                      </TableCell>
                    </TableRow>
                  );
                })}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={ApplicantHeadCells.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={applicant.length}
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

export default ApplicantListTable;