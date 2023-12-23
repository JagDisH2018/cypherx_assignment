import React from "react";
import "./PriorityPage.css";
import {
  PiCellSignalMediumLight,
  PiCellSignalHighLight,
  PiCellSignalFullLight,
} from "react-icons/pi";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { RiFolderWarningFill } from "react-icons/ri";
import { LiaCircleSolid } from "react-icons/lia";
import { TbCircleDotted } from "react-icons/tb";
import { GrInProgress } from "react-icons/gr";

const PriorityPage = ({ tickets,user,theme }) => {
  const groupByPriority = () => {
    return tickets.reduce((grouped, ticket) => {
      const priority = ticket.priority;
      grouped[priority] = grouped[priority] || [];
      grouped[priority].push(ticket);
      return grouped;
    }, {});
  };
  
  /*const getTicketCountByUser = (userId) => {
    const userTickets = groupByUser()[userId];
    return userTickets ? userTickets.length : 0;
  };
  const groupByUser = () => {
    return tickets.reduce((grouped, ticket) => {
      const userId = ticket.userId;
      grouped[userId] = grouped[userId] || [];
      grouped[userId].push(ticket);
      return grouped;
    }, {});
  };
  */

  const renderPrioritySections = () => {
    const groupedByPriority = groupByPriority();

    return (
      <div className={`priority-container ${theme}`}>
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
            <span className="ut-section1">
                {ticket.status === "In progress" ? (
                  <GrInProgress color="yellow" />
                ) : ticket.status === "Todo" ? (
                  <LiaCircleSolid />
                ) : ticket.status === "Backlog" ? (
                  <TbCircleDotted color="red" />
                ) : (
                  <div></div>
                )}
              </span> {ticket.title}
            <br />
            <br/>
            <div className="tag">
              <div className="iconTower">
                {ticket.priority === 0 ? (
                  <IoEllipsisHorizontalSharp />
                ) : ticket.priority === 1 ? (
                  <PiCellSignalMediumLight />
                ) : ticket.priority === 2 ? (
                  <PiCellSignalHighLight />
                ) : ticket.priority === 3 ? (
                  <PiCellSignalFullLight />
                ) : ticket.priority === 4 ? (
                  <RiFolderWarningFill color="orange" />
                ) : (
                  <div></div>
                )}
              </div>
              <div className="tagName">
                <FaCircle /> {ticket.tag}
              </div>
            </div>
          </div>
          
        ))
      : null;
  };

  return <div>{renderPrioritySections()}</div>;
};

export default PriorityPage;
