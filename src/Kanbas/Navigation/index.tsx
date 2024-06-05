import { Link } from "react-router-dom";
import "./index.css";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import React, { useState } from 'react';

export default function KanbasNavigation() {
  const [activeLink, setActiveLink] = useState<string>('/Kanbas/Dashboard');

    const handleLinkClick = (path: string) => {
        setActiveLink(path);
    };

    const getLinkClass = (path: string) => {
        return `list-group-item text-center border-0 ${path === activeLink ? 'bg-white text-danger' : 'bg-black text-white'}`;
    };

  return (
      <div id="wd-kanbas-navigation" className="list-group rounded-0" style={{ width: "110px" }}>
          <a id="wd-neu-link" target="_blank" href="https://www.northeastern.edu/" 
                className="list-group-item bg-black border-0"><img src="/images/NEU.png" width="75px" /><br/>
          </a>
          <a id="wd-account-link" href="#/Kanbas/Account" className={getLinkClass('/Kanbas/Account')}
                onClick={() => handleLinkClick('/Kanbas/Account')}><FaRegCircleUser className="fs-1 text-white" /><br />
                Account </a>
          <a id="wd-dashboard-link" href="#/Kanbas/Dashboard" className={getLinkClass('/Kanbas/Dashboard')}
                onClick={() => handleLinkClick('/Kanbas/Dashboard')}><AiOutlineDashboard className="fs-1 text-danger" /><br />
                  Dashboard </a>
          <a id="wd-course-link" href="#/Kanbas/Courses" className={getLinkClass('/Kanbas/Courses')}
                onClick={() => handleLinkClick('/Kanbas/Courses')}><LiaBookSolid className="fs-1 text-danger" /><br />
                  Courses </a>
          <a id="wd-calendar-link" href="#/Kanbas/Calendar" className={getLinkClass('/Kanbas/Calendar')}
                onClick={() => handleLinkClick('/Kanbas/Calendar')}><IoCalendarOutline className="fs-1 text-danger"/><br />
                  Calendar</a>
          <a id="wd-inbox-link" href="#/Kanbas/Inbox" className={getLinkClass('/Kanbas/Inbox')}
                onClick={() => handleLinkClick('/Kanbas/Inbox')}><FaInbox className="fs-1 text-danger"/><br />
                  Inbox</a>
          <a id = "wd-labs-link" href="#/Kanbas/Labs" className={getLinkClass('/Kanbas/Labs')}
                onClick={() => handleLinkClick('/Kanbas/Labs')}><MdOutlineSettings className="fs-1 text-danger"/><br />
                  Labs</a>
      </div>
  );
}