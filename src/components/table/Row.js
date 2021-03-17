import React from 'react';
// material-ui
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Carousel from 'styled-components-carousel';

export default function Row({ row, open, setOpen, type }) {

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            {type === 'Store' ?
                <>
                    <DialogTitle id="alert-dialog-slide-title">{row.store}</DialogTitle>
                    <Carousel
                        center
                        infinite
                        showArrows
                        showIndicator
                        slidesToShow={1}
                    >
                        {row.items.map(item =>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ margin: '10px' }}>{item.name}</div>
                                {item.picture && <img src={item.picture} style={{ height: '100px' }} alt={item.picture} />}
                                <div style={{ margin: '10px' }} className="product-price">Price: {item.price.toFixed(2)}</div>
                            </div>
                        )}
                    </Carousel>
                </>
                :
                <>
                    <DialogTitle id="alert-dialog-slide-title">{row.name}</DialogTitle>
                    <DialogContent>
                        <img src={row.picture} alt="Not Available" height="200px" />
                    </DialogContent>
                </>
            }
        </Dialog>
    );
}
