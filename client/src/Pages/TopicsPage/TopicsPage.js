import React from 'react';
import classes from './TopicsPage.module.css';
import Topicitem from '../../components/Topicitem/Topicitem'
import { Container, Row, Col, Button, PaginationLink, PaginationItem, Pagination, Nav, NavItem, NavLink } from 'reactstrap'
import GlobalContext from 'context/GlobalContext';
import axios from '../../utils/axios'
import { Link } from 'react-router-dom'
import Loading from '../LoadingPage/LoadingPage'
import Banned from '../../components/Banned/Banned'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TopicPage = (props) => {

    const context = React.useContext(GlobalContext)
    const [isLoading, SetisLoading] = React.useState(true)
    const [currentPage, setcurrentPage] = React.useState(1);
    const [currentPosts, SetcurrentPosts] = React.useState(null)
    const [Topics, setTopics] = React.useState(null)
    const [postsPerPage] = React.useState(10);
    const Type = props.match.params.type;
    const indexofLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexofLastPost - postsPerPage;
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

    React.useEffect(() => {

        if (Type === 'suggestions'
            || Type === 'questions') {
            axios.get(`/topic/${Type}`)
                .then(result => {
                    SetcurrentPosts(result.data.result.slice(indexofFirstPost, indexofLastPost))
                    setTopics(result.data.result)
                    if (context.memberInfo)
                        SetisLoading(false)

                })
                .catch(err => {
                    SetisLoading(false)
                    context.ErrorAccureHandler('404', err);
                })

        }
        else
            context.ErrorAccureHandler(404, '');

    }, [context, Type, props.match.params.type, indexofFirstPost, indexofLastPost])

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.title = Type;
        document.documentElement.classList.remove("nav-open");

        return function cleanup() {
            document.body.classList.remove("index-page");
            document.body.classList.remove("sidebar-collapse");

        };
    }, [Type])

    React.useEffect(() => {

        return () => {
            if (context.socket)
                context.socket.off('sendtopics')
        }
    }, [context.socket])
    React.useEffect(() => {
        if (context.socket && Topics) {
            context.socket.off('sendtopics')
            context.socket.on('sendtopics', (topics) => {
                setTopics(topics)
                SetcurrentPosts(topics.slice(indexofFirstPost, indexofLastPost))

            })
        }
    }, [context.socket, indexofFirstPost, indexofLastPost, Topics])


    const headers = {
        'Authorization': 'Bearer ' + context.token
    }

    const editTopicStateHandler = (topicId, topicstate) => {
        axios.patch(`/topic/topicstate/${topicId}`, { state: topicstate }, { headers: headers })
            .then(result => {
                let newTopics = Topics;
                const topicIndex = Topics.findIndex(topic => { return topic._id === topicId });
                newTopics[topicIndex] = {
                    ...newTopics[topicIndex],
                    state: topicstate
                }
                if (topicstate)
                    toast.success('Topic openned.', { position: toast.POSITION.BOTTOM_RIGHT })
                else
                    toast.success('Topic closed.', { position: toast.POSITION.BOTTOM_RIGHT })
                context.socket.emit('sendtopics', newTopics)
                setTopics(newTopics)
                SetcurrentPosts(newTopics.slice(indexofFirstPost, indexofLastPost))
            })
            .catch(err => {
                context.ErrorAccureHandler();
            })



    }
    const getBanStatus = () => {
        if (context.BannedUsers && context.memberInfo) {
            const ips = context.BannedUsers.map(banneduser => banneduser.ip)
            return ips.includes(context.memberInfo.ip)
        }
        return false;
    }
    const pinUnpinTopicHandler = (topicId, topicpinstate) => {
        axios.patch(`/topic/topicpin/${topicId}`, { state: topicpinstate }, { headers: headers })
            .then(result => {
                let newTopics = Topics;
                const topicIndex = Topics.findIndex(topic => { return topic._id === topicId });
                newTopics[topicIndex] = {
                    ...newTopics[topicIndex],
                    pin: topicpinstate
                }
                if (topicpinstate)
                    toast.success('Topic pinned.', { position: toast.POSITION.BOTTOM_RIGHT })
                else
                    toast.success('Topic unpinned.', { position: toast.POSITION.BOTTOM_RIGHT })
                context.socket.emit('sendtopics', newTopics)
                setTopics(newTopics)
                SetcurrentPosts(newTopics.slice(indexofFirstPost, indexofLastPost))

            })
            .catch(err => {
                context.ErrorAccureHandler();
            })


    }

    const deleteTopicHandler = (id) => {
        axios.delete(`topic/${id}`, { headers: headers })
            .then(result => {
                let newTopics = Topics;
                const index = newTopics.findIndex(topic => { return topic._id === id })
                context.deleteTopicNotifications(Topics[index]._id, Type)
                newTopics.splice(index, 1);
                setTopics(newTopics)
                context.socket.emit('sendtopics', newTopics)
                toast.success('Topic deleted.', { position: toast.POSITION.BOTTOM_RIGHT })
                SetcurrentPosts(newTopics.slice(indexofFirstPost, indexofLastPost))

            })
            .catch(err => {
                console.log(err)
                context.ErrorAccureHandler(err.response.status, err.response.statusText);
            })

    }

    const getPageNumber = () => {
        let Pagenumber = [];
        for (let i = 1; i <= Math.ceil(Topics.length / postsPerPage); i++) {
            Pagenumber.push(i)
        }
        return Pagenumber
    }
    if (isLoading)
        return (<Loading minHeight="60vh" />)
    else
        return (
            <div>
                <Row style={{ margin: '0' }}>
                    <Col style={{ padding: '0' }}>
                        <Nav className={classes.Navbar} expand="lg">
                            <NavItem >

                                <NavLink style={{ marginTop: '-6px' }} tag={Link} to='/home'>
                                    <strong style={{ fontSize: width < 455 ? '10px' : null }}> Home </strong>
                                </NavLink>
                            </NavItem>

                            <NavItem >
                                <NavLink style={{ marginTop: '-10px' }} to='/topics/questions' >
                                    <img style={{ height: '36px', width: '36px', marginTop: '-6px' }} alt='...' src={require('../../../src/assets/img/chevron.png')} />
                                    <strong style={{ color: '#2CA8FF', fontSize: width < 455 ? '10px' : null }}> {Type} </strong>
                                </NavLink>

                            </NavItem>
                        </Nav>
                    </Col>
                </Row>

                <Container className={classes.container}>
                    <ToastContainer />

                    <Row className={classes.createTopic}>
                        <Col>
                            <h3 className={classes.sectionTitle}>{Type}</h3>
                        </Col>
                        <Col style={{ justifyContent: 'flex-end', display: 'flex' }}>
                            <Link to={`/add-topic/${Type}`}>
                                <Button color="info" >
                                    <i className="fas fa-comments fa-2x" style={{ marginRight: '10px', fontSize: '16px' }}></i>
                                    Create new Topic

                            </Button>
                            </Link>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {Topics.length > postsPerPage ?
                                <Nav className={classes.PaginationBar} expand="lg">

                                    <Pagination
                                        className="pagination pagination-primary"
                                        listClassName="pagination-primary"
                                    >                                {
                                            getPageNumber().map(number => {
                                                return (
                                                    <PaginationItem key={number} className={currentPage === number ? "active" : ''}>
                                                        <PaginationLink style={{ color: currentPage === number ? 'black' : 'white' }} onClick={() => setcurrentPage(number)}>
                                                            {number}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                )
                                            })
                                        }
                                    </Pagination>
                                </Nav> : null}
                        </Col>
                    </Row>
                    <Row className={classes.sectionList}>
                        {currentPosts.length > 0 ?
                            <Col>
                                {
                                    currentPosts.slice(0).reverse().map(topic => {
                                        if (topic.pin)
                                            return (
                                                <Topicitem
                                                    key={topic._id}
                                                    id={topic._id}
                                                    title={topic.title}
                                                    autor={topic.autor}
                                                    date={topic.date}
                                                    replies={topic.replies.length}
                                                    type={Type}
                                                    token={context.token}
                                                    pinnedstate={topic.pin}
                                                    lockedstate={topic.state}
                                                    closeOpenFunction={() => { editTopicStateHandler(topic._id, !topic.state) }}
                                                    deleteTopicFunction={() => { deleteTopicHandler(topic._id) }}
                                                    pinFunction={() => pinUnpinTopicHandler(topic._id, !topic.pin)}

                                                />

                                            )
                                        else return null
                                    })
                                }
                                {currentPosts.slice(0).reverse().map(topic => {
                                    if (!topic.pin)
                                        return (
                                            <Topicitem
                                                key={topic._id}
                                                id={topic._id}
                                                title={topic.title}
                                                autor={topic.autor === 'admin' ? context.UserProfile.name : topic.autor}
                                                date={topic.date}
                                                replies={topic.replies.length}
                                                type={Type}
                                                token={context.token}
                                                pinnedstate={topic.pinned}
                                                lockedstate={topic.state}
                                                closeOpenFunction={() => { editTopicStateHandler(topic._id, !topic.state) }}
                                                deleteTopicFunction={() => { deleteTopicHandler(topic._id) }}
                                                pinFunction={() => pinUnpinTopicHandler(topic._id, !topic.pinned)}

                                            />
                                        )
                                    else return null
                                })
                                }

                            </Col>
                            :
                            getBanStatus() ?
                                <Banned />
                                :
                                <Col style={{ marginTop: '50px' }}>
                                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                                        <h4 style={{ margin: 'auto' }}> There are no topics in this section yet</h4>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <Link to={`/add-topic/${Type}`} style={{ margin: 'auto' }} >

                                            <Button color="info">
                                                Start the first topic
                                </Button>
                                        </Link>
                                    </div>

                                </Col>

                        }
                    </Row>
                    <Row>
                        <Col>
                            {Topics.length > postsPerPage ?
                                <Nav className={classes.PaginationBar} expand="lg">

                                    <Pagination
                                        className="pagination pagination-primary"
                                        listClassName="pagination-primary"
                                    >                                {
                                            getPageNumber().map(number => {
                                                return (
                                                    <PaginationItem key={number} className={currentPage === number ? "active" : ''}>
                                                        <PaginationLink style={{ color: currentPage === number ? 'black' : 'white' }} onClick={() => setcurrentPage(number)}>
                                                            {number}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                )
                                            })
                                        }
                                    </Pagination>
                                </Nav> : null}
                        </Col>
                    </Row>

                </Container>
            </div>

        )
}

export default TopicPage;