import { useState } from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import AddItem from '../items/AddItem';

// recoil
import { autoFilterState, itemsState, archiveItemsState, deliveryItemsState } from '../../Atoms/itemsState';
import { useSetRecoilState, useRecoilState } from "recoil";

// material-ui
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// icons
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

function ToolBar(props) {

    const [add, setAdd] = useState(false);
    const classes = useToolbarStyles();
    const { numSelected, type, selected, setSelected } = props;
    const setAutoFilter = useSetRecoilState(autoFilterState);

    const [items, setItems] = useRecoilState(itemsState)
    const [archiveItems, setArchiveItems] = useRecoilState(archiveItemsState)
    const [deliveryItems, setDeliveryItems] = useRecoilState(deliveryItemsState)

    const deleteItems = () => {
        if (type === 'Store') {
            const filteredItems = items.filter(item => !selected.includes(item.store))
            setItems(filteredItems)
            const filterdDelivery = deliveryItems.filter(item => !selected.includes(item.store))
            setDeliveryItems(filterdDelivery)
            const filteredArchive = archiveItems.filter(item => !selected.includes(item.store))
            setArchiveItems(filteredArchive)
        } else {
            const filteredItems = items.filter(item => !selected.includes(item.id))
            setItems(filteredItems)
            const filterdDelivery = deliveryItems.filter(item => !selected.includes(item.id))
            setDeliveryItems(filterdDelivery)
            const filteredArchive = archiveItems.filter(item => !selected.includes(item.id))
            setArchiveItems(filteredArchive)
        }
        setSelected([])
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        {type}
                    </Typography>
                )}

            {numSelected > 0 ? (
                <Tooltip title="Delete" onClick={() => deleteItems()}>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : type === 'Delivery' ? (
                <>
                    <Tooltip title="Add Item" onClick={() => setAdd(prev => !prev)}>
                        <IconButton aria-label="Add Item">
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Auto Filter" onClick={() => setAutoFilter(prev => !prev)}>
                        <IconButton aria-label="Auto Filter">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )
                    : null
            }
            {add &&
                <AddItem add={add} setAdd={setAdd} />
            }
        </Toolbar>
    );
};

ToolBar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default ToolBar
