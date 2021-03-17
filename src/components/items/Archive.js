import TableMain from '../table/TableMain';

// redux
import { useSelector } from 'react-redux';

function Archive() {

    const items = useSelector(state => state.items);
    const autoFilter = useSelector(state => state.autoFilter);
    const autoFilterItems = items.filter(item => item.deliveryEstimate < new Date());
    const archiveItems = useSelector(state => state.archiveItems);

    return (
        <div>
            <TableMain type="Archive" autoFilter={autoFilter} items={autoFilter ? autoFilterItems : archiveItems} />
        </div>
    )
}

export default Archive
