import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { getComparator, stableSort } from './helpers';
import Tablerow from './Tablerow';

// redux
import { useSelector } from 'react-redux';

function Tablebody(props) {

    const { rows, order, orderBy, rowsPerPage, page, isSelected, handleClick, emptyRows, dense, type, autoFilter, handleArchiveClick, handleDeliveryClick } = props;

    // redux states
    const currency = useSelector(state => state.currency);
    const currencyShekel = useSelector(state => state.currencyShekel);

    let counterPrice = 0;
    rows.forEach(row => counterPrice += row.price);

    return (
        <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    const isItemSelected = isSelected(row.hasOwnProperty('id') ? row.id : row.store);
                    const labelId = `enhanced-table-checkbox-${row.id}`;

                    return (
                        <Tablerow
                            key={type === 'Store' ? row.store : row.id}
                            row={row}
                            isItemSelected={isItemSelected}
                            type={type}
                            handleClick={handleClick}
                            labelId={labelId}
                            autoFilter={autoFilter}
                            handleArchiveClick={handleArchiveClick}
                            handleDeliveryClick={handleDeliveryClick}
                        />
                    );
                })}
            {emptyRows > 0 ?
                (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell align="right">
                            <strong>Total Price: {currency === '$' ? counterPrice.toFixed(2) + currency : (counterPrice * currencyShekel).toFixed(2) + currency}
                            </strong></TableCell>
                    </TableRow>
                )
                :
                (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                        <TableCell colSpan={6} />
                    </TableRow>
                )
            }
        </TableBody>
    )
}

export default Tablebody
