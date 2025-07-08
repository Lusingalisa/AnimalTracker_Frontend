// import React from 'react';
// import { useSpring, animated } from '@react-spring/web';

// function CattleIllustration() {
//   // Animation for subtle movement
//   const [props] = useSpring(() => ({
//     from: { transform: 'translateY(0px)' },
//     to: async (next) => {
//       while (true) {
//         await next({ transform: 'translateY(-5px)' });
//         await next({ transform: 'translateY(0px)' });
//         await next({ transform: 'translateY(5px)' });
//         await next({ transform: 'translateY(0px)' });
//       }
//     },
//     config: { duration: 3000 },
//   }));

//   return (
//     <div className="cattle-illustration-container">
//       <animated.svg
//         width="100%"
//         height="auto"
//         viewBox="0 0 400 300"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         style={props}
//       >
//         {/* Background Hills */}
//         <path
//           d="M0 250 C100 200, 200 220, 300 230 C400 240, 500 200, 400 250 L0 250 Z"
//           fill="#81c784" // --secondary-color
//           fillOpacity="0.3"
//         />
        
//         {/* Cow Body */}
//         <path
//           d="M150 100 C120 100, 100 120, 100 150 C100 180, 120 200, 150 210 C180 220, 220 220, 250 210 C280 200, 300 180, 300 150 C300 120, 280 100, 250 100 L150 100 Z"
//           fill="#2e7d32" // --primary-color
//           stroke="#1b5e20" // --primary-hover
//           strokeWidth="2"
//         />
        
//         {/* Cow Head */}
//         <path
//           d="M250 100 C270 100, 290 120, 290 140 C290 160, 270 170, 250 170 C230 170, 210 160, 210 140 C210 120, 230 100, 250 100 Z"
//           fill="#2e7d32"
//           stroke="#1b5e20"
//           strokeWidth="2"
//         />
        
//         {/* Ears */}
//         <path
//           d="M260 110 C270 90, 280 100, 270 120 C260 140, 250 130, 260 110 Z"
//           fill="#1b5e20"
//         />
//         <path
//           d="M240 110 C230 90, 220 100, 230 120 C240 140, 250 130, 240 110 Z"
//           fill="#1b5e20"
//         />
        
//         {/* Horns */}
//         <path
//           d="M270 90 C275 70, 285 70, 280 90"
//           stroke="#5d4037"
//           strokeWidth="3"
//           fill="none"
//         />
//         <path
//           d="M230 90 C225 70, 215 70, 220 90"
//           stroke="#5d4037"
//           strokeWidth="3"
//           fill="none"
//         />
        
//         {/* Legs */}
//         <path
//           d="M130 210 L130 250 M170 210 L170 250 M230 210 L230 250 M270 210 L270 250"
//           stroke="#1b5e20"
//           strokeWidth="6"
//           strokeLinecap="round"
//         />
        
//         {/* Tail */}
//         <path
//           d="M100 180 C80 170, 70 160, 60 170 C50 180, 60 190, 70 190"
//           stroke="#1b5e20"
//           strokeWidth="3"
//           fill="none"
//         />
        
//         {/* Eye */}
//         <circle cx="260" cy="130" r="4" fill="white" />
//         <circle cx="260" cy="130" r="2" fill="black" />
        
//         {/* Nostrils */}
//         <circle cx="240" cy="150" r="2" fill="black" />
//         <circle cx="245" cy="150" r="2" fill="black" />
        
//         {/* Spots (for more realism) */}
//         <circle cx="180" cy="130" r="8" fill="#1b5e20" fillOpacity="0.5" />
//         <circle cx="220" cy="150" r="10" fill="#1b5e20" fillOpacity="0.5" />
//         <circle cx="160" cy="170" r="6" fill="#1b5e20" fillOpacity="0.5" />
        
//         {/* Grass in foreground */}
//         <path
//           d="M0 250 L20 230 L40 250 L60 230 L80 250 L100 230 L120 250 L140 230 L160 250 L180 230 L200 250 L220 230 L240 250 L260 230 L280 250 L300 230 L320 250 L340 230 L360 250 L380 230 L400 250"
//           stroke="#2e7d32"
//           strokeWidth="2"
//           fill="none"
//         />
//       </animated.svg>
      
//       <div className="cattle-illustration-text">
//         <h3>Cattle Tracking System</h3>
//         <p>Monitor your livestock with precision</p>
//       </div>
//     </div>
//   );
// }

// export default CattleIllustration; 

import React from 'react';
import './CattleIllustration.css'; // Optional: for custom styling

function CattleIllustration() {
  return (
    <div className="cattle-illustration-container text-center">
      <img
        src="/images/bulls-8352687_1920.jpg"
        alt="Professional Cow Illustration"
        className="cattle-illustration-img"
        style={{ maxWidth: '250px', height: 'auto', marginBottom: '1rem' }}
      />
      <h3 className="text-primary">Herd Track System</h3>
      <p>Monitor your livestock with precision</p>
    </div>
  );
}

export default CattleIllustration;