import React from 'react';
import "./display.css";

const Display = ({ onGroupByChange, onOrderByChange }) => {

  const handleGroupByChange = (value) => {
    onGroupByChange(value);
  };

  const handleOrderByChange = (value) => {
    onOrderByChange(value);
  };

  return (
    <div className="display-dropdown">
      <div className="dropdown">
        <div className="dropdown-content">
          <span>Group By :</span>
          <select onChange={(e) => handleGroupByChange(e.target.value)}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
      <div className="dropdown">
        <div className="dropdown-content">
          <span>Order By :</span>
          <select onChange={(e) => handleOrderByChange(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Display;
