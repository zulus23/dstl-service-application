import React,{Fragment} from 'react';
import { DateBox } from 'devextreme-react'
const RangeDate = () => {
    return (
        <Fragment>
           <DateBox key={'dateBegin'}/>
           <DateBox key={'dateEnd'}/>
        </Fragment>
    );
};

export default RangeDate;