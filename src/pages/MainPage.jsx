import React, { useState, useEffect, useRef } from 'react';
import StatusPage from './StatusPage';
import UserPage from './UserPage';
import PriorityPage from './PriorityPage';
import Display from '../components/display';
import './MainPage.css';
import { CiMenuBurger } from "react-icons/ci";

function MainPage() {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [orderBy, setOrderBy] = useState('priority');
  const [displayVisible, setDisplayVisible] = useState(false);
  const displayRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers');
        const jsonData = await response.json();
        const { tickets: fetchedTickets } = jsonData;
        setTickets(fetchedTickets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const renderGroupedPage = () => {
    switch (groupBy) {
      case 'status':
        return <StatusPage tickets={tickets} />;
      case 'user':
        return <UserPage tickets={tickets} />;
      case 'priority':
        return <PriorityPage tickets={tickets} />;
      default:
        return null;
    }
  };

  const handleGroupByChange = (value) => {
    setGroupBy(value);
  };

  const handleOrderByChange = (value) => {
    setOrderBy(value);
  };

  const toggleDisplay = () => {
    setDisplayVisible(!displayVisible);
  };

  const handleClickOutside = (event) => {
    if (displayVisible && displayRef.current && !displayRef.current.contains(event.target)) {
      setDisplayVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [displayVisible]);

  return (
    <>
      <div onClick={toggleDisplay} className="display">
       <span><CiMenuBurger/></span> Display
      </div>
      
      <div className='content-body'>
      {displayVisible && (
        <div ref={displayRef} className='appear-content'>
          <Display onGroupByChange={handleGroupByChange} onOrderByChange={handleOrderByChange} className="display-component"/>
        </div>
      )}
        {renderGroupedPage()}
      </div>
    </>
  );
}

export default MainPage;
