import React from 'react';
import Card from './Card';

const Home = () => {
    return (
        <>
            <section className='hero'>
                <section className='hero-text'>
                    <h1>Little Lemon</h1>
                    <h3>Chicago</h3>
                    <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                    <a href="/reservations">
                        <button>Reserve a table</button>
                    </a>
                </section>
                <img src="dish.jpg" width="300" alt="Little Lemon Restaurant" />
            </section>
            <section className='specials'>
                <section className='specials-header'>
                    <h2>Specials</h2>
                    <a href="/menu">
                        <button>Online Menu</button>
                    </a>
                </section>
                <div className='cards'>
                    <Card 
                        image="salad.jpg" 
                        title="Greek Salad" 
                        description="The famous greek salad of crispy lettuce, pepppers, olives, and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons." 
                        price={12.99} 
                    />
                    <Card 
                        image="bruchetta.jpg" 
                        title="Brushetta" 
                        description="Our Brushetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
                        price={5.99} 
                    />
                    <Card 
                        image="lemon-dessert.jpg" 
                        title="Lemon Dessert" 
                        description="This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imaged." 
                        price={5.00} 
                    />
                </div>
            </section>
        </>
    );
};

export default Home;