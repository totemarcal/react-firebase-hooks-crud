import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialServiceFirebase";
import { useList } from "react-firebase-hooks/database";

const Tutorial = props => {
  const initialTutorialState = {
    key: null,
    title: "",
    description: "",
    published: false,
  };
  const [message, setMessage] = useState("");
  
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [tutorials, loading, error] = useList(TutorialDataService.getById(props.match.params.id));
  const [key, setKey] = useState(props.match.params.id)

  const setActiveTutorial = (val, chave) => {
    setCurrentTutorial({... currentTutorial, [chave]: val});
    console.log(currentTutorial)

  };


  useEffect(()=>{
    setCurrentTutorial({... currentTutorial, ["key"]: key});
  }, [])

  useEffect(() => {
      if (tutorials.length-1 >= 0){
        setActiveTutorial(tutorials[tutorials.length-1].val(), tutorials[tutorials.length-1].key)
      }
  }, [tutorials]);

  const   handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      published: status
    };
    TutorialDataService.update(currentTutorial.key, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });  
    };

  const updateTutorial = () => {
    const data = {
      title: currentTutorial.title,
      description: currentTutorial.description,
    };

    TutorialDataService.update(currentTutorial.key, data)
    .then(response => {
      console.log(response.data)
      setMessage("The tutorial was updated successfully!");
    })
    .catch(e=>{
      console.log(e)
    })
  };

  const deleteTutorial = () => {
    console.log(currentTutorial)
    if (window.confirm('Deseja excluir?')){
      TutorialDataService.remove(currentTutorial.key)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
        //props.refreshList();
      })
      .catch(e => {
        console.log(e);
      });  
    }
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentTutorial.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentTutorial.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>
            
              
          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}
          
          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
