
import samyog_text_logo from"../assets/samyog_logo_text_white.png"
import "../css/HomePageHero.css"
const HomePageHero = () => {
  return (
    <div id='home_container'>
        <div className="home_content">
            <div className="text_container top"><p className='texts'>Student Club</p></div>
            <img src={samyog_text_logo} alt="logo" id='home_samyog_logo'/>
            <div className="text_container bottom"><p className='texts'>of ISE</p></div>
        </div>
    </div>
  )
}

export default HomePageHero;
