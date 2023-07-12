import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card } from '../components/card';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        {foodCat !== [] ? (
          foodCat.map((data) => (
            <div className='row mb-3'>
              <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
              {foodItem !== [] ? (
                foodItem.filter((item) => item.CategoryName === data.CategoryName).map(filterItems => (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                  <Card key={filterItems._id} foodItem={filterItems}></Card>                 
                  </div>
                ))
              ) : (
                <div>"No such data found!!"</div>
              )}
            </div>
          ))
        ) : (
          ''
        )}
      </div>
      <Footer />
    </div>
  );
}
