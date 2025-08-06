
import HomePageHero from '../components/HomePageHero'
import Carousel from '../components/Carousel';
import HomeAbout from '../components/HomeAbout';
import ScrollTextComponent from '../components/ScrollTextComponent';
import ContactUs from '../components/ContactUs';
import "../css/pageLayoutCss/Home.css"
const HomePage = () => {
  return (
    <div>
        <HomePageHero/> 
        <HomeAbout/> 
        <Carousel/>    
        <ScrollTextComponent/>
        <ContactUs/>
        
    </div>
  )
}

export default HomePage;
