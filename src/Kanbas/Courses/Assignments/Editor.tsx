export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of the assignment. Deploy it on netlify
          this assignment will give handson with basic html code.
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-AssignmentGroup">Assignment Group</label>
            </td>
            <td>
            <select id="wd-AssignmentGroup">
            <option value="PROJECTS">Projects</option>
            <option selected value="ASSIGNMENTS">
                Assignments</option>
            </select>
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as:</label>
            </td>
            <td>
            <select id="wd-display-grade-as">
            <option value="POINTS">Points</option>
            <option selected value="PERCENTAGE">
                Percentage</option>
            </select>
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type:</label>
            </td>
            <td>
            <select id="wd-submission-type">
            <option selected value="ONLINE">Online</option>
            <option value="PRESENTATION">
                Presentation</option>
            </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
                <label htmlFor="wd-OnlineOptions">Online Entry Options:</label><br />
                <input type="checkbox" id="wd-textentry" name="textentry" value="textentry" />
                <label htmlFor="wd-textentry">Text Entry</label><br />
                <input type="checkbox" id="wd-website-url" name="website-url" value="website-url" />
                <label htmlFor="wd-website-url">Website URL</label><br />
                <input type="checkbox" id="wd-media-recordings" name="media-recordings" value="wd-media-recordings" />
                <label htmlFor="wd-media-recordings">Media Recordings</label><br />
                <input type="checkbox" id="wd-student-annotation" name="student-annotation" value="student-annotation" />
                <label htmlFor="wd-student-annotation">Student Annotation</label><br />
                <input type="checkbox" id="wd-file-upload" name="file-upload" value="file-upload" />
                <label htmlFor="wd-file-upload">File Uploads</label><br />
            </td>
        </tr>
        <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-assign-to">Assign:</label>
                        </td>
                        <td>
                            <label htmlFor="wd-assign-to">Assign to</label>
                            <br/>
                            <input id="wd-assign-to" defaultValue="Everyone" /><br /><br />
                            <label htmlFor="wd-due-date">Due</label>
                            <br/>
                            <input type="date" id="wd-due-date" defaultValue="2024-05-13" /><br /><br />
                            <label htmlFor="wd-available-from">Available from</label>
                            <br/>
                            <input type="date" id="wd-available-from" defaultValue="2024-05-06" /> <label htmlFor="wd-available-until">until</label> <input type="date" id="wd-available-until" defaultValue="2024-05-20" /><br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} align="right">
                            <button>Cancel</button>
                            <button>Save</button>
                        </td>
                    </tr>
        </table>
      </div>
  );}
  