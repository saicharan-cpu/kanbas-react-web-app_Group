import React, { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });

    const [module, setModule] = useState({
        id: "1",
        name: "React Module",
        description: "Learn the basics of React",
        course: "Frontend Development",
    });

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-link"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a><br />
            <a id="wd-retrieve-module" className="btn btn-link"
                href={`${MODULE_API_URL}`}>
                Get Module
            </a>
            <hr />
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-link"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Assignment Title
            </a><br />
            <a id="wd-retrieve-module-name" className="btn btn-link"
                href={`${MODULE_API_URL}/name`}>
                Get Module Name
            </a>
            <hr />
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title" className="btn btn-link"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Assignment Title
            </a>
            <input className="form-control w-75" id="wd-assignment-title"
                value={assignment.title} onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })} />
            <br />
            <a id="wd-update-module-name" className="btn btn-link"
                href={`${MODULE_API_URL}/name/${module.name}`}>
                Update Module Name
            </a>
            <input className="form-control w-75" id="wd-module-name"
                value={module.name} onChange={(e) =>
                    setModule({ ...module, name: e.target.value })} />
            <br />
            <a id="wd-update-module-description" className="btn btn-link"
                href={`${MODULE_API_URL}/description/${module.description}`}>
                Update Module Description
            </a>
            <input className="form-control w-75" id="wd-module-description"
                value={module.description} onChange={(e) =>
                    setModule({ ...module, description: e.target.value })} />
            <br />
            <a id="wd-update-assignment-score" className="btn btn-link"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Assignment Score
            </a>
            <input className="form-control w-75" type="number" id="wd-assignment-score"
                value={assignment.score} onChange={(e) =>
                    setAssignment({ ...assignment, score: Number(e.target.value) })} />
            <br />
            <a id="wd-update-assignment-completed" className="btn btn-link"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                Update Assignment Completed
            </a>
            <input className="form-check-input" type="checkbox" id="wd-assignment-completed"
                checked={assignment.completed} onChange={(e) =>
                    setAssignment({ ...assignment, completed: e.target.checked })} />
            <hr />
        </div>
    );
}
