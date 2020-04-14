import React from 'react'
import classes from './Aboutus.module.css'
import { Row, Container, Col } from 'reactstrap'


const Aboutus = () => {

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.title = 'About us'
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("index-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, [])

    return (

        <Container className="main" style={{ marginTop: '40px', marginBottom: '40px', boxShadow: '0px 5px 25px 0px rgba(0, 0, 0, 0.2)' }}>
            <Row style={{ display: 'flex' }}>
                <Col xs='4' style={{ marginTop: '300px' }}>
                    <hr />
                </Col>
                <Col xs='4' style={{ display: 'flex', marginTop: '100px' }}>
                    <img alt='...' src={require('../../../src/assets/img/logo.png')} style={{ margin: 'auto' }} />
                </Col>
                <Col xs='4' style={{ marginTop: '300px' }}>
                    <hr />
                </Col>
            </Row>
            <Row className="section" >
                <Col xs="10">
                    <div>
                        <div id="introduction" style={{ paddingTop: '50px' }}>
                            <h2 className={classes.title}>Introduction</h2>
                            <p className={classes.paragraphe}>
                                sdsdsodiq sdisqdopsqidsqidqsd qssdsqdsqsqdopsqidsqi dqs dsqss dsqd sqsqidq ssqsdsd dsds
                                dqsdqsds qdqs dqs dqsd qsdqsdqsdqsdss ssssdd ddddddfdfsqqsqfdfds dsd
                                qsdqsdqsdqsdq sdsqssdqdq sddsdsds dsdsdsdcxcx
                                sdsdsodiqs disqdop sqidsq idqsdsq ssdsqdsqsqdopsq idsqidqsdsq ssdsqdsq sqidqssqsdsd dsds
                                dqsdqs dsqd qs dqsdqsdq  sdqsdqsd qsdssssss ddddddddfd sqqsqfdfdsdsd
                                qsdqs dqsd qsdqs dsqssdq dqsddsdsdsdsdsdsdcxcx
                                sdsdsodiqsdisqdopsqidsqidqsd sqs sdsqds qsqdopsqid sqidq sdsq ssdsqdsq sqidqssqsdsd dsds
                                dqsdqsds qdqsd qsdqsdqs dqsdqs dqsdssssssddddddddfdfsqqsqfdfdsdsd
                                qsdqs dqsd qsdqs dsqss dqdqsddsdsdsds dsdsdcxcx
                                sdsdsodiqsdisq dopsqids qidqsdsqss dsqdsqs   qdops qidsqi dqsds qssdsqdsqs qidqssq sdsd ds ds
                                dqsdq sds qdqsdq sdqsd qsdqsdqs dqsdss ssssddd dddddfd fsqq sqf dfdsdsd
                                qsdqsd qsdq sdqsdsqss dqdqsd dsdsds dsdsdsdcxcx
                                sdsdsodiq sdisqdo psqidsqidqsd sqssdsqdsqsqd opsqidsqid qsdsqssdsq sqsq idqssq sdsd dsds
                                dqsdq sds qdqsd qsd qsdqsdqsd qsdqsds sssssdd  d dddddfd fsq qsqfdf dsdsd
                                qsd qsd qsdq sdqsd sqssd qdqsddsds dsdsd sdsdcxcx
                                 </p>
                        </div>
                        <div id="rules" style={{ paddingTop: '50px' }} >
                            <h2 className={classes.title}>Rules</h2>
                            <p className={classes.paragraphe} >
                                sdsdsodiq sdisqdopsqidsqidqsd qssdsqdsqsqdopsqidsqi dqs dsqss dsqd sqsqidq ssqsdsd dsds
                                dqsdqsds qdqs dqs dqsd qsdqsdqsdqsdss ssssdd ddddddfdfsqqsqfdfds dsd
                                qsdqsdqsdqsdq sdsqssdqdq sddsdsds dsdsdsdcxcx
                                sdsdsodiqs disqdop sqidsq idqsdsq ssdsqdsqsqdopsq idsqidqsdsq ssdsqdsq sqidqssqsdsd dsds
                                dqsdqs dsqd qs dqsdqsdq  sdqsdqsd qsdssssss ddddddddfd sqqsqfdfdsdsd
                                qsdqs dqsd qsdqs dsqssdq dqsddsdsdsdsdsdsdcxcx
                                sdsdsodiqsdisqdopsqidsqidqsd sqs sdsqds qsqdopsqid sqidq sdsq ssdsqdsq sqidqssqsdsd dsds
                                dqsdqsds qdqsd qsdqsdqs dqsdqs dqsdssssssddddddddfdfsqqsqfdfdsdsd
                                qsdqs dqsd qsdqs dsqss dqdqsddsdsdsds dsdsdcxcx
                                sdsdsodiqsdisq dopsqids qidqsdsqss dsqdsqs   qdops qidsqi dqsds qssdsqdsqs qidqssq sdsd ds ds
                                dqsdq sds qdqsdq sdqsd qsdqsdqs dqsdss ssssddd dddddfd fsqq sqf dfdsdsd
                                qsdqsd qsdq sdqsdsqss dqdqsd dsdsds dsdsdsdcxcx
                                sdsdsodiq sdisqdo psqidsqidqsd sqssdsqdsqsqd opsqidsqid qsdsqssdsq sqsq idqssq sdsd dsds
                                dqsdq sds qdqsd qsd qsdqsdqsd qsdqsds sssssdd  d dddddfd fsq qsqfdf dsdsd
                                qsd qsd qsdq sdqsd sqssd qdqsddsds dsdsd sdsdcxcx
                                 </p>
                        </div>
                        <div id="goal" style={{ paddingTop: '50px' }}>
                            <h2 className={classes.title}>Goal</h2>
                            <p className={classes.paragraphe} >
                                sdsdsodiq sdisqdopsqidsqidqsd qssdsqdsqsqdopsqidsqi dqs dsqss dsqd sqsqidq ssqsdsd dsds
                                dqsdqsds qdqs dqs dqsd qsdqsdqsdqsdss ssssdd ddddddfdfsqqsqfdfds dsd
                                qsdqsdqsdqsdq sdsqssdqdq sddsdsds dsdsdsdcxcx
                                sdsdsodiqs disqdop sqidsq idqsdsq ssdsqdsqsqdopsq idsqidqsdsq ssdsqdsq sqidqssqsdsd dsds
                                dqsdqs dsqd qs dqsdqsdq  sdqsdqsd qsdssssss ddddddddfd sqqsqfdfdsdsd
                                qsdqs dqsd qsdqs dsqssdq dqsddsdsdsdsdsdsdcxcx
                                sdsdsodiqsdisqdopsqidsqidqsd sqs sdsqds qsqdopsqid sqidq sdsq ssdsqdsq sqidqssqsdsd dsds
                                dqsdqsds qdqsd qsdqsdqs dqsdqs dqsdssssssddddddddfdfsqqsqfdfdsdsd
                                qsdqs dqsd qsdqs dsqss dqdqsddsdsdsds dsdsdcxcx
                                sdsdsodiqsdisq dopsqids qidqsdsqss dsqdsqs   qdops qidsqi dqsds qssdsqdsqs qidqssq sdsd ds ds
                                dqsdq sds qdqsdq sdqsd qsdqsdqs dqsdss ssssddd dddddfd fsqq sqf dfdsdsd
                                qsdqsd qsdq sdqsdsqss dqdqsd dsdsds dsdsdsdcxcx
                                sdsdsodiq sdisqdo psqidsqidqsd sqssdsqdsqsqd opsqidsqid qsdsqssdsq sqsq idqssq sdsd dsds
                                dqsdq sds qdqsd qsd qsdqsdqsd qsdqsds sssssdd  d dddddfd fsq qsqfdf dsdsd
                                qsd qsd qsdq sdqsd sqssd qdqsddsds dsdsd sdsdcxcx
                                 </p>
                        </div>
                        <div style={{ paddingTop: '50px', whiteSpace: 'pre-wrap' }}>
                            <h2 id="interest" className={classes.title}>Interest</h2>
                            <p className={classes.paragraphe} >

                            </p>
                        </div>

                    </div>
                </Col>
                <Col className={classes.sidebarNavigation}>
                    <ul>
                        <li className={classes.itemList}>
                            <a className={classes.itemtext} href="#introduction"><strong>Introduction</strong></a>
                        </li>
                        <li className={classes.itemList}>
                            <a className={classes.itemtext} href="#rules"><strong>Rules</strong></a>
                        </li>
                        <li className={classes.itemList}>
                            <a className={classes.itemtext} href="#goal"><strong>Goal</strong></a>
                        </li>
                        <li className={classes.itemList}>
                            <a className={classes.itemtext} href="#interest"><strong>Interest</strong></a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>

    )
}

export default Aboutus;