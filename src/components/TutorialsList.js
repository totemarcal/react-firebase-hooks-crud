import React, { useState, useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import { Link } from "react-router-dom";
import TutorialDataService from "../services/TutorialServiceFirebase";
import Pagination from "@material-ui/lab/Pagination";


const TutorialsList = () => {
  
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  /* use react-firebase-hooks */
  const [tutorials, loading, error] = useList(TutorialDataService.getAll());

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  const getRequestParams = (page, pageSize) => {
    let params = {};

    if (page) {
      params["page"] = page;
    }

    if (pageSize) {
      params["limit"] = pageSize;
    }

    return params;
  };


  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshList = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  useEffect(refreshList, [page, pageSize]);

  const deleteTutorial = (id) => {
    //console.log(tutorials.child(id))
    if (window.confirm('Deseja excluir?')){
      TutorialDataService.remove(id)
        .then(response => {
          console.log(response.data);
          refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then(() => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const findByTitle = () => {
    //...
  };

  return (
    <div className="list row">
      <div className="col-md-10">
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-10">
        <h4>Tutorials List</h4>

        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          {!loading && 
            tutorials &&
            tutorials.map((tutorial, index) => (
              <tr>
                <th scope="row">{tutorial.key}</th>
                <td>{tutorial.val().title}</td>
                <td>{tutorial.val().description}</td>
                <td> <Link to={"/tutorials/" + tutorial.key}
                  className="badge badge-warning">Edit</Link>
                </td>
                <td> <Link onClick={() => deleteTutorial(tutorial.key)}
                  className="badge badge-danger">Remove</Link>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default TutorialsList;
