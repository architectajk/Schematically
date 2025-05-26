import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Accordion = ({ items = [], onSelect, activeId, mode = 'light' }) => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    const isOpen = openId === id;
    setOpenId(isOpen ? null : id);
    if (onSelect) onSelect(id);
  };

  return (
    <StyledWrapper mode={mode}>
      {items.map(({ id, title, content, path }) => (
        <div className="accordion-item" key={id}>
          {content ? (
            <>
              <div
                className={`accordion-header ${activeId === id ? 'active' : ''}`}
                onClick={() => handleToggle(id)}
              >
                <span>{title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`arrow ${openId === id ? 'open' : ''}`} viewBox="0 0 512 512">
                  <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
              </div>
              {openId === id && (
                <div className="accordion-content list-group list-group-flush">
                  {content.map(({ label, link }, i) => (
                    <Link
                      key={i}
                      to={link}
                      className={`list-group-item list-group-item-action ${mode === 'light' ? 'text-dark' : 'text-light'} bg-transparent`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link
              to={path || '#'}
              className={`accordion-header simple-link ${activeId === id ? 'active' : ''}`}
              onClick={() => onSelect?.(id)}
            >
              <span>{title}</span>
            </Link>
          )}
        </div>
      ))}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .accordion-item {
    border-radius: 5px;
    margin-bottom: 8px;
    overflow: hidden;
  }

  .accordion-header {
    padding: 10px 15px;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;
    background-color: transparent;
    color: ${(props) => (props.mode === 'light' ? 'black' : 'white')};
  }

  .accordion-header.active {
    background-color: ${(props) =>
      props.mode === 'light' ? '#c9e0ff' : '#0d6efd'};
    color: ${(props) => (props.mode === 'light' ? '#0d6efd' : 'white')};
    font-weight: bold;
  }

  .accordion-content {
    padding: 10px 15px;
    font-size: 14px;
    background-color:transparent;
    color: white;
  }

  .arrow {
    width: 16px;
    height: 16px;
    fill: ${(props) => (props.mode === 'light' ? 'black' : 'white')};
    transform: rotate(-90deg);
    transition: transform 0.3s ease;
  }

  .arrow.open {
    transform: rotate(0deg);
  }
`;

export default Accordion;