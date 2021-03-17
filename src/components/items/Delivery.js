import TableMain from '../table/TableMain';

// redux
import { useSelector } from 'react-redux';

function Delivery() {

    const items = useSelector(state => state.items);
    const autoFilter = useSelector(state => state.autoFilter);
    const autoFilterItems = items.filter(item => item.deliveryEstimate > new Date());
    const deliveryItems = useSelector(state => state.deliveryItems);

    return (
        <div>
            <TableMain type="Delivery" autoFilter={autoFilter} items={autoFilter ? autoFilterItems : deliveryItems} />
        </div>
    )
}

export default Delivery
