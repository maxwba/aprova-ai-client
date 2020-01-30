import React from 'react'; 
import { Link } from 'react-router-dom'


const ClienteDetails = () => {
    return (
        <div>
            <br/>
            <br/>
            <br/>
        <h3>AQUI APARECE O CLIENT DETAILS (all jobs, all tasks, all jobs done)</h3>
        <p>
        OS JOBS SÃO RENDERIZADOS TODOS AQUI DENTRO...QUANDO CLICA VAI PARA O COMPONENT JOB DETAILS, QUE TEM O EDIT E DELETE DO JOB(...que na verdade é o form)
        </p>
        <Link to="/jobdetail"> Job Detail</Link>

        </div>
    )
}

export default ClienteDetails;