import React from 'react'; 
import Menu from './DrawMenu'
import ClientDetails from './ClientDetails'

const Dashboard = (props) => {
    return (
        <div>
        <Menu loggedInCompany={props.loggedInCompany} />
        </div>
    )
}

export default Dashboard;