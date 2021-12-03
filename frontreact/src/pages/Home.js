import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';

export const Home = ({ searchKey }) => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001/api/products').then(res=>res.json())
    .then(res=>{
      setProducts(res);
    })
  })

  return (
    <section id='home'>
      <div className='home-container'>
        <h1>Gallery</h1>
        <div className='home-card'>
          {products && products.map((element,i)=>(
            <Card key={i} name={element.name} picture={element.picture} price={element.price} isActive={element.isActive}/>
          ))}
        </div>
      </div>
    </section>
  );
};
