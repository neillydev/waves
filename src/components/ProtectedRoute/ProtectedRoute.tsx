import React, { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

import { Redirect, Route, RouteProps } from 'react-router';

export type ProtectedRouteProps = {
} & RouteProps;

export default function ProtectedRoute({ ...routeProps }: ProtectedRouteProps) {
    const { authState } = useContext(AuthContext);
    if (authState) {
        return <Route {...routeProps} />;
    } else {
        return <Redirect to={{ pathname: '/' }} />;
    }
};