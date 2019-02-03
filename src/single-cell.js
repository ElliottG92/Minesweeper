import React, { Component } from 'react';
import './single-cell.css';
import bomb from './bomb.jpg';
import flag from './flag.png';

const SingleCell = (props) => {
  let location= props.cell.row + '-' + props.cell.column;
  if (props.cell.isFlagged === true) {
    return (
      <img id={location} className="outer-cell" src={flag} alt="flag" height="20px" width="20px" onContextMenu={props.rightClick}/>
    )
  } 
  if (props.cell.isClicked=== true && props.cell.isMine === true) {
    return (
      <img id={location} className="outer-cell-exposed" src={bomb} alt="bomb" height="20px" width="20px" onContextMenu={props.rightClick} onClick={props.click} />
    )
  } 
  if (props.cell.isClicked === true && props.cell.isMine === false && props.cell.minesTouching !== 0 && props.cell.minesTouching <=5){
    return (
      <div id={location} className={"outer-cell-exposed" + props.cell.minesTouching} onContextMenu={props.rightClick} onClick={props.click}>
          {props.cell.minesTouching}
        </div>
    )
  }
  if (props.cell.isClicked === true && props.cell.isMine === false && props.cell.minesTouching !== 0) {
    return (
      <div id={location} className="outer-cell-exposed0" onContextMenu={props.rightClick} onClick={props.click}>
        {props.cell.minesTouching}
      </div>
    )
  }
  if (props.cell.isClicked === true && props.cell.isMine === false && props.cell.minesTouching === 0) {
    return (
      <div id={location} className="outer-cell-exposed" onContextMenu={props.rightClick} onClick={props.click}>
      </div>
    )
  }
  else {
    return (
      <div id={location} className="outer-cell" onContextMenu={props.rightClick} onClick={props.click}></div>
    )
  }
}

export default SingleCell;