import { useState } from 'react';

// table components
import Tablehead from './Tablehead';
import ToolBar from './ToolBar';
import Tablebody from './Tablebody';

// redux
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function TableMain({ type, items, autoFilter }) {

    const rows = items;

    // redux states
    const archiveItems = useSelector(state => state.archiveItems);
    const deliveryItems = useSelector(state => state.deliveryItems);
    const dispatch = useDispatch();

    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(type === 'Store' ? 'price' : ' deliveryEstimate');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((row) => row.hasOwnProperty('id') ? row.id : row.store);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleArchiveClick = (row) => {
        dispatch(
            {
                type: "setDeliveryItems",
                payload: {
                    value: deliveryItems.filter(item => item.name !== row.name)
                }
            }
        )
        dispatch(
            {
                type: "setArchiveItems",
                payload: {
                    value: [...archiveItems, row]
                }
            }
        )
    }
    const handleDeliveryClick = (row) => {
        dispatch(
            {
                type: "setArchiveItems",
                payload: {
                    value: archiveItems.filter(item => item.name !== row.name)
                }
            }
        )
        dispatch(
            {
                type: "setDeliveryItems",
                payload: {
                    value: [...deliveryItems, row]
                }
            }
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    let rowsPerPageOptions = [];
    items.forEach((item, i) => (i + 1) % 5 === 0 && rowsPerPageOptions.push(i + 1))

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <ToolBar numSelected={selected.length} type={type} selected={selected} setSelected={setSelected} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <Tablehead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            autoFilter={autoFilter}
                            type={type}
                        />
                        {type === 'Store' ?
                            <Tablebody
                                rows={rows}
                                order={order}
                                orderBy={orderBy}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                isSelected={isSelected}
                                handleClick={handleClick}
                                emptyRows={emptyRows}
                                dense={dense}
                                type={type}
                            />
                            :
                            <Tablebody
                                rows={rows}
                                order={order}
                                orderBy={orderBy}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                isSelected={isSelected}
                                handleClick={handleClick}
                                emptyRows={emptyRows}
                                dense={dense}
                                type={type}
                                autoFilter={autoFilter}
                                handleArchiveClick={handleArchiveClick}
                                handleDeliveryClick={handleDeliveryClick}
                            />
                        }
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}
