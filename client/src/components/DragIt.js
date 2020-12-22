import React from "react";
import Draggable  from "react-draggable";

class DragIt extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          cursor:"default",
            activeDrags: 0,
            deltaPosition: {
              x: 0,
              y: 0,
            },
            controlledPosition: {
              x: -400,
              y: 200,
            },
          };
    }


  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags,cursor:"move"});
  };

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags,cursor:"default"});
  };

  // For controlled component
  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
  };

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = this.state;
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  };

  onControlledDrag = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;
  // console.log(this.state.deltaPosition)

    return (
      <div style={{
        cursor:this.state.cursor
      }}>
        <Draggable
        //  bounds={{top: 0, left: -200, right: 0, bottom: 200}}
          // position={deltaPosition}
          {...dragHandlers}
          onDrag={this.onControlledDrag}
          
        >
         {this.props.children}
        </Draggable>
      </div>
    );
  }
}

export default DragIt;
