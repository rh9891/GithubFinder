import React, { Fragment, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import GithubContext from "../../context/github/githubContext";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import { getUserAndRepos } from "../../context/github/actions";
import { GET_USER_AND_REPOS, SET_LOADING } from "../../context/types";

const User = ({ match: { params } }) => {
  const {
    user: {
      name,
      company,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    },
    loading,
    dispatch,
    repos,
  } = useContext(GithubContext);

  useEffect(() => {
    dispatch({ type: SET_LOADING });
    getUserAndRepos(params.login).then((response) =>
      dispatch({ type: GET_USER_AND_REPOS, payload: response })
    );
  }, [dispatch, params.login]);

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt=""
            style={{ width: "150px" }}
          />
          <h1 id="name">{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              {" "}
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">
          Public Repositories: {public_repos}
        </div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
