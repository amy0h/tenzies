import React from 'react'

export function firstFace(props) {

    return (
        <div className="die first-face" style={props.style}>
            <span className="dot"></span>
        </div>        
    )
}

export function secondFace(props) {
    return (
      <div className="die second-face" style={props.style}>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    )
  }
  
  export function thirdFace(props) {
    return (
        <div className="die third-face" style={props.style}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    )
  }

  export function fourthFace(props){
    return (
        <div className="die fourth-face" style={props.style}>
            <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
            <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    )
  }

  export function fifthFace(props) {
    return (
        <div className="die fifth-face" style={props.style}>
  
            <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
            
            <div className="column">
                <span className="dot"></span>
            </div>
            
            <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
            </div>

        </div>
    )
  }

  export function sixthFace(props) {
    return (
        <div className="die sixth-face" style={props.style}>

            <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>

            <div className="column">
                <span className="dot"></span>
                <span className="dot"></span>
                    <span className="dot"></span>
            </div>

        </div>
    )
  }