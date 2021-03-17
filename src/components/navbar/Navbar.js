import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import './Navbar.css';

import axios from 'axios';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { currencyState, currencyShekelState } from '../../Atoms/currencyState';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        color: 'secondary'
    },
}));

function Navbar() {

    const setCurrencyShekelState = useSetRecoilState(currencyShekelState);
    const [currency, setCurrency] = useRecoilState(currencyState);
    const [selected, setSelected] = useState(true);
    const [selectedByItem, setSelectedByItem] = useState(true);
    const [error, setError] = useState(true);
    const classes = useStyles();

    const history = useHistory();

    useEffect(() =>
        (() => {
            history.push("/by-item/delivery");
            fetchCurrency();
            setInterval(() => {
                fetchCurrency()
            }, 10000);

        })(), []);

    const fetchCurrency = async () => {
        try {
            const { data } = await axios.get("https://api.exchangeratesapi.io/latest");
            const currentCurrency = data.rates.ILS / data.rates.USD;
            setCurrencyShekelState(currentCurrency);
            setError();
        } catch (err) {
            setError(err.message);
        }
    }

    const handleChange = useCallback((event) => {
        setCurrency(event.target.value)
    }, [currency])

    const handleClick = (target) => {
        history.push(target)
        if (target === "/by-item/delivery") {
            setSelected(true)
        } else {
            setSelected(false)
        }
    }

    const handleClickByItem = (target) => {
        history.push(target)
        if (target === "/by-item/delivery") {
            setSelectedByItem(true)
        } else {
            setSelectedByItem(false)
        }
    }

    return (
        <div id="navbar">
            <div id="main-navbar">
                {selected ?
                    <div id="purchase-bar">
                        <div className="selected" onClick={() => handleClick("/by-item/delivery")}>Purchase By Item</div>
                        <div onClick={() => handleClick("/by-store")}>Purchase By Stores</div>
                    </div>
                    :
                    <div id="purchase-bar">
                        <div onClick={() => handleClick("/by-item/delivery")}>Purchase By Item</div>
                        <div className="selected" onClick={() => handleClick("/by-store")}>Purchase By Stores</div>
                    </div>
                }
                {error ?
                    <div id="error">
                        <div>Error Loading Currency</div>
                        <div>Only <span id="dollar">$</span> Available</div>
                    </div>
                    :
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currency}
                            onChange={handleChange}
                        >
                            <MenuItem value={'$'}>$</MenuItem>
                            <MenuItem value={'₪'}>₪</MenuItem>
                        </Select>
                    </FormControl>
                }
            </div>
            {selected && (
                selectedByItem ?
                    <div id="items-bar">
                        <div id="by-item" className="selected" onClick={(e) => handleClickByItem("/by-item/delivery")}>Delivery</div>
                        <div id="by-store" onClick={(e) => handleClickByItem("/by-item/archive")}>Archive</div>
                    </div>
                    :
                    <div id="items-bar">
                        <div id="by-item" onClick={() => handleClickByItem("/by-item/delivery")}>Delivery</div>
                        <div id="by-store" className="selected" onClick={() => handleClickByItem("/by-item/archive")}>Archive</div>
                    </div>
            )
            }
        </div>
    )
}

export default Navbar
