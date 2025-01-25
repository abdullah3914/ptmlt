import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// import Csp from './images/csp.jpeg';
// import Csp3 from './images/csp3.png';
import Csp4 from './images/csp4.png';
 import D from './images/d10.png';
// import D2 from './images/d2.png';
// import D3 from './images/d3.jpeg';
import D4 from './images/d4.png';
import Wee from './images/weel.png';
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
      fontSize:'19px',
      fontWeight:'400',
      color:'#262729',
      padding:'20px',
      lineHeight:'37px',
      paddingLeft:'40px',
      paddingRight:'40px',
      textShadow:'1px',
      textAlign:'center',
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
        width:'45%',
        border:'solid',
        marginTop:'20px',
        borderWidth:'1px',
        textlign:'justify',
        borderColor:'#dddddd',
        borderRadius:'320px', 
      },

      imgh1:{
        paddingLeft:'10px',
        textAlign:'justify',
        fontWeight:'550',
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
          fontSize:'14px',
          fontStyle: 'bold',
          color:'#27292B',
          textAlign:'justify',
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
          backgroundColor: 'rgba(254, 254, 254, 0.42)',
          backdropFilter: 'blur(12px)', 
          textAlign: 'left',
          overflowY:'auto',
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
          background: 'linear-gradient(135deg, #fa21cf, #00c9c9c5)',/* Reverse gradient on hover */
    color:'white',
    padding: '10px 20px',
    borderRadius: '15px',
    border: '1px solid rgb(0, 0, 0)',
    fontSize: '16px',
    fontWeight: '400',
    fontFamily: 'Poppins, sans-serif',
    transition: 'all 0.3s ease-in-out',
        },

        pheading:{
          fontSize:'33px',
          fontWeight:'500',
        },

        ppara:{
          fontSize:'17px',
          fontWeight:'500',
          marginTop:'-10px'
        },
  };

  return (
    <div style={styles.splitScreen}>

{showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>

            <div style={{paddingLeft:'120px',paddingRight:'200px',paddingTop:'10px',paddingBottom:'100px'}}>

            <h1 style={{fontSize:'50px',fontWeight:'500',marginBottom:'10px',textDecoration:'underline',color:'#333333'}} >About Triadic</h1> 
            <div>

            <h1 style={styles.pheading} >What is Tiadic Peirce logic?</h1>
            <p style={{fontSize:'20px',fontWeight:'500',marginTop:'-16px',color:'#333333'}}>
            Charles perse defines logic in terms of  "formal semotics", he introduces his triadic logic in 2 forms given below.
            </p>

            <h2 style={{fontSize:'20px',fontWeight:'500',marginTop:'-11px',color:'#333333',textDecoration:'underline'}}>Logical Rules:</h2>
            <p style={{fontSize:'18px',fontWeight:'400',marginTop:'-12px',color:'#333333'}}>
             Triadic logic is that logic which, though not rejecting entirely the Principle of
             Excluded Middle, nevertheless recognizes that every proposition, S is P, is either
             true, or false, or else S has a lower mode of being such that it can neither be
             determinately P, nor determinately not-P, but is at the limit between P and not P</p>

             <h2 style={{fontSize:'20px',fontWeight:'500',marginTop:'-11px',color:'#333333',textDecoration:'underline'}}>Application:</h2>
            <p style={{fontSize:'18px',fontWeight:'400',marginTop:'-12px',color:'#333333'}}>
            Thus a blot is made in the sheet. Then every point of the sheet is unblackened
            or is blackened. But there are points on the boundary line, and those points are
            insusceptible of being unblackened or being blackened, since these predicates
            refer to the area about S and a line has no area about any point of it.</p>
        

            <h2 style={{fontSize:'20px',fontWeight:'500',marginTop:'-11px',color:'#333333',textDecoration:'underline'}}>Truth Values:</h2>
            <ul style={{marginTop:'-12px',paddingLeft:'19px',lineHeight:'30px'}}>
            <li >V as True (white)</li>
            <li>F as False (blackened)</li>
            <li>L as Limit (border-line)</li>
            </ul>

            <h2 style={{fontSize:'20px',fontWeight:'500',marginTop:'-11px',color:'#333333',textDecoration:'underline'}}>Triadic Logical Operators:</h2>
            <img style={{ width:'70%',marginTop:'-4px',border:'solid',borderWidth:'1px',textlign:'justify',borderColor:'#dddddd',borderRadius:'10px', }} src={D} alt="Logo" />
            </div>

            <h1 style={styles.pheading} >What is Tiadic Peirce Data structures and algorithm?</h1>
            <p style={{fontSize:'19px',fontWeight:'500',marginTop:'-16px',color:'#333333'}}>
            A data structure refers to the computational vocabulary dealing with data organization, management, and storage format, because alongside computation, representation in terms of storage and retrieval lays at the core of computers.  Data structure is meant to be physical or computational form of the data; or it is the computational counterpart of human memory per se – computational storage.  Peircean Triadic data structure (s), programming languages and algorithms lays their foundation on Peirce's Triadic Set and his Triadic Logic. Some Important concepts are listed as follows:
            </p>
            <h2 style={{fontSize:'20px',fontWeight:'500',marginTop:'-11px',color:'#333333',textDecoration:'underline'}}>1.Triadic Data Type:</h2>
            <p style={{fontSize:'18px',fontWeight:'400',marginTop:'-12px',color:'#333333'}}>
            A data type is a type plus a collection of operations to manipulate the type. <br></br>For an example, Triadic variable is a member of the Triadic data type.</p>
            <h2 style={{fontSize:'20px',fontWeight:'500',marginTop:'-11px',color:'#333333',textDecoration:'underline'}}>2.Triadic Operators:</h2>
            <p style={{fontSize:'18px',fontWeight:'400',marginTop:'-12px',color:'#333333'}}>
            Triadic operator(s) are realization (or construct) of Trichotomic functions: logical, relational, arithmetic 
Triadic Functions: Triadic functions are defined in programming syntax as follows: <br></br>  Triadic_&lt;return_data_type&gt;function_name &lt;Triadic_parameters&gt;
  </p>
  <h2 style={{fontSize:'20px',fontWeight:'500',marginTop:'-5px',color:'#333333',textDecoration:'underline'}}>3.Triadic Array</h2>
  <h2 style={{fontSize:'20px',fontWeight:'500',marginTop:'-5px',color:'#333333',textDecoration:'underline'}}>4.Triadic Trees</h2>
  <h2 style={{fontSize:'20px',fontWeight:'500',marginTop:'-5px',color:'#333333',textDecoration:'underline'}}>5.Triadic Linked List</h2>
  <p style={{fontSize:'18px',fontWeight:'400',marginTop:'-12px',color:'#333333'}}>
  Finally, Triadic Data structures and algorithms are summarized in the following diagram.
    </p>
    <img style={{ width:'30%',marginTop:'-5px',border:'solid',borderWidth:'1px',textlign:'justify',borderColor:'#dddddd',borderRadius:'10px', }} src={Wee} alt="Logo" />
    

<br></br>
            <button style={styles.closeButton} onClick={togglePopup}>
              Close
            </button>

            </div>
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
          <div style={{paddingRight:'20px',display:'flex',justifyContent:'centers',alignItems:'center'}}>
          <img style={styles.img} src={Csp4} alt="Logo" />
          <div >
          <h1 style={styles.imgh1}>Charles Sanders Peirce</h1> 
          <h1 style={{paddingLeft:'10px',marginTop:'-12px',textAlign:'justify',fontWeight:'300',fontSize:'16px'}}>(1839-1914)</h1>
          </div>
          </div>
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
