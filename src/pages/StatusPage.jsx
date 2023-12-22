import React from "react";
import "./StatusPage.css";

const StatusPage = ({ tickets }) => {
  const groupByStatus = () => {
    return tickets.reduce((grouped, ticket) => {
      const status = ticket.status;
      grouped[status] = grouped[status] || [];
      grouped[status].push(ticket);
      return grouped;
    }, {});
  };

  const renderStatusSections = () => {
    const groupedByStatus = groupByStatus();

    return (
      <div className="status-container">
        <div className="status-section">
          <h3>Backlog</h3>
          {renderTickets(groupedByStatus["Backlog"])}
        </div>
        <div className="status-section">
          <h3>Todo</h3>
          {renderTickets(groupedByStatus["Todo"])}
        </div>
        <div className="status-section">
          <h3>In Progress</h3>
          {renderTickets(groupedByStatus["In progress"])}
        </div>
        <div className="status-section">
          <h3>Done</h3>
          {renderTickets(groupedByStatus["Done"])}
        </div>
        <div className="status-section">
          <h3>Cancelled</h3>
          {renderTickets(groupedByStatus["Cancelled"])}
        </div>
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

  return <div>{renderStatusSections()}</div>;
};

export default StatusPage;
