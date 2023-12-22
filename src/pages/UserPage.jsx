import React from "react";
import "./UserPage.css";

const UserPage = ({ tickets }) => {
  const groupByUser = () => {
    return tickets.reduce((grouped, ticket) => {
      const userId = ticket.userId;
      grouped[userId] = grouped[userId] || [];
      grouped[userId].push(ticket);
      return grouped;
    }, {});
  };

  const renderUserSections = () => {
    const groupedByUser = groupByUser();

    return (
      <div className="user-container">
        {Object.entries(groupedByUser).map(([userId, userTickets]) => (
          <div key={userId} className="user-section">
            <h3>User: {userId}</h3>
            {renderTickets(userTickets)}
          </div>
        ))}
      </div>
    );
  };

  const renderTickets = (tickets) => {
    return tickets
      ? tickets.map((ticket) => (
          <div key={ticket.id} className="ticket">
            <strong></strong> {ticket.id}
            <br />
            <strong></strong> {ticket.title}
            <br />
          </div>
        ))
      : null;
  };

  return <div>{renderUserSections()}</div>;
};

export default UserPage;
