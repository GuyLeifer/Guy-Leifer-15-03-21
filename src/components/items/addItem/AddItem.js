import { useState, useEffect } from 'react';
import axios from 'axios';
// import { generateMockData } from '../mockdata/mockdata';

// components
import Products from './Products';
import Loader from './Loader';

// recoil
import { currencyState, currencyShekelState } from '../../../Atoms/currencyState';
import { itemsState, archiveItemsState, deliveryItemsState } from '../../../Atoms/itemsState';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddItem({ add, setAdd }) {

    const [name, setName] = useState('');
    const [store, setStore] = useState('');
    const [price, setPrice] = useState('');
    const [picture, setPicture] = useState('');
    const [deliveryEstimate, setDeliveryEstimate] = useState('');
    const [products, setProducts] = useState([]);
    const [errorServer, setErrorServer] = useState();
    const [error, setError] = useState();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const currency = useRecoilValue(currencyState);
    const currencyShekel = useRecoilValue(currencyShekelState);
    const [items, setItems] = useRecoilState(itemsState);
    const setArchiveItems = useSetRecoilState(archiveItemsState);
    const setDeliveryItems = useSetRecoilState(deliveryItemsState);

    useEffect(() =>
        (async () => {
            try {
                const { data } = await axios.get('https://fakestoreapi.com/products');
                setProducts(data)
                setLoading(false)
            } catch (err) {
                setErrorServer(err.message)
                setLoading(false)
            }
        })(), [])

    const handleClose = () => {
        setAdd(false);
    };

    const handleSubmit = () => {
        if (!name || !price || !store || !deliveryEstimate) {
            setError("*** Please Fill All Fields ***")
        } else {
            const date = new Date(deliveryEstimate);
            let counterId = 1;
            let id;
            const index = items.findIndex(item => item.id === counterId);
            if (index === -1) id = counterId;
            const item = { id, name, store, price: Number(price), deliveryEstimate: date, picture }
            setItems(prev => [...prev, item])
            if (new Date() > date) {
                setArchiveItems(prev => [...prev, item])
            } else {
                setDeliveryItems(prev => [...prev, item])
            }
            setAdd(false)
        }
    };

    const setPriceInDollar = (value) => {
        if (currency !== "$") {
            const dollarValue = value / currencyShekel;
            console.log("dollarValue")
            setPrice(dollarValue);
        } else {
            setPrice(value);
        }
    }

    const productSetter = (product) => {
        setPriceInDollar(product.price);
        setName(product.title);
        setPicture(product.image)
    }

    // const addMockData = () => {

    //     const mockdata = generateMockData();
    //     setItems(mockdata);
    //     setDeliveryItems(mockdata.filter(item => item.deliveryEstimate > new Date()));
    //     setArchiveItems(mockdata.filter(item => item.deliveryEstimate < new Date()));

    //     setAdd(false)
    // }

    return (
        <div>
            <Dialog open={add} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If You Want To Add a New Item You Can Do It By Submitting It Here
                        {loading ?
                            <div style={{ textAlign: 'center' }}>
                                <Loader />
                                <div>Loading Catalog ...</div>
                            </div>
                            : products.length > 0 ?
                                <div onClick={() => setOpen(prev => !prev)} style={{ cursor: 'pointer' }}>Or Select From <strong>Our Catalog</strong></div>
                                : errorServer ?
                                    <div style={{ color: 'red' }}>We are Sorry, Our Catalog Is Not Available Right Now</div>
                                    : null
                        }
                    </DialogContentText>
                    {open && <Products products={products} productSetter={productSetter} />}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Item Name"
                        type="text"
                        fullWidth
                        onInput={e => setName(e.target.value)}
                        value={name}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="store"
                        label="Store"
                        type="text"
                        fullWidth
                        onInput={e => setStore(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label={`Price ${currency}`}
                        type="number"
                        fullWidth
                        onInput={e => setPriceInDollar(e.target.value)}
                        value={Number(price)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="picture"
                        label="Picture Link"
                        type="text"
                        fullWidth
                        onInput={e => setPicture(e.target.value)}
                        value={picture}
                    />

                    <TextField
                        autoFocus
                        id="estimateDate"
                        label="Recive Date Estimation"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        onInput={e => setDeliveryEstimate(e.target.value)}
                    />
                </DialogContent>
                <DialogContentText>
                    {error}
                </DialogContentText>
                <DialogActions>
                    {/* <Button onClick={addMockData} color="primary">
                        Add Mock Data
                    </Button> */}
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
