import React from "react";
import "./StatusPage.css";
import { PiPlusThin } from "react-icons/pi";
import { PiDotsThreeLight } from "react-icons/pi";
import { LiaCircleSolid } from "react-icons/lia";
import { TbCircleDotted } from "react-icons/tb";
import { GrInProgress } from "react-icons/gr";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import {
  PiCellSignalMediumLight,
  PiCellSignalHighLight,
  PiCellSignalFullLight,
} from "react-icons/pi";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { RiFolderWarningFill } from "react-icons/ri";

const StatusPage = ({ tickets, user, theme }) => {
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
      <div className={`status-container ${theme}`}>
        <div className="status-section">
          <span className="icon">
            <TbCircleDotted />
          </span>
          <span className="title"> Backlog</span>
          <span className="extra-icon">
            <PiPlusThin /> <PiDotsThreeLight />
          </span>
          {renderTickets(groupedByStatus["Backlog"])}
        </div>
        <div className="status-section">
          <span style={{ paddingTop: "2%" }} className="icon">
            <LiaCircleSolid />
          </span>
          <span className="title"> Todo</span>
          <span className="extra-icon">
            <PiPlusThin /> <PiDotsThreeLight />
          </span>
          {renderTickets(groupedByStatus["Todo"])}
        </div>
        <div className="status-section">
          <span className="icon">
            <GrInProgress color="yellow" />
          </span>
          <span className="title">In Progress</span>
          <span className="extra-icon">
            <PiPlusThin /> <PiDotsThreeLight />
          </span>
          {renderTickets(groupedByStatus["In progress"])}
        </div>
        <div className="status-section">
          <span className="icon">
            <IoCheckmarkDoneCircle color="blue" />
          </span>
          <span className="title"> Done</span>
          <span className="extra-icon">
            <PiPlusThin /> <PiDotsThreeLight />
          </span>
          {renderTickets(groupedByStatus["Done"])}
        </div>
        <div className="status-section">
          <span className="icon">
            <MdCancel color="red" />
          </span>
          <span className="title"> Cancelled</span>
          <span className="extra-icon">
            <PiPlusThin /> <PiDotsThreeLight />
          </span>
          {renderTickets(groupedByStatus["Cancelled"])}
        </div>
      </div>
    );
  };

  const renderTickets = (tickets) => {
    return tickets
      ? tickets.map((ticket) => (
          <div key={ticket.id} className="ticket">
            <div>
              <strong
                style={{ fontSize: "1rem", color: "#8D8D8D" }}
                className="ticket-id"
              >
                {ticket.id}
              </strong>
              {/* ?   <span className="profile-status">{getUser(ticket.userId)}</span> */}
            </div>
            <br />
            <span>{ticket.title}</span>
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

  return <div>{renderStatusSections()}</div>;
};

export default StatusPage;
