import React from 'react'; 
// import Menu from './Menu'
import Menu from './DrawMenu'
import ClientDetails from './ClientDetails'

const Dashboard = () => {
    return (
        <div>
        {/* <Menu /> */}
        <Menu />
        <ClientDetails />
        </div>
    )
}

export default Dashboard;