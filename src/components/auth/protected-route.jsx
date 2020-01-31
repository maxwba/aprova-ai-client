import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute  = ({component: Component, company, ...rest}) => {
  console.log({component: Component, company, ...rest})
    return (
      <Route
        {...rest}
        render={ props  => {
            if(company){
              return <Component {...props} loggedInCompany={company}/>
            } else {
              return <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default ProtectedRoute;