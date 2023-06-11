import React from "react";
import s from './Home_Page.module.scss';
import {FcAbout} from 'react-icons/fc';
import {NavLink} from "react-router-dom";

const Home_Page = () => {

    return (
        <div className={s.main_page}>
            <div className={s.main_block}>
                <div className={s.main_info}>
                    <div className={s.info_title}>
                        <h3> Osbb-HsH - <br/>Home sweet Home</h3>
                        <p>Is the best way to comfort yourself</p>
                    </div>
                    <div className={s.info_text}>
                        Welcome to our website, where you will find solutions for the automation of your OSBB.
                        We offer modern and intuitive tools that will help you optimize the management
                        of your home or residential complex. Forget about complex processes and
                        invite convenience and efficiency to your OSBB.
                    </div>
                    <div className={s.two_btn}>
                        <div className={s.aboutUs_btn}>
                            <FcAbout size={37} />
                            About Us
                        </div>
                        <NavLink to={'/groups'} className={s.join_btn}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path fill="currentColor"
                                      d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
                            </svg>
                            <span>Join group</span>
                        </NavLink>
                    </div>
                </div>
                <div className={s.main_image}>
                    <img className={s.home_png} src='img/home.png' alt={''}/>
                </div>
                <div className={s.bottom}></div>

            </div>
        </div>
    )
}

export default Home_Page;