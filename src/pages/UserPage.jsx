import React, { useEffect } from "react";
import "./UserPage.css";
import { PiPlusThin } from "react-icons/pi";
import { LiaCircleSolid } from "react-icons/lia";
import { TbCircleDotted } from "react-icons/tb";
import { GrInProgress } from "react-icons/gr";
import {
  PiCellSignalMediumLight,
  PiCellSignalHighLight,
  PiCellSignalFullLight,
} from "react-icons/pi";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { RiFolderWarningFill } from "react-icons/ri";

const UserPage = ({ tickets, users, theme }) => {
  const groupByUser = () => {
    return tickets.reduce((grouped, ticket) => {
      const userId = ticket.userId;
      grouped[userId] = grouped[userId] || [];
      grouped[userId].push(ticket);
      return grouped;
    }, {});
  };

  const getInitials = (name) => {
    const [firstName, lastName] = name.split(" ");
    const firstInitial = firstName ? firstName[0] : "";
    const lastInitial = lastName ? lastName[0] : "";
    return `${firstInitial}${lastInitial}`;
  };

  const findUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  const getTicketCountByUser = (userId) => {
    const userTickets = groupByUser()[userId];
    return userTickets ? userTickets.length : 0;
  };

  const renderUserSections = () => {
    const groupedByUser = groupByUser();

    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    return (
      <div className={`user-container ${theme}`}>
        {Object.entries(groupedByUser).map(([userId, userTickets]) => (
          <div key={userId} className="user-section">
            <div className="status-icon">
              <span
                className="r-name"
                style={{ backgroundColor: getRandomColor() }}
              >
                {getInitials(findUserName(userId))}
              </span>
              <span className="u-name">{findUserName(userId)}</span>
              <span className="ticket-count">
                {" "}
                {getTicketCountByUser(userId)}{" "}
              </span>
            </div>

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
            <span style={{ color: "gray", fontWeight: "100" }}>
              {ticket.id}
            </span>
            <br />

            <div className="user-ticket">
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
              </span>
              <span className="ut-section2">{ticket.title}</span>
              <br />
              <br />
            </div>
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
            <br />
          </div>
        ))
      : null;
  };

  return <div>{renderUserSections()}</div>;
};

export default UserPage;
