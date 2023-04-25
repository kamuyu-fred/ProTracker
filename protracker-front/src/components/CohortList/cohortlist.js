import { useState, useEffect } from "react";
import CohortForm from "../../pages/Cohort";
import "./cohortlist.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
function CohortList() {
  // toggle create cohort form

  const [isCohortFormActive, setCohortFormActive] = useState();

  let handleCohortForm = () => {
    setCohortFormActive(!isCohortFormActive);
  };

  const token = localStorage.getItem("jwt"); //store token in localStorage

  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/cohorts/my_cohorts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCohorts(data);
      });
  }, []);

  let handleCohortId = (value) => {
    console.log(value);
    localStorage.setItem("cohort_id", value);
  };

  let cohortlist = cohorts.map((cohort) => {
    return (
      <div className="cohort-card">
        <h1
          onClick={() => {
            handleCohortId(cohort.id);
          }}
          className="cohort-name"
        >
          <NavLink to="/projectList">{cohort.name}</NavLink>
        </h1>
      </div>
    );
  });

  // custom rendering for creating a new cohort
  const [isCreatingCohort, setCreatingCohort] = useState(false);

  // retrieving all users in the database;

  const [allUsers, setallUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all_users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setallUsers(data);
      });
  }, []);

  let handleAddingMemberToCohort = (id) => {
    console.log(id);
  };

  let allUsersList = allUsers.map((user) => {
    let adminStatus = user.admin ? "Admin" : "Student";
    let avatar_url =
      user.avatar_url === null
        ? "https://i.pinimg.com/736x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
        : user.avatar_url;
    let onlineStatus = user.online_status === "online" ? "green" : "red";
    return (
      <div className="add-cohort-member">
        <div className="c-add-dp">
          <div className="pfp">
            <img src={avatar_url} />
            <div style={{ backgroundColor: onlineStatus }}></div>
          </div>
        </div>
        <div className="c-add-details">
          <h2>{user.username}</h2>
          <h3>{adminStatus}</h3>
        </div>
        <div className="c-add-btn">
          <button
            onClick={() => {
              handleAddingMemberToCohort(user.id);
            }}
          >
            Add Member
          </button>
        </div>
      </div>
    );
  });

  // creating a cohort

  // loading status

  const [isLoading, setLoading] = useState(false);
  const [isStillLoading, setStillLoading] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [errorsArray, setErrorsArray] = useState([]);

  const [cohortData, setCohortData] = useState({
    name: "",
    start_date: "",
    end_date: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCohortData({ ...cohortData, [name]: value });
  }

  function handleSubmit() {
    setLoading(true);
    console.log(cohortData);
    fetch(`http://localhost:3000/cohorts/create_cohort`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(cohortData),
    })
      .then((response) => {
        if (response.ok) {
          setStillLoading(true);
          setTimeout(() => {
            setStillLoading(false);
            setSuccessText("Success!");
          }, 2000);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          return response.json();
        } else {
          setStillLoading(true);
          setTimeout(() => {
            setStillLoading(false);
            setSuccessText("Failed!");
          }, 2000);
          return response.json();
        }
      })
      .then((data) => {
        if(data.errors.length > 0){
          setErrorsArray(data.errors);
        }else{
          setErrorsArray([]);
        }
      })
      .catch((error) => {});
  }

  let errorsList;
  if (errorsArray) {
    errorsList = errorsArray.map((error) => {
      return <li>{error}</li>;
    });
  }

  
  return (
    <section>
      <div id="cohort-header">
        <div id="coohort-path">
          <div id="path-col">
            <h6>Cohort ></h6>
            <h2>My Cohorts</h2>
          </div>
        </div>
        <div id="project-list-options-col">
          <button
            onClick={() => {
              handleCohortForm();
              setCreatingCohort(true);
            }}
          >
            Create Cohort
          </button>
          <button
            onClick={() => {
              handleCohortForm();
              setCreatingCohort(false);
            }}
          >
            Add Member
          </button>
        </div>
      </div>
      <div id="cohort-body">
        <div id="cohorts-box">{cohortlist}</div>
      </div>
      {isCohortFormActive && (
        <div
          onClick={() => {
            handleCohortForm();
          }}
          className="create-cohort-cont"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setCohortFormActive(true);
            }}
            id="create-cohort-box"
          >
            {isLoading && (
              <div id="loader-container">
                {isStillLoading ? (
                  <div id="loader-icon"></div>
                ) : (
                  <>
                    <i
                      onClick={() => {
                        setLoading(false);
                        setSuccessText("");
                        setErrorsArray([]);
                      }}
                      id="error-back"
                      className="material-icons"
                    >
                      arrow_backwords
                    </i>

                    <h1 id="result-text">{successText}</h1>
                    <ul id="errors-container">{errorsList}</ul>
                  </>
                )}
              </div>
            )}

            {isCreatingCohort ? (
              <CohortForm
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                cohortData={cohortData}
                setCohortData={setCohortData}
              />
            ) : (
              <div id="add-cohort-form">
                <div className="add-cohort-header">
                  <input type="text" />
                  <i className="material-icons">search</i>
                </div>
                <div className="add-cohort-body">{allUsersList}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default CohortList;
