import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { TrackerHeadCells } from 'src/data/data';
import { useTimer } from 'src/@core/context/TimerContext';
import { getComparator, stableSort } from 'src/common/CommonLogic';

const TrackerTable = () => {
  const { projectsForCurrentMonth, role, roleEmp } = useTimer();

  // for table 
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const ipAddress = typeof window !== 'undefined' ? localStorage.getItem('userIP') : null;

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projectsForCurrentMonth.length) : 0;

  const visibleRows = stableSort(projectsForCurrentMonth, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const HRData = visibleRows.filter(item => item.role === "HR");
  const EmpData = visibleRows.filter(item => item.role === "Employee");

  return (
    <Box sx={{ width: '100%' }}>
      {visibleRows && visibleRows.length === 0 ? (
        <Typography variant='h5' my={6} textAlign={"center"} fontWeight={600}>No Data Found!</Typography>
      ) : (
        <>
          <TableContainer sx={{ height: "200px" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 1300 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                headCells={TrackerHeadCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {role === "HR" &&
                  HRData && HRData.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell align="left">{ipAddress}</TableCell>
                        <TableCell align="left">{row.date}</TableCell>
                        <TableCell align="left">{row.role}</TableCell>
                        <TableCell align="left">{row.description || "-"}</TableCell>
                        <TableCell align="left">{row.startTime}</TableCell>
                        <TableCell align="left">{row.pauseTime || "-"}</TableCell>
                        <TableCell align="left">{row.stopTime}</TableCell>
                        <TableCell align="left">{row.hours} hours</TableCell>
                        <TableCell align="left">{row.minutes} minutes</TableCell>
                        <TableCell align="left">{row.seconds} seconds</TableCell>
                      </TableRow>
                    );
                  })
                }

                {roleEmp === "Employee" &&
                  EmpData && EmpData.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell align="left">{ipAddress}</TableCell>
                        <TableCell align="left">{row.date}</TableCell>
                        <TableCell align="left">{row.role}</TableCell>
                        <TableCell align="left">{row.description || "-"}</TableCell>
                        <TableCell align="left">{row.startTime}</TableCell>
                        <TableCell align="left">{row.pauseTime || "-"}</TableCell>
                        <TableCell align="left">{row.stopTime}</TableCell>
                        <TableCell align="left">{row.hours} hours</TableCell>
                        <TableCell align="left">{row.minutes} minutes</TableCell>
                        <TableCell align="left">{row.seconds} seconds</TableCell>
                      </TableRow>
                    );
                  })
                }

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={TrackerHeadCells.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={projectsForCurrentMonth.length}
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

export default TrackerTable;