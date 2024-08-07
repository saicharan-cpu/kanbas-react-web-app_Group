import React from "react";
import { useSelector } from "react-redux";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoIosNotifications } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { MdViewStream } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoMdAnalytics } from "react-icons/io";

export default function CourseStatus() {
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const userRole = currentUser?.role;

  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      {userRole === 'FACULTY' && (
        <>
          <div className="d-flex">
            <div className="w-50 pe-1">
              <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
                <MdDoNotDisturbAlt className="me-2 fs-5" />
                Unpublish
              </button>
            </div>
            <div className="w-50">
              <button className="btn btn-lg btn-success w-100">
                <FaCheckCircle className="me-2 fs-5" />
                Publish
              </button>
            </div>
          </div>
          <br />
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <BiImport className="me-2 fs-5" />
            Import Existing Content
          </button>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <LiaFileImportSolid className="me-2 fs-5" />
            Import from Commons
          </button>
        </>
      )}
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoIosNotifications className="me-2 fs-5" />
        View Course Notifications
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoMdHome className="me-2 fs-5" />
        Choose Home Page
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <MdViewStream className="me-2 fs-5" />
        View Course Stream
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <TfiAnnouncement className="me-2 fs-5" />
        New Announcement
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoMdAnalytics className="me-2 fs-5" />
        View Analytics
      </button>
    </div>
  );
}
