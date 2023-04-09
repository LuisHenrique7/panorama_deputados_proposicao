import React from 'react';
import "./styles.css"

const Ball = ({ array = [], amount = 0, color = "#fff", useColors = false }) => {
  const colors = [
    "#f11", "#1f1", "#1ff", "#03f", "#ff1", "#87f", "#140", "#582",
    "#011", "#109", "#0f9", "#874", "#888", "#a2a", "#2a2", "#894",
    "#611", "#168", "#749", "#414", "#977", "#17a", "#ea2", "#454",
    "#21b", "#768", "#c49", "#4eb", "#e77", "#1c8", "#cd2", "#854",
  ];

  const teste = (number, color) => {
      let rows = []
      for (let i = 0; i < number; i++) {
        rows.push(<div className='ball' key={i} style={{backgroundColor: color}}></div>)
      }
  
      return rows;
    };

  return (
    <div>
      {array.length > 0 && (
        <div className='divBalls'>
          {useColors === true ? 
            array.map((object, i) => teste(object, colors[i])) : array.map((object) => teste(object))
          }
          {/* {array.map((object, i) => teste(object))} */}
        </div>
      )}
      {amount > 0 && (
        <div className='divBalls'>
          {teste(amount, color)}
        </div>
      )}
    </div>
  )
}

export default Ball