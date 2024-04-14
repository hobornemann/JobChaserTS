import React, { useState } from 'react';

function ToggleButton() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    
  };

  return (
    <button onClick={handleToggle}>
      {isToggled ? 'Alla sökord samtidigt' : 'Minst 1 sökord uppfyllt'}
    </button>
  );
}

export default ToggleButton;