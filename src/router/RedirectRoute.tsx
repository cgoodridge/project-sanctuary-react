import React, { useEffect, useState } from 'react';
import { Route, Navigate } from "react-router-dom";
// import { useStateValue } from '../StateProvider';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const RedirectRoute = ({ children }: any) => {
    const user = useSelector(selectUser);

    // console.log(user);
    //   const [{ user }] = useStateValue();

    return !user ? children : <Navigate to="/login" />
}

export default RedirectRoute