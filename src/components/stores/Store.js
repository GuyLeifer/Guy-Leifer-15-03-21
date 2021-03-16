import TableMain from '../table/TableMain';
import { itemsState } from '../../Atoms/itemsState';
import { useRecoilValue } from "recoil";

function Store() {

    const items = useRecoilValue(itemsState);
    let itemsByStore = [];

    items.forEach(item => {
        const index = itemsByStore.findIndex(itemByStore => itemByStore.store === item.store);
        if (index !== -1) {
            itemsByStore[index].price += item.price;
            itemsByStore[index].quentity++;
            itemsByStore[index].items = [...itemsByStore[index].items, item];
        } else {
            itemsByStore.push(
                {
                    store: item.store,
                    price: item.price,
                    quentity: 1,
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
