import {useDispatch} from "react-redux";
import s from './TableHead.module.scss'

const TableHead = ({columns}) => {

    const dispatch = useDispatch()

    return (
        <div className={s.table_head}>

            {columns.filter(({isShow}) => isShow).map(column => {
                return <div key={column.id}>
                    <div className={s.tableTitle}>
                        {column.name}
                    </div>
                </div>
            })}
        </div>
    )
}

export default TableHead;