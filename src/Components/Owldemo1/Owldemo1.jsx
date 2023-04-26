import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import React,{Component} from 'react';  
import './owl.css';


const Owldemo1 = () => {




    return (
        <div>
               <div>  
      
       <div class='container-fluid' >            
        <OwlCarousel items={3}  
          className="owl-theme"  
          loop={true} 
          autoplay={true}
          autoplayTimeout={2000}
          autoplaySpeed={2000}
          autoplayHoverPause={true}
          margin={8}
        >  
           <div ><img  className='imgo' src= {require('../../images/grocery-banner.png')}/></div>  
           <div><img  className='imgo' src= {require('../../images/grocery-banner-2.jpeg')}/></div>  
           <div><img  className='imgo' src= {require('../../images/slider-2.jpeg')}/></div>  
           <div><img  className='imgo' src= {require('../../images/slider-image-1.jpeg')}/></div>  
           <div><img className='imgo' src= {require('../../images/slider-image-2.jpeg')}/></div>  
           <div><img className='imgo' src= {require('../../images/slider-image-3.jpeg')}/></div>  

      </OwlCarousel>  
      </div>  
  
      </div>  
        </div>
    );
}

export default Owldemo1;
  

        
  