import React from 'react';
import {useSelector,shallowEqual} from "react-redux";
import {SelectBox} from "devextreme-react";

const Enterprise = (props) => {
    const enterprises = useSelector(state => state.userReducer.enterprises,shallowEqual);
    console.log("Enterprise - ",enterprises)
    return (

            <SelectBox dataSource={enterprises}
                       displayExpr="name"
                       valueExpr="id"
                       defaultValue={enterprises !== null ? enterprises[0].id: null}
            />

    );
};

export default Enterprise;