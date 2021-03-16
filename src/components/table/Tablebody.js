import { useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

// icons
import IconButton from '@material-ui/core/IconButton';
import ArchiveIcon from '@material-ui/icons/Archive';
import RedoIcon from '@material-ui/icons/Redo';

import { getComparator, stableSort } from './helpers';

// recoil
import { useRecoilValue } from 'recoil';
import { currencyState, currencyShekelState } from '../../Atoms/currencyState';

function Tablebody(props) {

    const { rows, order, orderBy, rowsPerPage, page, isSelected, handleClick, emptyRows, dense, type, autoFilter, handleArchiveClick, handleDeliveryClick } = props;

    // recoil states
    const currency = useRecoilValue(currencyState);
    const currencyShekel = useRecoilValue(currencyShekelState);

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
                        <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={type === 'store' ? row.store : row.id}
                            selected={isItemSelected}
                        >
                            <TableCell padding="checkbox" onClick={() => handleClick(row.hasOwnProperty('id') ? row.id : row.store)}>
                                <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </TableCell>
                            { type === 'Store' ?
                                <>
                                    <TableCell component="th" id={labelId} scope="row" padding="none">
                                        {row.store}
                                    </TableCell>
                                    <TableCell align="left">{row.quentity}</TableCell>
                                    <TableCell align="right">
                                        {currency === '$' ?
                                            row.price.toFixed(2) + '$'
                                            :
                                            (row.price * currencyShekel).toFixed(2) + '₪'
                                        }
                                    </TableCell>
                                </>
                                :
                                <>
                                    <TableCell component="th" id={labelId} scope="row" padding="none">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.store}</TableCell>
                                    <TableCell align="right">
                                        {currency === '$' ?
                                            row.price.toFixed(2) + '$'
                                            :
                                            (row.price * currencyShekel).toFixed(2) + '₪'
                                        }
                                    </TableCell>
                                    <TableCell align="right">{row.deliveryEstimate.toLocaleString()}</TableCell>
                                    {!autoFilter && (
                                        (type === 'Delivery' ?
                                            <TableCell align="right">
                                                <Tooltip title="Archive" onClick={() => handleArchiveClick(row)}>
                                                    <IconButton >
                                                        <ArchiveIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            : type === 'Archive' ?
                                                <TableCell align="right">
                                                    <Tooltip title="Reactive" onClick={() => handleDeliveryClick(row)}>
                                                        <IconButton >
                                                            <RedoIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                : null
                                        )
                                    )
                                    }
                                </>
                            }
                        </TableRow>
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
