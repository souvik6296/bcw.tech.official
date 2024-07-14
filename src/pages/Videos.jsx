import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import addItems from './script1';
import "./Video.css";

export const Videos = ({setProgress}) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchDataAndCreateElements = async () => {
      const data = await addItems();
      const keys = Object.keys(data);
      const length = keys.length;
      const newElements = [];

      for (let i = length - 1; i >= 0; i--) {
        newElements.push(
          <NavLink to={`/details?index=${i}`} key={i}>
            <div className="col">
              <div className="card">
                <img
                  className="card-img-top"
                  src={data[`video${i}`].thumbnail}
                  alt={`video${i}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{data[`video${i}`].title}</h5>
                </div>
              </div>
            </div>
          </NavLink>
        );
      }

      setElements(newElements);
    };

    fetchDataAndCreateElements();
    setProgress(40);
    setTimeout(()=>{
        setProgress(100);
    },2000);
  }, []);

  return (
    <main>
      <h1 id="headingnew">
        All Videos of Our Channel
      </h1>
      <div className="container text-center">
        <div id="main-cont" className="row row-cols-1 row-cols-md-3">
          {elements}
        </div>
      </div>
    </main>
  );
};

export default Videos;
