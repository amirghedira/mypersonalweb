import React from "react";
import LoginModal from '../loginModal/LoginModal'
import GlobalContext from 'context/GlobalContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommonLoading } from 'react-loadingg';

// reactstrap components
import {
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    UncontrolledTooltip,
    Badge
} from "reactstrap";
import { Link } from "react-router-dom";
import { RotateCircleLoading } from 'react-loadingg';
import axios from 'utils/axios';
const IndexNavbar = () => {
    const context = React.useContext(GlobalContext)
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    const [loginerror, setloginerror] = React.useState('')
    const [showloginmodal, setshowloginmodal] = React.useState(false);
    const [LoadingImage, SetLoadingImage] = React.useState(true)
    const [navbarColor, setNavbarColor] = React.useState('navbar-transparent');
    const [LoadingNotification, SetLoadingNotification] = React.useState(true)
    React.useEffect(() => {
        if (context.UserProfile)
            SetLoadingImage(false)

        if (context.Notifications)
            SetLoadingNotification(false)


    }, [context.token, context.UserProfile, context.Notifications])


    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 199 ||
                document.body.scrollTop > 199
            ) {
                setNavbarColor('');
            } else if (
                document.documentElement.scrollTop < 200 ||
                document.body.scrollTop < 200
            ) {
                setNavbarColor("navbar-transparent");
            }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };

    });
    const DisconnectHandler = () => {
        toast.success("Successfully disconnected", { position: toast.POSITION.BOTTOM_RIGHT })
        context.disconnectHandler();
    }
    const loginHandler = (logininfo) => {
        axios.post('/user/login', { username: logininfo.username, password: logininfo.password })
            .then(result => {

                if (result.status === 200) {
                    setshowloginmodal(false)
                    setloginerror('')
                    toast.success(result.data.message, { position: toast.POSITION.BOTTOM_RIGHT })
                    context.loginHandler(result.data.token)
                } else
                    setloginerror(result.data.message)

            })
            .catch(err => {
                context.ErrorAccureHandler();
            })

    }
    const hideshowHandler = () => {

        setshowloginmodal(!showloginmodal)
    }

    const focusgainedHandler = () => {
        setloginerror('')
    }

    let profileImageComponent = null;
    if (context.token) {
        profileImageComponent = (
            <Nav
                className="nav-pills-info nav-pills-just-icons"
            >
                <UncontrolledDropdown nav>
                    <DropdownToggle

                        nav
                    >
                        {LoadingImage ?

                            <RotateCircleLoading
                                size="small"
                                color='white'
                                style={{ width: '25px', height: '25px' }}
                            />
                            :
                            <img
                                alt="..."
                                className="rounded-circle img-raised"
                                style={{
                                    witdh: '30px',
                                    height: '30px'
                                }}
                                src={context.UserProfile.profileimage}
                            />
                        }

                    </DropdownToggle>
                    <DropdownMenu right>
                        <Link to="/amirghedira"
                            style={{ color: 'black' }}
                            onClick={() => {
                                setCollapseOpen(false)

                            }}>
                            <DropdownItem>
                                profile
                            </DropdownItem>
                        </Link>
                        <Link to="/settings"
                            style={{ color: 'black' }}
                            onClick={() => {
                                setCollapseOpen(false)

                            }}>
                            <DropdownItem>
                                Settings
                             </DropdownItem>
                        </Link>
                        <DropdownItem
                            onClick={() => { setCollapseOpen(false); DisconnectHandler(); }}
                        >
                            Disconnect
                </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>

        )
    }
    else
        profileImageComponent =
            (<NavItem>
                <NavLink
                    onClick={hideshowHandler}
                    id="login-tooltip"
                >
                    <i className="fas fa-user fa-2x" style={{ marginTop: '5px' }}></i>
                </NavLink>
                <UncontrolledTooltip target="#login-tooltip">
                    Staff Login
          </UncontrolledTooltip>
            </NavItem>)

    return (
        <>
            {collapseOpen ? (
                <div
                    id="bodyClick"
                    onClick={() => {

                        document.documentElement.classList.toggle("nav-open");
                        setCollapseOpen(!collapseOpen);


                    }}
                />
            ) : null}
            <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand
                            to="/home"
                            tag={Link}
                            id="navbar-brand"
                            onClick={() => {
                                setCollapseOpen(false)

                            }}
                        >
                            Home
                </NavbarBrand>
                        <UncontrolledTooltip target="#navbar-brand">
                            Home page
                </UncontrolledTooltip>
                        <button
                            className="navbar-toggler navbar-toggler"
                            onClick={() => {
                                document.documentElement.classList.toggle("nav-open");
                                setCollapseOpen(!collapseOpen);
                            }}
                            aria-expanded={collapseOpen}
                            type="button"
                        >
                            <span className="navbar-toggler-bar top-bar"></span>
                            <span className="navbar-toggler-bar middle-bar"></span>
                            <span className="navbar-toggler-bar bottom-bar"></span>
                        </button>
                    </div>
                    <Collapse
                        className="justify-content-end"
                        isOpen={collapseOpen}
                        navbar>
                        <Nav navbar>
                            <NavItem style={{ marginRight: '20px' }}>
                                <NavLink

                                    to="/topics/questions"
                                    tag={Link}
                                    onClick={() => {
                                        setCollapseOpen(false)

                                    }}
                                >
                                    <i className="fas fa-question fa-2x" style={{ margin: '5px' }}></i>
                                    <p>Questions</p>
                                </NavLink>
                            </NavItem>
                            <NavItem style={{ marginRight: '20px' }}>
                                <NavLink
                                    to="/topics/suggestions"
                                    tag={Link}
                                    onClick={() => {
                                        setCollapseOpen(false)

                                    }}
                                >
                                    <i className="fas fa-lightbulb fa-2x" style={{ margin: '5px' }}></i>
                                    <p>Suggestions</p>
                                </NavLink>
                            </NavItem>
                            <NavItem style={{ marginRight: '20px' }}>
                                <NavLink
                                    to="/amirghedira"
                                    tag={Link}
                                    onClick={() => {
                                        setCollapseOpen(false)

                                    }}

                                >
                                    <i className="fas fa-address-card fa-2x" style={{ margin: '5px' }}></i>
                                    <p>Profile</p>
                                </NavLink>
                            </NavItem>
                            {context.token ?
                                <NavItem>
                                    <Nav
                                        className="nav-pills-info nav-pills-just-icons"
                                        style={{ marginTop: '7px' }}
                                    >
                                        <UncontrolledDropdown nav>
                                            <DropdownToggle
                                                nav

                                            >
                                                <i className="fas fa-bell fa-2x" style={{ size: '20px' }}>
                                                    {!LoadingNotification && context.Notifications.filter(notification => { return notification.read === false }).length > 0 ?
                                                        < Badge style={{ witdh: '20px', height: '20px', borderRadius: '100px', fontSize: '14px' }} color="danger">
                                                            {
                                                                context.Notifications.filter(notification => { return notification.read === false }).length
                                                            }
                                                        </Badge>
                                                        : null}
                                                </i>


                                            </DropdownToggle>
                                            <DropdownMenu right style={{ maxHeight: '250px', overflowY: 'auto', height: 'fit-content', padding: '0', display: !LoadingNotification && context.Notifications.length === 0 ? 'flex' : 'block' }}>
                                                {
                                                    !LoadingNotification ?
                                                        context.Notifications.length > 0 ?
                                                            context.Notifications.slice(0).reverse().map(notification => {
                                                                return (
                                                                    <Link key={notification._id} to={notification.link}
                                                                        style={{ color: 'black' }}
                                                                        onClick={() => {
                                                                            setCollapseOpen(false)

                                                                        }}>
                                                                        <DropdownItem
                                                                            style={{
                                                                                minHeight: '50px',
                                                                                backgroundColor:
                                                                                    !notification.read && !collapseOpen ? '#f2f2f2' : notification.read && !collapseOpen ? 'white' :
                                                                                        !notification.read && collapseOpen ? '#999999' : 'b3b3b3'
                                                                                , margin: '0'
                                                                            }}
                                                                            onClick={() => { context.makeasRead(notification._id) }}>

                                                                            {notification.read ?
                                                                                <p style={{ width: '300px', overflow: 'hidden', whiteSpace: 'pre-wrap' }}>{notification.content}</p>
                                                                                :
                                                                                <strong style={{ maxWidth: '200px' }}> {notification.content}</strong>
                                                                            }
                                                                        </DropdownItem>
                                                                        <hr style={{ margin: '0', backgroundColor: '#cccccc' }} />
                                                                    </Link>
                                                                )
                                                            })


                                                            :
                                                            <DropdownItem style={{ margin: 'auto', backgroundColor: 'white' }}>No notifications available yet..</DropdownItem>
                                                        :
                                                        <CommonLoading />


                                                }
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </Nav>
                                </NavItem>
                                :
                                null
                            }
                            {profileImageComponent}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
            <LoginModal
                id="loginmodal"
                show={showloginmodal}
                handleClose={hideshowHandler}
                connectcheck={loginHandler}
                focusgained={focusgainedHandler}
                error={loginerror}
            />
            <ToastContainer />
        </>
    );
}
export default IndexNavbar;
