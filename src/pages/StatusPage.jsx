import React from "react";
import "./StatusPage.css";
import { PiPlusThin } from "react-icons/pi";
import { PiDotsThreeLight } from "react-icons/pi";

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
          <span>Backlog</span><span className="extra-icon"><PiPlusThin/> <PiDotsThreeLight/></span>
          {renderTickets(groupedByStatus["Backlog"])}
        </div>
        <div className="status-section">
          <span>Todo</span><span className="extra-icon"><PiPlusThin/> <PiDotsThreeLight/></span>
          {renderTickets(groupedByStatus["Todo"])}
        </div>
        <div className="status-section">
          <span>In Progress</span><span className="extra-icon"><PiPlusThin/> <PiDotsThreeLight/></span>
          {renderTickets(groupedByStatus["In progress"])}
        </div>
        <div className="status-section">
          <span>Done</span><span className="extra-icon"><PiPlusThin/> <PiDotsThreeLight/></span>
          {renderTickets(groupedByStatus["Done"])}
        </div>
        <div className="status-section">
          <span>Cancelled</span><span className="extra-icon"><PiPlusThin/> <PiDotsThreeLight/></span>
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
