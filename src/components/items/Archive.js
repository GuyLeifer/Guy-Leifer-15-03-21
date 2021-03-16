import TableMain from '../table/TableMain';

import { itemsState, autoFilterState, archiveItemsState } from '../../Atoms/itemsState';
import { useRecoilValue } from "recoil";

function Archive() {

    const items = useRecoilValue(itemsState)
    const autoFilter = useRecoilValue(autoFilterState)
    const autoFilterItems = items.filter(item => item.deliveryEstimate < new Date())

    const archiveItems = useRecoilValue(archiveItemsState)

    return (
        <div>
            <TableMain type="Archive" autoFilter={autoFilter} items={autoFilter ? autoFilterItems : archiveItems} />
        </div>
    )
}

export default Archive
