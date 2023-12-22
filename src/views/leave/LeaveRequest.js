import React, { useState } from 'react';
import { Card, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import useLeaveReqData from 'src/hooks/useLeaveReqData';
import LeaveRequestModal from 'src/components/LeaveRequest/LeaveRequestModal';
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
  { id: 'date', label: 'Applying Date' },
  { id: 'type', label: 'Leave Type' },
  { id: 'start', label: 'Start Date' },
  { id: 'end', label: 'End Date' },
  { id: 'day', label: 'Days' },
  { id: 'description', label: 'Description' },
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

const LeaveRequest = () => {
  const { leaveReqData, open, setOpen, scroll, handleClickOpen, handleClose } = useLeaveReqData();

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

  return (
    <>
      <LeaveRequestModal leaveReqData={leaveReqData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} />

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
                sx={{ minWidth: 1100 }}
                aria-labelledby="tableTitle"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align="left">8-9-2023</TableCell>
                    <TableCell align="left">family leave</TableCell>
                    <TableCell align="left">10-9-2023</TableCell>
                    <TableCell align="left">11-9-2023</TableCell>
                    <TableCell align="left">full day</TableCell>
                    <TableCell align="left">family leave</TableCell>
                    <TableCell align="left">
                      <Button size='small' variant="contained" color="success" sx={{ color: "#FFF !important" }}>
                        Approved
                      </Button>
                      <Button size='small' variant="contained" color="error" sx={{ ml: 2, color: "#FFF !important" }}>
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* {visibleRows.map((row) => {
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
                        <Button size='small' variant="contained" color="success" sx={{ color: "#FFF !important" }}>
                          Approved
                        </Button>
                        <Button size='small' variant="contained" color="error" sx={{ ml: 2, color: "#FFF !important" }}>
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })} */}
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
              count={leaveReqData.length}
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

export default LeaveRequest;