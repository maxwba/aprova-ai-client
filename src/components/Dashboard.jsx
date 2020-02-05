import React from "react";
import Menu from "./DrawMenu";
import Teste from "./Teste";

const Dashboard = props => {
  return (
    <div>
      <Menu loggedInCompany={props.loggedInCompany} />
    </div>
  );
};

export default Dashboard;
