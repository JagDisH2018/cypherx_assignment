import React, { useState, useEffect, useRef } from 'react';
import StatusPage from './StatusPage';
import UserPage from './UserPage';
import PriorityPage from './PriorityPage';
import Display from '../components/display';
import './MainPage.css';
import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiMoon, HiSun } from "react-icons/hi";

function MainPage() {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [orderBy, setOrderBy] = useState('priority');
  const [displayVisible, setDisplayVisible] = useState(false);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [user, setUser] = useState(null); // Add user state
  const displayRef = useRef(null);

  const [arrowIcon, setArrowIcon] = useState(<IoIosArrowDown />);
  const themeIcon = theme === 'light' ? <HiMoon /> : <HiSun />;
  // const pageBackgroundColor = theme === 'light' ? 'white' : 'black';

  const toggleDisplay = () => {
    setDisplayVisible((prevVisible) => {
      const newVisibility = !prevVisible;
      setArrowIcon(newVisibility ? <IoIosArrowUp /> : <IoIosArrowDown />);
      return newVisibility;
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers');
        const jsonData = await response.json();
        const { tickets: fetchedTickets, users: fetchedUser } = jsonData;
        setTickets(fetchedTickets);
        console.log(tickets);
        setUser(fetchedUser);
        console.log(user);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(()=>{
    console.log(tickets);
    console.log(user);
  },[user]);

  const renderGroupedPage = () => {
    switch (groupBy) {
      case 'status':
        return <StatusPage tickets={tickets} users={user} theme={theme} />;
      case 'user':
        return <UserPage tickets={tickets} users={user} theme={theme} />;
      case 'priority':
        return <PriorityPage tickets={tickets} users={user} theme={theme} />;
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

  const handleClickOutside = (event) => {
    if (displayVisible && displayRef.current && !displayRef.current.contains(event.target)) {
      setDisplayVisible(false);
      setArrowIcon(<IoIosArrowDown />);
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
      <div style={{ display: "flex"}}>
        <div onClick={toggleDisplay} className="display">
          <span><CiMenuBurger style={{ marginRight: "10px" }} /></span> Display<span style={{ marginLeft: "12px" }}>{arrowIcon}</span>
        </div>
        <span onClick={toggleTheme} className='background-change'>{themeIcon}</span>
      </div>
      <div className={`content-body ${theme}`}>
        {displayVisible && (
          <div ref={displayRef} className='appear-content'>
            <Display onGroupByChange={handleGroupByChange} onOrderByChange={handleOrderByChange} className="display-component" />
          </div>
        )}
        {renderGroupedPage()}
      </div>
    </>
  );
}

export default MainPage;
