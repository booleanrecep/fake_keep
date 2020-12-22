import React from "react";
import { BiPalette } from "react-icons/bi";
import { AiOutlineDelete, AiOutlineFileAdd } from "react-icons/ai";
import { BsFillCircleFill } from "react-icons/bs";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import "./App.scss";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {connect} from "react-redux"
const mapDispatchToProps=(dispatch)=>{
  return{
    addCard:(note)=>dispatch({type:"ADD_DATA",note})
  }
}

function AddCard(props) {
  

  const [state, setState] = React.useState({
    display: "none",
    marginBottom: "",
    bgColor: "#fff",
    fontColor: "",
    id:"",
    content: {
      title: "",
      description: "",
    },
  });

  const handleChange = (e) => {
    e.preventDefault();
    e.persist();
    setState((prevState) => ({
      ...prevState,
      content: {
        ...prevState.content,
        [e.target.getAttribute("name")]: e.target.innerText,
      },
    }));
  };

  const handleSetColor = (clr) => {
    setState((prevState) => ({
      ...prevState,
      bgColor: clr,
      fontColor: "#202124",
    }));
  };
  const showTools = () => {
    const ID=uuidv4().substring(0,20)

    setState((prevState) => ({
      ...prevState,
      display: "block",
      marginBottom: "0em",
      id:ID,
    }));
  };
  const hideTools = () => {
    setState({
      display: "none",
      marginBottom: "",
      bgColor: "#fff",
      fontColor: "",
      id:"",
      content: {
        title: "",
        description: "",
      },
     
    });
  };
  const handleShow = () => {
    setState((prevState) => ({
      ...prevState,
      showPopover: !prevState.showPopover ? true : false,
    }));
  };
  const handleSubmit = async () => {
    const note = {
      _id:state.id,
      title: state.content.title,
      description: state.content.description,
      color: state.bgColor,
    }
    props.addCard([note])
    try {
      const newCard = await axios.post("/notes", note);
     
      hideTools()

      console.log("Added");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div
        id="add-card"
        onClick={hideTools}
        style={{
          height: "48vh",
          width: "100vw",
        }}
      ></div>
      <div
        className="add-note-bar"
        onClick={showTools}
        style={{
          backgroundColor: state.bgColor,
          transition: "background-color 0.5s",
        }}
      >
        <div
          name="title"
          onFocus={(e)=>
            e.target.innerText=state.content.title===""?"":state.content.title
          }
          onBlur={
            (e)=>
            e.target.innerText=state.content.title===""?"Başlık":state.content.title
          }
          onInput={handleChange}
          className="title"
          aria-label="Başlık"
          contentEditable="true"
          style={{
            transition: "all 0.5s ",
            display: state.display,
            color: state.fontColor,
          }}
        >
          {/* {state.content.title} */}
          Başlık
        </div>

        <div
          name="description"
          onInput={handleChange}
          onFocus={(e)=>
            e.target.innerText=state.content.description===""?"":state.content.description
          }
          onBlur={
            (e)=>
            e.target.innerText=state.content.description===""?"Not":state.content.description
          }
          className="desc"
          contentEditable="true"
          aria-multiline="true"
          role="textbox"
          tabIndex="0"
          spellCheck="true"
          style={{
            transition: "all 0.5s ",
            marginBottom: state.marginBottom,
            color: state.fontColor,
          }}
        >
          {/* {state.content.description} */}
         Not
        </div>
        <div
          className="bottom-tools"
          style={{ transition: "all 0.1s ", display: state.display }}
        >
            <AiOutlineFileAdd onClick={handleSubmit}/>
          <OverlayTrigger
            trigger="click"
            placement="right"
            // delay={{ show: 250, hide: 10000 }}

            show={state.showPopover}
            overlay={
              <Popover id="popover-basic">
                <Popover.Title as="h3">Choose a color</Popover.Title>
                <Popover.Content>
                  {[
                    "#8D8584",
                    "#D2948E",
                    "#D1938E",
                    "#FFF8AA",
                    "#D7FFA7",
                    "#FEECB9",
                    "#B6CDD2",
                    "#A5B6D3",
                    "#B9A0CF",
                    "#DCC2D0",
                    "#C2B19D",
                    "#CFD0D2",
                  ].map((color) => (
                    <BsFillCircleFill
                      onClick={() => handleSetColor(color)}
                      style={{
                        color: color,
                      }}
                    />
                  ))}
                </Popover.Content>
              </Popover>
            }
          >
            {/* <Button variant="success"> */}
            <BiPalette onClick={handleShow} />
            {/* </Button> */}
          </OverlayTrigger>

          {/* <AiOutlineDelete /> */}
        </div>
      </div>
    </div>
  );
}
export default connect(null,mapDispatchToProps)(AddCard)