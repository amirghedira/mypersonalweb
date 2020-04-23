import React from "react";
import CardComponent from './CardComponent/CardComponent'
import GlobalContext from 'context/GlobalContext'
import Loading from '../../LoadingPage/LoadingPage'
import axios from '../../../utils/axios'
// reactstrap components
import {
    Container,
    Row,
    Col

} from "reactstrap";

const Tabs = (props) => {
    const context = React.useContext(GlobalContext)
    const [isLoading, SetIsloading] = React.useState(true)
    React.useEffect(() => {
        if (context.projects)
            SetIsloading(false)
    }, [context.projects])

    const savechangesHandler = (info) => {
        const index = context.projects.findIndex(project => { return project._id === info.id })
        const Newproject = {
            ...context.projects[index],
            summary: info.content
        }
        const headers = {
            'Authorization': 'Bearer ' + context.token
        }
        axios.patch('/project/' + info.id, { propName: 'summary', value: info.content }, { headers: headers })
            .then(result => {
                context.UpdateProjects(index, Newproject)
            })
            .catch(err => { context.ErrorAccureHandler(); })
        context.UpdateProjects(index, Newproject);

    }

    if (isLoading)
        return (
            <Container >
                <Row>
                    <Col >
                        <Loading minHeight="80vh" />
                    </Col>

                </Row>
            </Container>

        )
    else
        return (

            <Container style={{ marginTop: '70px', minHeight: '30vh' }}>
                {context.projects.slice(0).reverse().map(project => {
                    return <CardComponent
                        key={project._id}
                        _id={project._id}
                        projectname={project.name}
                        date={project.date}
                        status={project.status}
                        summary={project.summary}
                        platform={project.platform}
                        features={project.features}
                        github={project.github}
                        filelink={project.filelink}
                        SaveChangesFunction={savechangesHandler}
                    />
                })
                }


            </Container>


        )

}

export default Tabs;
