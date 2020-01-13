import React, {useEffect} from 'react';
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {SelectBox} from "devextreme-react";
import ArrayStore from 'devextreme/data/array_store';
import {changeCurrentEnterprise} from "../../modules/userReducer";

const Enterprise = (props) => {
    const enterprises = useSelector(state => state.userReducer.enterprises, shallowEqual);
    const selectedEnterprise = useSelector(state => state.userReducer.selectedEnterprise,shallowEqual);
    const change = useDispatch()


    const changeValueEnterprise = (event) => {
          console.log(event.value);
          change(changeCurrentEnterprise(event.value));
    }

    const data = new ArrayStore({
        data: enterprises,
        key: 'id'
    });
    return (

        <SelectBox
            dataSource={data}
            displayExpr="name"
            valueExpr="id"
            value={selectedEnterprise}
            onValueChanged={changeValueEnterprise}
        />
    )

};

export default Enterprise;