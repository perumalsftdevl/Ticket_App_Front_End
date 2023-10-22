import React from "react";
import TicketCard from "./(components)/TicketCard";
import { set } from "mongoose";
import { METHODS } from "http";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      method: "GET",
      "Content-Type": "application/json",
      cache: "no-store",
    });
  } catch (error) {
    // console.log(err);
  }
};

async function Dashboard() {
  const { tickets } = await getTickets();
  console.log();
  const UniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5 ">
      <div>
        {tickets &&
          UniqueCategories?.map((UniqueCategories, categoryIndex) => {
            <div key={categoryIndex} className="mb-4">
              <h2>{UniqueCategories}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
                {tickets
                  .filter((tickets) => tickets.category === UniqueCategories)
                  .map((filterTicket, _index) => {
                    <TicketCard id={_index} key={_index} tickets={tickets} />;
                  })}
              </div>
            </div>;
          })}
      </div>
    </div>
  );
}

export default Dashboard;
