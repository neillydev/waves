import React, { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

import { Redirect, Route, RouteProps } from 'react-router';

export type ProtectedRouteProps = {
} & RouteProps;

export default function ProtectedRoute({ ...routeProps }: ProtectedRouteProps) {
    const { authState } = useContext(AuthContext);
    console.log(authState);
    if (authState) {
        return <Route {...routeProps} />;
    } else {
        console.log('...redirecting because not authenticated')
        return <Redirect to={{ pathname: '/' }} />;
    }
};