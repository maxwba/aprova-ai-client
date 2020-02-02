import React from "react";
import Menu from "./DrawMenu";

const Dashboard = props => {
  return (
    <div>
      <Menu loggedInCompany={props.loggedInCompany} />
    </div>
  );
};

export default Dashboard;
