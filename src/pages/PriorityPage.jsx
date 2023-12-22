import React from "react";
import "./PriorityPage.css";

const PriorityPage = ({ tickets }) => {
  const groupByPriority = () => {
    return tickets.reduce((grouped, ticket) => {
      const priority = ticket.priority;
      grouped[priority] = grouped[priority] || [];
      grouped[priority].push(ticket);
      return grouped;
    }, {});
  };

  const renderPrioritySections = () => {
    const groupedByPriority = groupByPriority();

    return (
      <div className="priority-container">
        <div className="priority-section">
          <h3>No Priority</h3>
          {renderTickets(groupedByPriority[0])}
        </div>
        <div className="priority-section">
          <h3>Low</h3>
          {renderTickets(groupedByPriority[1])}
        </div>
        <div className="priority-section">
          <h3>Medium</h3>
          {renderTickets(groupedByPriority[2])}
        </div>
        <div className="priority-section">
          <h3>High</h3>
          {renderTickets(groupedByPriority[3])}
        </div>
        <div className="priority-section">
          <h3>Urgent</h3>
          {renderTickets(groupedByPriority[4])}
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

  return <div>{renderPrioritySections()}</div>;
};

export default PriorityPage;
