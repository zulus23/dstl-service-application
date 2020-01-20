import React from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {SelectBox} from "devextreme-react";
import ArrayStore from 'devextreme/data/array_store';
import {changeCurrentEnterprise} from "../../redux/modules/user";

const Enterprise = (props) => {
    const enterprises = useSelector(state => state.user.enterprises, shallowEqual);
    const selectedEnterprise = useSelector(state => state.user.selectedEnterprise,shallowEqual);
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