import React, { useState } from 'react';
import { Card, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import PencilOutline from 'mdi-material-ui/PencilOutline';
import { visuallyHidden } from '@mui/utils';
import useJobData from 'src/hooks/useJobData';
import JobModal from 'src/components/JobModal/JobModal';

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
    { id: 'title', label: 'Job Title' },
    { id: 'position', label: 'Position' },
    { id: 'department', label: 'Department' },
    { id: 'noPosition', label: 'No. of position' },
    { id: 'description', label: 'Job Description' },
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

const JobRequirement = () => {
    const { jobData, editJobId, open, setOpen, scroll, handleClickOpen, handleClose } = useJobData();

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

    return (
        <>
            <JobModal editJobId={editJobId} jobData={jobData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} />

            <Card sx={{ mt: 3 }}>
                <Box sx={{ width: '100%' }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 700 }}
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
                                            <TableCell align="left">{row.job_title}</TableCell>
                                            <TableCell align="left">{row.position}</TableCell>
                                            <TableCell align="left">{row.department}</TableCell>
                                            <TableCell align="left">{row.no_position}</TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
                                            <TableCell align="center">
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
                        count={jobData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Card>
        </>
    )
}

export default JobRequirement;