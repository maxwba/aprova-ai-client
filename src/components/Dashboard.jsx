import React from "react";
import Menu from "./DrawMenu";

const Dashboard = props => {


  return (
    <div>
      <Menu loggedInCompany={props.loggedInCompany} getTheClient={props.getTheClient} currentClient={props.currentClient}/>
    </div>
  );
};

export default Dashboard;
