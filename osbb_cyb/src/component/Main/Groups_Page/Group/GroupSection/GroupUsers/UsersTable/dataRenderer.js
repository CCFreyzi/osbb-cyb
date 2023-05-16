import React from "react";


const DataRenderer = ({data}) => {
    const date = data ? new Date(data) : new Date()
    return (
        <div>
            {date.getDay() + ' / ' + date.getMonth() + ' / ' + date.getFullYear()}
        </div>
    )
}


const NumberRenderer = ({data}) => {

    return <div>
        {data}
    </div>
}

const StringRenderer = ({data}) => {

    return <div>
        {data}
    </div>
}

export {DataRenderer, StringRenderer, NumberRenderer};