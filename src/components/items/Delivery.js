import TableMain from '../table/TableMain';

import { itemsState, autoFilterState, deliveryItemsState } from '../../Atoms/itemsState';
import { useRecoilValue } from "recoil";

function Delivery() {

    const items = useRecoilValue(itemsState)
    const autoFilter = useRecoilValue(autoFilterState)
    const autoFilterItems = items.filter(item => item.deliveryEstimate > new Date())

    const deliveryItems = useRecoilValue(deliveryItemsState)

    return (
        <div>
            <TableMain type="Delivery" autoFilter={autoFilter} items={autoFilter ? autoFilterItems : deliveryItems} />
        </div>
    )
}

export default Delivery
