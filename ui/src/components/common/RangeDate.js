import React, {Fragment, useEffect, useState} from 'react';
import { DateBox } from 'devextreme-react'

import 'dayjs/locale/ru'
import dayjs from "dayjs"; // load on demand
const RangeDate = () => {
    const [dateBeginValue,setDateBegin] = useState(dayjs(new Date()))
    const [dateEndValue,setDateEnd] = useState(dayjs(new Date()).add(2, 'day'))



    const  changeDateBegin = (event) => {
        setDateBegin(dayjs(event.value).locale('ru'))
    }
    const  changeEndBegin = (event) => {
        setDateEnd(dayjs(event.value).locale('ru'))
    }


    return (
        <Fragment>
           <DateBox key={'dateBegin'} value={dateBeginValue} max={dayjs(dateEndValue).add(-2,'day')} type='date' onValueChanged={changeDateBegin}/>
           <DateBox key={'dateEnd'} value={dateEndValue} min={dayjs(dateBeginValue).add(1,'day')} type='date' onValueChanged={changeEndBegin}/>
        </Fragment>
    );
};

export default RangeDate;