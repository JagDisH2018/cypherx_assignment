import React from "react";
import "./PriorityPage.css";
import { PiPlusThin } from "react-icons/pi";
import { PiDotsThreeLight } from "react-icons/pi";
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

const PriorityPage = ({ tickets, user, theme }) => {
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

    const countByPriority = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    };

    // Count the number of tickets for each priority
    Object.keys(countByPriority).forEach((priority) => {
      if (groupedByPriority[priority]) {
        countByPriority[priority] = groupedByPriority[priority].length;
      }
    });

    return (
      <div className={`priority-container ${theme}`}>
        <div className="priority-section">
          <div className="plusDot">
            <h3>
              No Priority 
              <span className="count">{countByPriority[0]}</span>
              <PiPlusThin className="space"/> <PiDotsThreeLight />
            </h3>
            {renderTickets(groupedByPriority[0])}
          </div>
        </div>
        <div className="priority-section">
          <h3>
            Low 
            <span className="count">{countByPriority[1]}</span>
            <PiPlusThin className="space" /> <PiDotsThreeLight />
          </h3>
          {renderTickets(groupedByPriority[1])}
        </div>
        <div className="priority-section">
          <h3>
            Medium 
            <span className="count">{countByPriority[2]}</span>
            <PiPlusThin className="space"/> <PiDotsThreeLight />
          </h3>
          {renderTickets(groupedByPriority[2])}
        </div>
        <div className="priority-section">
          <h3>
            High 
            <span className="count">{countByPriority[3]}</span>
            <PiPlusThin className="space"/> <PiDotsThreeLight />
          </h3>
          {renderTickets(groupedByPriority[3])}
        </div>
        <div className="priority-section">
          <h3>
            Urgent 
            <span className="count">{countByPriority[4]}</span>
            <PiPlusThin className="space"/> <PiDotsThreeLight />
          </h3>
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
            </span>{" "}
            {ticket.title}
            <br />
            <br />
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
