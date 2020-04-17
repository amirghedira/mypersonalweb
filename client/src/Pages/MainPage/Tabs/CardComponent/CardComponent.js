import React from 'react'
import { Link } from "react-router-dom";
import GlobalContext from 'context/GlobalContext'
import {
    Card,
    CardHeader,
    CardBody,
    Badge,
    Nav,
    Col,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    Row,
    Button,
    CardFooter
} from "reactstrap";
import TextareaAutosize from 'react-autosize-textarea/lib';
import FormatDate from 'utils/FormatDate'


const CardComponent = (props) => {

    const context = React.useContext(GlobalContext)
    const [focusedDownload, setfocusedDownload] = React.useState(false);
    const [focusedReadmore, setfocusedReadmore] = React.useState(false);
    const [focusedGithub, setfocusedGithub] = React.useState(false);
    const [EditPost, setEditPost] = React.useState(false);
    const [isLoading, setIsloading] = React.useState(true)

    React.useEffect(() => {
        if (context.UserProfile)
            setIsloading(false)
    }, [context.UserProfile])
    const pStyle = {
        witdh: '50px',
        height: '50px',
        marginLeft: '10px'
    };

    let badge = null;
    if (props.status === "Finished")
        badge = <Badge color="success" className="mr-1">Finished</Badge>
    else
        badge = <Badge color="warning" className="mr-1">Unfinished</Badge>
    return (
        <Row>
            <Col key={props._id} className="ml-auto mr-auto" md="12" xl="8" >
                <Card>
                    <CardHeader>
                        <Nav expand="lg" style={{ witdh: '40px', height: '60px', backgroundColor: 'white', marginTop: '10px' }}>

                            <div style={{ marginTop: '6px', display: 'flex' }}>
                                <Link to={'/amirghedira'}>
                                    {isLoading ? null :
                                        <img
                                            alt="..."
                                            className="rounded-circle img-raised"
                                            style={pStyle}
                                            src={context.UserProfile.profileimage}
                                        />
                                    }
                                </Link>
                                <div>
                                    <h3 style={{ color: 'black', fontSize: '17px', fontWeight: '500', paddingLeft: '10px', marginTop: '15px' }}>
                                        {props.projectname}
                                    </h3>
                                    <h5 style={{ color: '#808080', fontSize: '12px', marginLeft: "10px", marginTop: '-25px' }}>Posted:{' '}
                                        <FormatDate>{props.date}</FormatDate></h5>
                                </div>

                            </div>
                            <div style={{ flex: '1' }}>
                            </div>
                            <div>

                                <div style={{ display: 'flex', marginTop: '20px', marginRight: '10px' }}>
                                    <div>
                                        {badge}
                                    </div>
                                    <div >
                                        {context.token ? (<Nav
                                            className="nav-pills-info nav-pills-just-icons"
                                        >
                                            <UncontrolledDropdown nav>
                                                <DropdownToggle

                                                    nav
                                                >
                                                    <i className="fas fa-ellipsis-h" style={{ color: 'black' }}></i>

                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem header tag="a">
                                                        Settings
                                                   </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() => { setEditPost(true) }}
                                                    >
                                                        Edit Post
                                                  </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() => { context.deleteprojectHandler(props._id) }}
                                                    >
                                                        Delete
                                                  </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav>) : null}
                                    </div>
                                </div>

                            </div>


                        </Nav>
                    </CardHeader>
                    <CardBody style={{ minHeight: '300px', minWidth: '40px', paddingTop: '30px' }}>
                        {EditPost ?
                            <div>
                                <TextareaAutosize
                                    id="editedpost"
                                    style={{ minWidth: '100%' }}
                                    rows={11}
                                    defaultValue={props.summary} />
                                <Button
                                    color="info"
                                    onClick={() => {
                                        setEditPost(false)
                                        props.SaveChangesFunction({
                                            id: props._id,
                                            content: document.getElementById('editedpost').value
                                        })
                                    }}
                                > Save </Button>
                                <Button
                                    color="danger"
                                    onClick={() => { setEditPost(false) }}
                                > Cancel
                                </Button>
                            </div>

                            :
                            <pre style={{ whiteSpace: 'pre-wrap' }}>
                                {props.summary}
                            </pre>
                        }


                    </CardBody>
                    <CardFooter>
                        <hr style={{ maxWidth: '90%', marginBottom: '0' }} />
                        <Row style={{ margin: '5px' }}>

                            <Col style={{ dispaly: 'flex', marginLeft: '10px', marginRight: '10px' }} >
                                <a href={props.filelink} download
                                    onClick={() => { context.UpdateDownloadCount(props._id); }}>
                                    <Button
                                        onMouseEnter={() => { setfocusedDownload(true) }}
                                        onMouseLeave={() => { setfocusedDownload(false) }}
                                        style={{ margin: 'auto', backgroundColor: focusedDownload ? '#d9d9d9' : 'transparent', color: 'black', width: '100%', fontWeight: 'bold' }}>
                                        <i className="fas fa-download fa-2x" ></i>

                                        <p style={{ margin: '0', fontWeight: '700' }}>Download</p>
                                    </Button>
                                </a>

                            </Col>
                            <Col style={{ dispaly: 'flex', marginLeft: '10px', marginRight: '10px' }}  >
                                <Link to={"/projects/" + props._id} style={{ color: 'black', textDecoration: 'none' }}>
                                    <Button
                                        style={{ margin: 'auto', backgroundColor: focusedReadmore ? '#d9d9d9' : 'transparent', color: 'black', width: '100%', fontWeight: 'bold' }}
                                        onMouseEnter={() => { setfocusedReadmore(true) }}
                                        onMouseLeave={() => { setfocusedReadmore(false) }}
                                    >
                                        <i className="fas fa-book-reader fa-2x" ></i>
                                        <p style={{ margin: '0', fontWeight: '700' }}>Read More</p>

                                    </Button>
                                </Link>
                            </Col>

                            <Col style={{ dispaly: 'flex', marginLeft: '10px', marginRight: '10px' }}  >
                                <Button
                                    onMouseEnter={() => { setfocusedGithub(true) }}
                                    onMouseLeave={() => { setfocusedGithub(false) }}
                                    style={{ margin: 'auto', backgroundColor: focusedGithub ? '#d9d9d9' : 'transparent', color: 'black', width: '100%', fontWeight: 'bold' }}>
                                    <i className="fab fa-github fa-2x" ></i>
                                    <p style={{ margin: '0', fontWeight: '700', fontSize: '14px' }}>Github</p>

                                </Button>
                            </Col>
                        </Row>
                        <hr style={{ maxWidth: '90%', marginTop: '0', marginBottom: '20px' }} />

                    </CardFooter>
                </Card >
            </Col >
        </Row>

    )

}

export default CardComponent