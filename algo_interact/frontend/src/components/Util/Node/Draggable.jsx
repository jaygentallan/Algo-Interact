import React, {Component} from 'react'
import styled, {css} from 'styled-components'

class Draggable extends Component {

    state = {
        //Are we dragging bool
        isDragging: false,
        //coordinates of first mouse click
        originalX: 0, 
        originalY: 0,
        //stores translation => repositions an element in the horizontal and/or vertical directions
        translateX: 0,
        translateY: 0,
        //coordinates of where dragging stopped
        lastTranslateX: 0,
        lastTranslateY: 0
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
      }
      
      //handles first mouse event 
      handleMouseDown = ({ clientX, clientY }) => {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    
        if (this.props.onDragStart) {
          this.props.onDragStart();
        }
    
        this.setState({
          originalX: clientX,
          originalY: clientY,
          isDragging: true
        });
      };

      //Once element is grabbed we keep track of past movements and current position
      handleMouseMove = ({ clientX, clientY }) => {
        const { isDragging } = this.state;
        const { onDrag } = this.props;
    
        if (!isDragging) {
          return;
        }
    
        this.setState(prevState => ({
          translateX: clientX - prevState.originalX + prevState.lastTranslateX,
          translateY: clientY - prevState.originalY + prevState.lastTranslateY
        }), () => {
          if (onDrag) {
            onDrag({
              translateX: this.state.translateX,
              translateY: this.state.translateY
            });
          }
        });
      };

    //Once we stop moving we save positions and stop listening to events
      handleMouseUp = () => {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    
        this.setState(
          {
            originalX: 0,
            originalY: 0,
            lastTranslateX: this.state.translateX,
            lastTranslateY: this.state.translateY,
    
            isDragging: false
          },
          () => {
            if (this.props.onDragEnd) {
              this.props.onDragEnd();
            }
          }
        );
      };
    

    render () {
        //children being components being wrapped by this component - in our case Node components
        const {children} = this.props;
        //state that is being passed to the wrapped component  
        const {translateX, translateY, isDragging} = this.state;

        return (
            <Container
                onMouseDown={this.handleMouseDown}
                x={translateX}
                y={translateY}
                isDragging={isDragging}
            >
                {children}
            </Container>
        );
    }
}

        //styled div that is our wrapper
        const Container = styled.div.attrs(
           props => ({
              style: {transform: `translate(${props.x}px, ${props.y}px)`}
          }))`
            cursor: grab;
            
            ${({ isDragging }) =>
            isDragging && css`
              opacity: 0.8;
              cursor: grabbing;
            `};
          `;

export default Draggable