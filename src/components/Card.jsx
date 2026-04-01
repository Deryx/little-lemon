import React from 'react';

const Card = ({ image, title, description, price }) => {
    return (
        <div className='card'>
            <img src={image} alt={title} />
            <section className='card-header'>
                <h3>{title}</h3>
                <span className='price'>${price.toFixed(2)}</span>
            </section>
            <p className="description">{description}</p>
            <p className="order"><a href="/order">Order a delivery</a></p>
        </div>
    )
};

export default Card;