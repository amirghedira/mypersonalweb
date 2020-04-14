import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import ProjectDetails from "./Pages/ProjectDetails/ProjectDetails"
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AccountSettings from "./Pages/AccountSettings/AccountSettings"
import IndexHeader from './components/Headers/IndexHeader'
import GlobalContext from './components/context/GlobalContext';
import axios from './utils/axios'
import DarkFooter from './components/Footers/DarkFooter'
import Page404 from './Pages/Page404/Page404'
import IndexNavbar from "components/IndexNavbar/IndexNavbar";
import Aboutus from "Pages/Aboutus/Aboutus";
import Topicpage from './Pages/Topicpage/Topicpage'
import Addtopic from "Pages/Addtopic/Addtopic";
import TopicsPage from "./Pages/TopicsPage/TopicsPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {


    const [token, Settoken] = React.useState(localStorage.getItem('token'));
    const [projects, setProjects] = React.useState(null);
    const [UserProfile, SetUserProfile] = React.useState(null);
    const [PageError, SetPageError] = React.useState({ state: false, statuscode: null, message: null });
    const [memberInfo, setMemberInfo] = React.useState(null)
    const [BannedUsers, SetBannedUsers] = React.useState(null)
    // const [loadingPage,SetLoadingPage]= React.useState(false)
    const [goload, setgoload] = React.useState(false)



    React.useEffect(() => {
        axios.get('/banned')
            .then(result => {
                SetBannedUsers(result.data.banned)
            })
            .catch(err => {
                console.log(err)
                ErrorAccureHandler(err.response.status, err.response.message)
            })
        fetch("https://api.ipgeolocation.io/getip")
            .then(response => {
                return response.json();
            })
            .then(res => {
                setMemberInfo({ ip: res.ip })
            })
            .catch(err => {
                console.log(err);
                ErrorAccureHandler(err.response.status, err.response.message)
            })
        axios.get('/project')
            .then(result => {
                setProjects(result.data.result)
            })
            .catch(err => {
                ErrorAccureHandler(err.response.status, err.response.message)
            })
        axios.get('/user')
            .then(result => {
                SetUserProfile(result.data)
            })
            .catch(err => {
                ErrorAccureHandler(err.response.status, err.response.message)
            })
    }, [])

    const loginHandler = (token) => {

        localStorage.setItem('token', token)
        Settoken(token);
    }

    const disconnectHandler = () => {

        localStorage.clear()
        Settoken(null);

    }

    const deleteprojectHandler = (id) => {
        const project = projects.find(project => {
            return project._id === id
        })
        const headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.patch('/project/deleteproject/' + id, { files: project.imagesurl }, { headers: headers })
            .then(res => {
                const newProjects = projects;
                newProjects.splice(projects.findIndex(project => {
                    return project._id === id
                }), 1);
                setProjects([...newProjects])

            })
            .catch(err => {
                ErrorAccureHandler(err.response.status, err.response.message)
            })
    }
    const addProjectHandler = (inputs) => {
        const headers = {
            'Authorization': 'Bearer ' + token
        }


        const fd = new FormData();
        if (inputs.projectimages)
            for (const key of Object.keys(inputs.projectimages)) {
                fd.append('projectimages', inputs.projectimages[key])
            }

        fd.append('name', inputs.name);
        fd.append('started', inputs.started);
        fd.append('technologie', inputs.technologie);
        fd.append('summary', inputs.summary);
        fd.append('whatlearned', inputs.whatlearned);
        fd.append('overview', inputs.overview);
        fd.append('status', inputs.status);
        fd.append('platform', inputs.platform);
        fd.append('features', inputs.features);
        fd.append('github', inputs.github);
        fd.append('filelink', inputs.filelink);

        axios.post('/project', fd, { headers: headers })
            .then(result => {
                let newProject = {
                    _id: result.data._id,
                    name: inputs.name,
                    date: result.data.date,
                    summary: inputs.summary,
                    overview: inputs.overview,
                    whatlearned: inputs.whatlearned,
                    technologie: inputs.technologie,
                    commentsCount: 0,
                    gitViewers: 0,
                    downloadcount: 0,
                    status: inputs.status,
                    platform: inputs.platform,
                    features: inputs.features,
                    github: inputs.github,
                    Comments: [],
                    imagesurl: result.data.imagesurl

                }
                setProjects([
                    ...projects,
                    newProject
                ])

            })
            .catch(err => {
                ErrorAccureHandler(err.response.status, err.response.message)
            })


    }
    const addprojectImageHandler = (projectid, image) => {

        const headers = {
            'Authorization': 'Bearer ' + token
        }

        const fd = new FormData();
        fd.append('projectimage', image)
        axios.patch('/project/addprojectimage/' + projectid, fd, { headers: headers })
            .then(result => {
                const index = projects.findIndex(project => { return project._id === projectid })
                UpdateProjects(index, {
                    ...projects[index],
                    imagesurl: [...projects[index].imagesurl, result.data.imageurl]
                })
            })
            .catch(err => {
                console.log(err)
                ErrorAccureHandler(err.response.status, err.response.message)
            })

    }
    const deleteProjectImageHandler = (projectid, image) => {
        const headers = {
            'Authorization': 'Bearer ' + token
        }
        console.log(projectid)

        const index = projects.findIndex(project => { return project._id === projectid })
        const imageindex = projects[index].imagesurl.findIndex(projectimage => { return projectimage === image });
        const newimages = projects[index].imagesurl;
        newimages.splice(imageindex, 1);
        axios.patch('/project/deleteprojectimage/' + projectid, { imagetodelete: image, newimages: newimages }, { headers: headers })
            .then(result => {
                UpdateProjects(index, {
                    ...projects[index],
                    imagesurl: newimages
                })
            })
            .catch(err => {
                console.log(err)
                ErrorAccureHandler(err.response.status, err.response.message)
            })

    }
    const deleteCommentHandler = (projectid, commentid) => {

        const index = projects.findIndex((project) => { return project._id === projectid })
        const commentIndex = projects[index].Comments.findIndex(comment => { return comment._id === commentid })
        let newComments = projects[index].Comments
        newComments.splice(commentIndex, 1)
        const headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.patch('/project/deletecomment/' + projectid, { Comments: newComments, commentsCount: newComments.length }, { headers: headers })
            .then(() => {
                const newProject = {
                    ...projects[index],
                    Comments: newComments,
                    commentsCount: newComments.length
                }
                UpdateProjects(index, newProject)

            })
            .catch(err => {
                ErrorAccureHandler(err.response.status, err.response.message);
            })
    }
    const postCommentHandler = (projectId, obj) => {

        const index = projects.findIndex(project => { return project._id === projectId })

        const NewComment = { ip: obj.ip, content: obj.content, autor: obj.autor }
        axios.post('/project/postcomments/' + projects[index]._id, { comment: NewComment, commentsCount: projects[index].commentsCount + 1 })
            .then(result => {
                UpdateProjects(index,
                    {
                        ...projects[index],
                        Comments: [...projects[index].Comments, { ...NewComment, _id: result.data._id, date: result.data.date }],
                        commentsCount: projects[index].commentsCount + 1
                    }

                )
            })
            .catch(err => {
                ErrorAccureHandler(err.response.status, err.response.message);
            })
    }
    const UpdateDownloadCount = (projectid) => {
        const index = projects.findIndex((project) => { return project._id === projectid })
        axios.patch('/project/updatedownloads/' + projectid, { downloadcount: projects[index].downloadcount + 1 })
            .then(result => {
                const newProject =
                {
                    ...projects[index],
                    downloadcount: projects[index].downloadcount + 1

                }
                UpdateProjects(index, newProject)
            })
            .catch(err => { ErrorAccureHandler(err.response.status, err.response.message) })
    }
    const UpdateGitViewer = (projectid) => {
        const index = projects.findIndex((project) => { return project._id === projectid })
        axios.patch('/project/updategitviewers/' + projectid, { gitviewers: projects[index].gitViewers + 1 })
            .then(result => {
                const newProject = {
                    ...projects[index],
                    gitViewers: projects[index].gitViewers + 1
                }
                UpdateProjects(index, newProject)
            })
            .catch(err => { ErrorAccureHandler(err.response.status, err.response.message) })

    }
    const UpdateProfile = (newprofile) => {
        SetUserProfile(newprofile)
    }

    const unBanMemberHandler = (id) => {
        axios.delete(`/banned/${id}`)
            .then(result => {
                const index = BannedUsers.findIndex(banneduser => { return banneduser._id === id })
                let newBannedUsers = BannedUsers;
                newBannedUsers.splice(index, 1);
                SetBannedUsers(newBannedUsers);
                setgoload(!goload)
                toast.success('User is successfully unbanned!', { position: toast.POSITION.BOTTOM_RIGHT })
            })
            .catch(err => {
                ErrorAccureHandler(err.response.status, err.response.message)
            })
    }

    const BanMemberHandler = (member) => {

        let ips = BannedUsers.map(banneduser => { return banneduser.ip })
        if (ips.includes(member.ip)) {
            toast.error('User already banned!', { position: toast.POSITION.BOTTOM_RIGHT })
        }
        else {
            axios.post('/banned', member)
                .then(result => {
                    SetBannedUsers([...BannedUsers, {
                        ...member,
                        date: result.data.date,
                        _id: result.data._id
                    }])
                    toast.success('User is successfully banned.', { position: toast.POSITION.BOTTOM_RIGHT })

                })
                .catch(err => {
                    ErrorAccureHandler(err.response.status, err.response.message)
                })
        }
    }

    const getBanStatusHandler = () => {
        if (BannedUsers && memberInfo) {
            const ips = BannedUsers.map(banneduser => banneduser.ip)
            return ips.includes(memberInfo.ip)
        }
        return false;
    }

    const ErrorAccureHandler = (statuscode, message) => {
        SetPageError({
            state: true,
            statuscode: statuscode,
            message: message
        })
    }

    const UpdateProjects = (index, newProject) => {

        let NewProjects = projects
        NewProjects[index] = newProject
        setProjects(NewProjects)
        setgoload(!goload)

    }
    if (PageError.state)
        return (
            <Page404 statuscode={PageError.statuscode} message={PageError.message} />
        )
    return (
        <GlobalContext.Provider value={
            {
                UserProfile: UserProfile,
                memberInfo: memberInfo,
                UpdateProfile: UpdateProfile,
                token: token,
                loginHandler: loginHandler,
                disconnectHandler: disconnectHandler,
                projects: projects,
                addProjectHandler: addProjectHandler,
                deleteprojectHandler: deleteprojectHandler,
                addprojectImage: addprojectImageHandler,
                deleteProjectImage: deleteProjectImageHandler,
                UpdateProjects: UpdateProjects,
                UpdateGitViewer: UpdateGitViewer,
                postComment: postCommentHandler,
                deleteCommentHandler: deleteCommentHandler,
                UpdateDownloadCount: UpdateDownloadCount,
                BannedUsers: BannedUsers,
                banMember: BanMemberHandler,
                unbanMember: unBanMemberHandler,
                getBanStatus: getBanStatusHandler,
                ErrorAccureHandler: ErrorAccureHandler

            }
        }>

            <BrowserRouter>
                <ToastContainer />
                <IndexHeader />
                <IndexNavbar />

                <Switch>
                    <Switch>
                        <Route path="/home" render={() => <MainPage />} />

                        <Route
                            path="/amirghedira"
                            render={(props) => <ProfilePage
                                {...props} />}
                        />
                        <Route
                            path="/details/:id"
                            render={props => <ProjectDetails
                                {...props} />}

                        />
                        <Route
                            path="/settings"
                            render={props => <AccountSettings
                                {...props}
                            />}
                        />
                        <Route
                            path="/aboutus"
                            render={props => <Aboutus {...props} />}
                        />

                        <Route
                            path="/topics/:type"
                            render={props => <TopicsPage {...props} />}
                        />
                        <Route
                            path="/questions/:id"
                            render={props => <Topicpage {...props} />}
                        />
                        <Route
                            path="/suggestions/:id"
                            render={props => <Topicpage {...props} />}
                        />
                        <Route
                            path="/add-topic/:type"
                            render={props => <Addtopic {...props} />}
                        />

                        <Redirect to="/home" />
                        <Redirect from="/" to="/home" />
                    </Switch>
                </Switch>
                <DarkFooter />
            </BrowserRouter >

        </GlobalContext.Provider>

    )


}

export default App;