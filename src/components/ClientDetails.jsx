import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Renderform from "./Renderform";

export default function ClienteDetails() {
  const [client, handleClient] = React.useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/client", {
      withCredentials: true
    }).then(responseFromApi => {
      handleClient(responseFromApi.data);
    });
  }, []);

  console.log(client);

  return (
    <>
      <div>
        <br />
        <br />
        <h1>{client.name}</h1>
        <br />
        <h3>
          AQUI APARECE O CLIENT DETAILS (all jobs, all tasks, all jobs done)
        </h3>
        <p>
          OS JOBS SÃO RENDERIZADOS TODOS AQUI DENTRO...QUANDO CLICA VAI PARA O
          COMPONENT JOB DETAILS, QUE TEM O EDIT E DELETE DO JOB(...que na
          verdade é o form)
        </p>
        <Link to="/jobdetail"> Job Detail</Link>
      </div>

      <Renderform />
    </>
  );
}
