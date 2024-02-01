import React from 'react';

function NumericInput2({ value, onChange, floatingLable}) {
  
  const handleInputChange = (e) => {
    // Update the input value when it changes
    onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    // Prevent non-numeric characters from being entered
    if (
      // Allow backspace, delete, and arrow keys
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      // Allow numbers and a single dot for decimal values
      (e.key >= '0' && e.key <= '9') ||
      e.key === '.'
    ) {
      return;
    }
    e.preventDefault();
  };

  return (
    <div className='form-floating'>
        <input type="text" className="form-control" value={value} onChange={handleInputChange} onKeyDown={handleKeyDown} id="floatingInput"/>
        <label htmlFor="floatingInput">{floatingLable}</label>
    </div>
  );
}

export default NumericInput2;