import React from 'react';
import classes from './PostCard.module.css';
import { Nav, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, NavItem, NavLink } from 'reactstrap'
import GlobalContext from 'components/context/GlobalContext'
import FormatDate from 'utils/FormatDate'
import { Link } from 'react-router-dom'
const PostCard = (props) => {
    const context = React.useContext(GlobalContext)
    const isadmin = props.autor === 'admin' ? true : false;
    const [width, setwitdh] = React.useState(window.innerWidth)

    const handleFunction = function () {
        setwitdh(window.innerWidth)
    }
    React.useEffect(() => {
        window.addEventListener('resize', handleFunction)
        return () => {
            window.removeEventListener('resize', handleFunction);
        }
    }, [])


    return (
        <div>
            <div style={{ marginBottom: '50px' }}>
                <Row>
                    <Col >
                        <Nav className={classes.Navbar} style={{ minHeight: width < 800 ? '80px' : null, height: 'fit-content' }} expand="lg">
                            {width < 800 ?
                                <NavItem style={{ display: 'flex' }}>
                                    <img src={isadmin ? context.UserProfile.profileimage : require("assets/img/default-avatar.png")} style={{ height: '40px', width: '40px', margin: '10px' }} alt="" />
                                </NavItem>
                                : null
                            }
                            <NavItem style={{ marginLeft: '20px', display: width > 525 ? 'flex' : 'flex', padding: '0' }}>
                                {
                                    <NavLink to='/amirghedira' style={{ textJustify: 'flex-start', padding: '0', display: width > 525 ? 'flex' : 'block', margin: 'auto' }} tag={isadmin ? Link : 'div'}>
                                        <strong className={classes.postname} style={{ color: 'white', marginLeft: width > 800 ? '20px' : null, width: '120px', maxWidth: '120px' }}>{
                                            isadmin ? context.UserProfile.name : props.autor} </strong>
                                        {width < 525 ?
                                            <div style={{ display: 'block', margin: 'auto' }}>
                                                <h5 className={classes.postinfo} style={{ color: 'white', margin: '0' }}>Posted:{' '}
                                                    <FormatDate >{props.date}</FormatDate>
                                                </h5>

                                                {
                                                    props.token ?
                                                        <p style={{ color: 'white', fontStyle: 'italic', fontSize: '14px', fontWeight: '500' }}>{props.ip}</p>
                                                        :
                                                        null
                                                }
                                            </div>
                                            :
                                            null}
                                    </NavLink>


                                }
                            </NavItem>
                            <NavItem style={{ flex: '0.1' }}> </NavItem>
                            {width > 525 ?
                                <NavItem style={{ display: width > 525 ? 'flex' : 'block' }}>
                                    <h5 className={classes.postinfo} style={{ color: 'white', margin: 'auto', paddingLeft: '10px' }}>Posted:{' '}
                                        <FormatDate >{props.date}</FormatDate>
                                    </h5>
                                </NavItem>
                                : null
                            }



                            <NavItem style={{ flex: '1' }}> </NavItem>
                            {width > 525 && props.token ?
                                <NavItem style={{ marginLeft: '10px', display: 'flex' }} >
                                    <p style={{ color: 'white', fontStyle: 'italic', fontSize: '14px', margin: 'auto', fontWeight: '500' }}>{props.ip}</p>
                                </NavItem>
                                : null}

                            <NavItem style={{ display: 'flex' }} >
                                {
                                    props.token ?
                                        <UncontrolledDropdown style={{ margin: 'auto' }}>
                                            <DropdownToggle
                                                nav
                                            >
                                                <i className="now-ui-icons ui-1_settings-gear-63" style={{ color: 'white' }}></i>
                                            </DropdownToggle>
                                            <DropdownMenu style={{ marginTop: '-8px', marginRight: '8px' }} right>
                                                {props.closeOpenFunction ?
                                                    <DropdownItem
                                                        onClick={props.closeOpenFunction}>
                                                        Open/Close
                                        </DropdownItem>
                                                    : null
                                                }
                                                <DropdownItem
                                                    onClick={props.deleteFunction}>
                                                    Delete
                                        </DropdownItem>
                                                <DropdownItem
                                                    onClick={props.banMemberFunction}
                                                >
                                                    Ban
                                        </DropdownItem>

                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        :
                                        null

                                }

                            </NavItem>
                        </Nav>
                    </Col>

                </Row>
                <Row className={classes.topicContent}>
                    {width > 800 ?
                        <Col md="3" xl="2" style={{ display: 'flex', marginRight: '12px' }}>

                            <img src={isadmin ? context.UserProfile.profileimage : require("assets/img/default-avatar.png")} style={{ height: '220px', width: '150px', margin: 'auto', marginTop: '40px' }} alt="" />
                        </Col>
                        :
                        null
                    }

                    <Col >
                        <pre style={{ whiteSpace: 'pre-wrap', marginTop: '40px', paddingLeft: '' }}>
                            {props.content}
                        </pre>
                    </Col>

                </Row>
            </div>

        </div >
    )
}

export default PostCard;