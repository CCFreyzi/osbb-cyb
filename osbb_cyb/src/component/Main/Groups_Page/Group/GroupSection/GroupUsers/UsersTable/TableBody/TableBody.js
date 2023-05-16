import s from './TableBody.module.scss'
import {DataRenderer, StringRenderer, NumberRenderer} from '../dataRenderer';
import {v4 as uuidv4} from "uuid";


const RENDERS = {
    DATE: DataRenderer,
    STRING: StringRenderer,
    NUMBER: NumberRenderer,
}
const TableBody = ({users, columns}) => {
    console.log(users)
    console.log(columns)

    return <div className={s.table_body}>
        {users.map(user => {
            const uuid = uuidv4()
            return <div className={s.tableText} key={uuid}>
                {columns.filter(({isShow}) => isShow).map(column => {
                    // console.log(column)
                    // console.log(user[column.value])
                    const Renderer = RENDERS[column.type];
                    return <Renderer key={column.id} data={user[column.value]}/>
                })}
            </div>
        })}

    </div>
}

export default TableBody;