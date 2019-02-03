import React, { Component } from 'react';
import SingleCell from './single-cell.js';

const BoardRow = (props) => {


  return (
    <div className="board-row">
      {
        props.row.map((cell) => {
          return <SingleCell cell={cell} click={props.click} rightClick={props.rightClick}/>
        })
      }
    </div>
  )
}

export default BoardRow;