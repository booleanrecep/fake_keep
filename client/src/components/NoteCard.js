import React from 'react';
import { BiPalette } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsFillCircleFill } from 'react-icons/bs';
import DragIt from './DragIt';
import axios from 'axios';
import { connect } from 'react-redux';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import './App.scss';
const mapDispatchToProps = dispatch => {
  return {
    deleteCard: id => dispatch({ type: 'DELETE_DATA', id })
  };
};
function NoteCard(props) {
  const [state, setState] = React.useState({
    display: 'block',
    marginBottom: '',
    DSP: '',
    id: props._id,
    bgColor: props.color,
    fontColor: '',
    content: {
      title: props.title,
      description: props.description
    }
  });

  const handleSetColor = clr => {
    setState(prevState => ({
      ...prevState,
      bgColor: clr,
      fontColor: '#202124'
    }));
  };
  const handleChange = e => {
    e.preventDefault();
    e.persist();
    setState(prevState => ({
      ...prevState,
      content: {
        ...prevState.content,
        [e.target.getAttribute('name')]: e.target.innerText
      }
    }));
  };
  const showTools = () => {
    setState(prevState => ({
      ...prevState,
      display: 'block',
      marginBottom: '2em'
    }));
  };
  const hideTools = () => {
    setState(prevState => ({
      ...prevState,
      marginBottom: '0',
      showPopover: false,
      bgColor: ''
    }));
  };
  const handleShow = () => {
    setState(prevState => ({
      ...prevState,
      showPopover: !prevState.showPopover ? true : false
    }));
  };
  const handleRemove = async () => {
    setState(prevState => ({
      ...prevState,
      DSP: 'none'
    }));
    try {
      const remvedNte = await axios.delete(`/notes/${state.id}`);

      console.log('Note was removed');
    } catch (err) {
      console.log({ error: err.message });
    }
  };
  return (
    // <DragIt>
    <div className="note-card" style={{ display: state.DSP }}>
      <div
        className="add-note-bar"
        style={{
          backgroundColor: state.bgColor,
          transition: 'background-color 1s'
        }}
      >
        <div
          name="title"
          onInput={handleChange}
          // onFocus={e =>
          //   (e.target.innerText =
          //     state.content.title === '' ? '' : state.content.title)
          // }
          // onBlur={e =>
          //   (e.target.innerText =
          //     state.content.title === '' ? 'Title' : state.content.title)
          // }
          className="title"
          aria-label="Title"
          contentEditable="true"
          style={{
            transition: 'all 1s ease',
            display: state.display,
            color: state.fontColor
          }}
        >
          {state.content.title}
        </div>

        <div
          name="description"
          onInput={handleChange}
          // onFocus={e =>
          //   (e.target.innerText =
          //     state.content.description === '' ? '' : state.content.description)
          // }
          className="desc"
          contentEditable="true"
          aria-multiline="true"
          role="textbox"
          tabIndex="0"
          spellCheck="true"
          style={{
            transition: 'all 1s ease',
            marginBottom: state.marginBottom,
            color: state.fontColor
          }}
        >
          {state.content.description}
        </div>
        <div
          className="bottom-tools"
          style={{ transition: 'display 5s', display: state.display }}
        >
          <AiOutlineDelete onClick={handleRemove} />
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            show={state.showPopover}
            overlay={
              <Popover id="popover-basic">
                <Popover.Title as="h3">Choose a color</Popover.Title>
                <Popover.Content>
                  {[
                    '#8D8584',
                    '#D2948E',
                    '#D1938E',
                    '#FFF8AA',
                    '#D7FFA7',
                    '#FEECB9',
                    '#B6CDD2',
                    '#A5B6D3',
                    '#B9A0CF',
                    '#DCC2D0',
                    '#C2B19D',
                    '#CFD0D2'
                  ].map(color => (
                    <BsFillCircleFill
                      onClick={() => handleSetColor(color)}
                      style={{
                        color: color
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
        </div>
      </div>
    </div>
    // </DragIt>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(NoteCard);
