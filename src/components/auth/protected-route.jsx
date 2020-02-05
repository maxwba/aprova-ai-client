import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute  = ({component: Component, company, getTheClient, currentClient, ...rest}) => {
    return (
      <Route
        {...rest}
        render={ props  => {
            if(company){
              return <Component {...props} loggedInCompany={company}  getTheClient={getTheClient} currentClient={currentClient}  />
            } else {
              return <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default ProtectedRoute;