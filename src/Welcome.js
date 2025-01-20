import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// import Csp from './images/csp.jpeg';
// import Csp3 from './images/csp3.png';
import Csp4 from './images/csp4.png';
// import D1 from './images/d1.jpeg';
// import D2 from './images/d2.png';
// import D3 from './images/d3.jpeg';
import D4 from './images/d4.png';
// import Wee from './images/weel.png';
// import b3 from './images/b3.png';/* Smaller image */

function Welc() {

  const goToAlgo = () => {
    navigate('/settings');
  };

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const styles = {
    splitScreen: {
      display: 'flex',
      flexDirection: 'row',  // Ensure content is stacked vertically
      height: '100vh',  // Make the container take up the full viewport height
    },


    topPane: {
      flexDirection: 'column',
      width: '60%',  // Full width
      height: '80%',  // Take up 50% of the height
      //backgroundColor: '#f0f0f0',  // Optional background for visibility
      display: 'flex',
      marginTop:'8%',
      marginLeft:'5%',
      backgroundImage:'{b3}', 
      marginRight:'2%',
      border:'solid',
      borderWidth:'1px',
      borderRadius:'20px',
      borderColor:'  #dddddd',
      backgroundColor:'none',   
      backdropFilter: 'blur(5px)',   
      zIndex: '10', 
      justifyContent: 'center',
      alignItems: 'center',  
    },

    boxt1:{
      //border:'solid',
      //borderWidth:'1px',
      //backdropFilter: 'blur(5px)',   
      margin:'40px',
      marginTop:'0px',
      borderRadius:'20px',
      background:'linear-gradient(90deg, rgba(0, 255, 72, 0.24) 0%, rgba(0, 204, 255, 0.33) 100%)',
    },

    boxt2:{
    alignItems: 'center', 
    justifyContent:'center',
    display: 'flex',
    flexDirection: 'row',  // Aligns buttons vertically in a column
    },

    boxt2b:{
    background: 'linear-gradient(135deg, #00C9A7, #00A3E0)',
    color: 'white',
    padding: '20px 45px',
    border: 'none',
    borderRadius: '15px',
    fontSize: '17px',
    fontWeight: '400',
    cursor: 'pointer',
    margin:'30px',
    fontFamily:'poppins',
    //boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    //transition: 'all 0.3s ease-in-out',
    },

    boxt1t:{
      fontSize:'22px',
      fontWeight:'500',
      color:'#262729',
      padding:'20px',
      lineHeight:'37px',
      textAlign:'center',
      textShadow:'1px',
      fontFamily:'poppins',
    },

    bottomPane: {
      width: '40%',  // Full width
      height: '80%',  // Take up 50% of the height
      display: 'flex',
      marginTop:'8%',
      marginLeft:'2%',
      marginRight:'4%',
      flexDirection: 'column',
      border:'solid',
      borderWidth:'1px',
      borderRadius:'20px',
      borderColor:'  #dddddd',
      backgroundColor:'none',  /* Semi-transparent white background */
      backdropFilter: 'blur(5px)',  /* Apply blur effect to the background */
      zIndex: '10',
      justifyContent: 'center',
      alignItems: 'center',
      },

      boxb1:{
      width: '100%',  // Full width
      height: '45%',  // Take up 50% of the height
      //backgroundColor: '#f0f0f0',  // Optional background for visibility
      display: 'flex',
      marginTop:'0%',
      marginLeft:'8%',
      marginRight:'0%',
      zIndex: '10',  
      justifyContent: 'center',
      alignItems: 'center', 
      //marginBottom:'56%',
      },

      boxb2:{
        width: '100%',  // Full width
        height: '0%',  // Take up 50% of the height
        //backgroundColor: '#f0f0f0',  // Optional background for visibility
        display: 'flex',
        marginTop:'5%',
        marginLeft:'0%',
        marginRight:'0%',
        border:'solid',
        borderWidth:'1px',
        borderRadius:'20px',
        borderColor:'  #dddddd',
        backgroundColor:'none',  /* Semi-transparent white background */
        backdropFilter: 'blur(5px)',  /* Apply blur effect to the background */
        zIndex: '10',  
        justifyContent: 'center',
        alignItems: 'center', 
        },
      img:{
        width:'50%',
        border:'solid',
        marginTop:'20px',
        borderWidth:'1px',
        borderColor:'#dddddd',
        borderRadius:'320px', 
      },

      imgh1:{
        paddingLeft:'15px', 
        fontSize:'20px',
      },

      imgt2:{
        paddingLeft:'30px', 
        paddingRight:'30px', 
        paddingTop: '20px',
        fontSize:'17px',
        textAlign:'center',
        fontStyle: 'italic',
        fontWeight:'400',
        },

        imgt3:{
          marginLeft:'20px', 
          marginRight:'40px', 
          fontSize:'12px',
          fontStyle: 'bold',
          color:'#27292B',
          textAlign:'left',
          fontWeight:'400',
          border:'solid',
          padding:'10px',
          borderWidth:'2px',
          borderColor:'#dddddd',
          paddingLeft:'15px',
          //borderRadius:'15px',
          borderLeft: '2px solid',
          borderRight: '0px ',
          //borderLeft: '0px',
          borderTop: '0',
          borderBottom: '0',

          //borderColor: 'linear-gradient( 109.6deg,  rgba(112,246,255,0.33) 11.2%, rgba(221,108,241,0.26) 42%, rgba(229,106,253,0.71) 71.5%, rgba(123,183,253,1) 100.2% )',
          },
        
        img2:{
          width:'50%',
         
          objectFit:'cover',
          display:'block',
        },

        popupOverlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          //backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        },
        popupContent: {
          backgroundColor: 'rgba(62, 65, 62, 0.42)',
          backdropFilter: 'blur(5px)', 
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          maxWidth: '100%',
          width: '100%',
          height:'100%',
          fontFamily: 'poppins',
        },
        closeButton: {
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer',
          marginTop: '20px',
        },
  };

  return (
    <div style={styles.splitScreen}>

{showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2>About Our Research</h2>
            <p>
              My research explores the intersection of technology, innovation, and human experience. 
              By focusing on creative problem-solving, I aim to design solutions that not only improve 
              efficiency but also positively impact the lives of users. This journey has been a deep dive 
              into understanding complex systems, user needs, and the power of thoughtful design.
            </p>
            <button style={styles.closeButton} onClick={togglePopup}>
              Close
            </button>
          </div>
        </div>
      )}

      <div style={styles.topPane}>

        <div style={styles.boxt1}>

          <h1 style={styles.boxt1t}>
          The motivation behind this project stems from a desire to create a meaningful and 
          impactful solution to address a specific challenge. By leveraging technology and innovative ideas,
           the goal is to simplify processes, improve efficiency, and deliver value to users. 
           This project is driven by a passion for learning, creativity, and contributing positively to the world, 
          while also gaining practical experience and expanding knowledge in the field
          </h1>

        </div>

        <div style={styles.boxt2}>

        <button style={styles.boxt2b} onClick={goToAlgo}>Lets Get Started</button>
        <button style={styles.boxt2b} onClick={togglePopup}>About Triadic</button>

        </div>
        
      </div>

      <div style={styles.bottomPane}>
        <div style={styles.boxb1}>
          
          <img style={styles.img} src={Csp4} alt="Logo" />
          <h1 style={styles.imgh1}>Charles Sanders Peirce</h1>

        </div>
        <div>

          <h1 style={styles.imgt2}>“ Upon this first, and in one sense this sole, rule of reason, that in order to learn you must desire to learn ” </h1>
        </div>
        <div style={styles.boxb1}>
        <img style={styles.img2} src={D4} alt="Logo" />
        <h1 style={styles.imgt3}>The triadic essence of meaning: the representamen as the vessel, the object as the reality it reflects, and the interpretant as the bridge of understanding, capturing the infinite dance between perception, reality, and interpretation </h1>
        </div>
      </div>
    </div>
  );
}

export default Welc;
