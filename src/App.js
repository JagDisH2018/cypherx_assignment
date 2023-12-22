import React, { useState, useEffect } from 'react';
import StatusPage from './pages/StatusPage';
import UserPage from './pages/UserPage';
import PriorityPage from './pages/PriorityPage';

function App() {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status');

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

  return (
    <div>

      <div>
        <label>
          Group By:
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>

      <div>
        {renderGroupedPage()}
      </div>
    </div>
  );
}

export default App;
