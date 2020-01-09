import React, {useEffect} from 'react';
import {useSelector, shallowEqual} from "react-redux";
import {SelectBox} from "devextreme-react";
import ArrayStore from 'devextreme/data/array_store';

const Enterprise = (props) => {
    const enterprises = useSelector(state => state.userReducer.enterprises, shallowEqual);
    const selectedEnterprise = useSelector(state => state.userReducer.selectedEnterprise);


    useEffect( () => {console.log("selectedEnterprise - ", selectedEnterprise)
    })

    const data = new ArrayStore({
        data: enterprises,
        key: 'id'
    });
    return (

        < SelectBox
            dataSource={data}
            displayExpr="name"
            valueExpr="id"
            defaultValue={selectedEnterprise}
        />
    )

};

export default Enterprise;