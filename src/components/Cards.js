import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {

  return (

    <div className='cards'>

      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              text='one'
              path='/services'/>
            <CardItem
              text='two'
              path='/services'/>


            <CardItem
              text='three'
              path='/services'
            />
            <CardItem
              text='four'
              path='/products'
            />
            <CardItem
              text='five'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
