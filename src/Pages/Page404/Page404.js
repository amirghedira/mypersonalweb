import React from 'react';
import "./Page404.css";

const Page404 = (props) => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">

                    <h1>{props.statuscode}</h1>
                </div>
                <h2>We are sorry, Page not found!</h2>
                <p>{props.message}</p>
                <a href="/home">Back To Homepage</a>
            </div>
        </div>

    )
}

export default Page404;