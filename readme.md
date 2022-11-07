# Overview 

 I started this web application in order to display my projects and to arrange them, Also am learning React for a bit now and I wanted to develop an entire application with it. So I find it as an opportunity to start this application and improve my skills in React. In addition, this application is all about managing my projects displaying them with a nice layout and allow people to interact with each project and give their opinion not also that, but even ask questions about anything related to development and software engineering. 
 # Features / Technologies 

 This platform is made in a way that provides several features including its protection.
In fact a ban system has been added in order to ban users who spam comment sections or questions/suggestions sections..
After being banned, the user can see all the project as all users but he will not have access to comment on any project or even to post a topic.
In addition, the platform can detect your IP address and ban it if you didn't respect the rules.
Also, the integration of socket, make the user experience better, in fact it allows an instant change whenever a project is updated or posted, also in suggestions/questions sections, the interface will be updated automatically whenever a topic or a reply has been posted. Also for banned users once it's banned, he will be prevented from posting instantly.
Without forgetting libraries I used which improved the responsiveness of this front end and made it more interactive. 
# Platform & Libraries 
 Based on react , I used multiple packages from npm which was very helpful. These are dependencies I have used : 
``` json
{
        "@material-ui/core": "^4.9.7",
        "axios": "^0.19.2",
        "moment-timezone": "^0.5.28",
        "react": "16.8.6",
        "react-autosize-textarea": "^7.0.0",
        "react-dom": "16.8.6",
        "react-image-lightbox": "^5.1.1",
        "react-loadingg": "^1.7.2",
        "react-moment": "^0.9.7",
        "react-router": "5.0.1",
        "react-router-dom": "5.0.1",
        "react-scripts": "3.0.1",
        "react-syntax-highlighter": "^12.2.1",
        "react-toastify": "^5.5.0",
        "reactstrap": "8.0.1",
        "socket.io": "^2.3.0"

}
```

## React-Moment:
Link: [https://www.npmjs.com/package/react-moment](https://www.npmjs.com/package/react-moment)
Actually, this library is responsible to format date in any way you like, for example, you can choose "from now" option to make the date relative to now date (1 minute ago, one hour ago, etc...)

## material-ui/core:
Link: [https://material-ui.com/](https://material-ui.com/)
This huge an awesome library provide amazing pre-built components which are sweetly styled and responsive check out this library if you wanna make your web app looks amazing.
In fact, I used this library to display a progress bar whenever an HTTP request is sent
.
## react-autosize-textarea:
Link: [https://www.npmjs.com/package/react-autosize-textarea](https://www.npmjs.com/package/react-autosize-textarea)
This is a pre-built components for react which is a responsive textarea, in fact, it resizes depends on your inputs.

## react-syntax-highlighter:
Link: [https://www.npmjs.com/package/react-syntax-highlighter](https://www.npmjs.com/package/react-syntax-highlighter)

This component is responsible to display code with a good format in a div block, I will upload images in photos section about this.

## react-image-lightbox:
Link: [https://www.npmjs.com/package/react-image-lightbox](https://www.npmjs.com/package/react-image-lightbox)
This component is responsible for displaying images in a modal with a cool design (like Facebook images displayer but without comments)

## React-loadingg:
Link: [https://www.npmjs.com/package/react-loadingg](https://www.npmjs.com/package/react-loadingg)
This component, as the names mentioned, contains a variety of 
loading styles you can check the demo here:[http://139.196.82.33](http://139.196.82.33):8080/iframe.html?id=demo--demo

## react-toastify:
Link: [https://www.npmjs.com/package/react-toastify](https://www.npmjs.com/package/react-toastify)
This component makes notifications easy to display and quite stylish, I will upload some photos of some notifications I have here.

## reactstrap: 
Link: [https://www.npmjs.com/package/reactstrap](https://www.npmjs.com/package/reactstrap)
As material UI provides cool pre-built components , Reactstrap makes the same thing and personally I choosed to built the entire front end with it , its easy to learn and easy to use 
check the docs for more information about what reactstrap provides
docs: [https://reactstrap.github.io/](https://reactstrap.github.io/)

## react-router , react-router-dom:
Link: [https://www.npmjs.com/package/react-router-dom](https://www.npmjs.com/package/react-router-dom)
Basically, this library provides the utility to make multiple pages in your application using routing 

## Axios: 
Link: [https://www.npmjs.com/package/axios](https://www.npmjs.com/package/axios)
This library is an alternative to fetch in javascript, it's easier to manipulate and easy to learn, and to use. Actually, the most liked feature that provides It, is the ability to make a base URL to HTTP requests, without repeating it each HTTP request.

## socket.io:
Link: [https://www.npmjs.com/package/socket.io](https://www.npmjs.com/package/socket.io)
Socket is known to be a front and a back end service, i will talk more about the service side of socketio in the backend project,
this library you can use it to emit any changes to the users which are connected to the page (to the socket) this makes the user interface more reactive and more interactive with changes without even loading the page. 

# What I learned ?
 At the beginning I learned react with class components approach, I used to manage state in a class-based component.
In this project, I decided to use react hooks and functional-based components since its the new way for development in reactjs, and I find them quite interesting and fun to use them.
In addition, reactstrap, which I learned more things about responsiveness thanks to rows and cols system of reactstrap.
Second, managing state, actually I have used the contextAPI of react which is built into it, I have isolated all the state related to projects and profile informations into a global state with I provide it to other components, not only state even handlers which handle projects and profile and logging in actions.
The contextAPI allow managing state and reading it easier and more convinient.
Also i learned to implement routing and provide a multiple page web application thanks to react-dom router 
Last but not least, socketio (client site) I learned how to emit the events and get the event and unregister them when needed.
Finally, and the most thing which i find it interesting, is the service workers, they are so useful to build a progressive web apps and more other things, I applied service workers to trigger notifications which pop up in the operating system (phone or PC)