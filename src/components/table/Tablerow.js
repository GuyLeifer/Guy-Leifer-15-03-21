import { useState } from 'react';
import Row from './Row';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

// icons
import IconButton from '@material-ui/core/IconButton';
import ArchiveIcon from '@material-ui/icons/Archive';
import RedoIcon from '@material-ui/icons/Redo';

// redux
import { useSelector } from 'react-redux';;

function Tablerow(props) {

    // redux states
    const currency = useSelector(state => state.currency);
    const currencyShekel = useSelector(state => state.currencyShekel);

    const [open, setOpen] = useState(false);
    const [delayHandler, setDelayHandler] = useState()

    const { row, isItemSelected, type, handleClick, labelId, autoFilter, handleArchiveClick, handleDeliveryClick } = props;

    const handleMouseEnter = event => {
        if (row.picture) {
            setDelayHandler(setTimeout(() => {
                setOpen(true)
            }, 1500))
        } else if (type === 'Store') {
            setDelayHandler(setTimeout(() => {
                setOpen(true)
            }, 1500))
        }
    }

    const handleMouseLeave = () => {
        clearTimeout(delayHandler);
        setOpen(false)
    }

    return (
        <>
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={type === 'store' ? row.store : row.id}
                selected={isItemSelected}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <TableCell padding="checkbox" onClick={() => handleClick(row.hasOwnProperty('id') ? row.id : row.store)}>
                    <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </TableCell>
                {type === 'Store' ?
                    <>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.store}
                        </TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
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
                {open && type !== 'Store' && <Row row={row} open={open} setOpen={setOpen} type={type} />}
                {open && type === 'Store' && <Row row={row} open={open} setOpen={setOpen} type={type} />}
            </TableRow>
        </>
    )
}

export default Tablerow
