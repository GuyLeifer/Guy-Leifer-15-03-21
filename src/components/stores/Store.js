import TableMain from '../table/TableMain';

// redux
import { useSelector } from 'react-redux';

function Store() {

    const items = useSelector(state => state.items);
    let itemsByStore = [];

    items.forEach(item => {
        const index = itemsByStore.findIndex(itemByStore => itemByStore.store === item.store);
        if (index !== -1) {
            itemsByStore[index].price += item.price;
            itemsByStore[index].quantity++;
            itemsByStore[index].items = [...itemsByStore[index].items, item];
        } else {
            itemsByStore.push(
                {
                    store: item.store,
                    price: item.price,
                    quantity: 1,
                    items: [item]
                }
            )
        }
    });

    return (
        <div>
            <TableMain items={itemsByStore} type="Store" />
        </div>
    )
}

export default Store
