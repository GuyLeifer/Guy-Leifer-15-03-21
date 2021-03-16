import PropTypes from 'prop-types';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

function Tablehead(props) {

    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, autoFilter, type } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells =
        type === 'Store' ?
            [
                { id: 'store', numeric: false, disablePadding: false, label: 'Store' },
                { id: 'quentity', numeric: false, disablePadding: false, label: 'Quentity' },
                { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
            ]
            : [
                { id: 'name', numeric: false, disablePadding: true, label: 'Select All' },
                { id: 'store', numeric: false, disablePadding: false, label: 'Store' },
                { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
                { id: 'deliveryEstimate', numeric: true, disablePadding: false, label: 'Delivery Estimate' },
                !autoFilter &&
                { id: 'action', numeric: true, disablePadding: false, label: 'Action' },
            ];

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

Tablehead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default Tablehead
