"use client";
import React, { useEffect, useState } from "react";
import TicketCard from "./(components)/TicketCard";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/get_all_tickets",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // You can add other headers here
            },
            cache: "no-store",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("data.record", data.record);
          setTickets(data.record);
          setLoading(false);
        } else {
          console.error("Failed to fetch data.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTickets();
  }, []);

  console.log("tickets", tickets);
  const UniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-5">
      <div>
        {tickets &&
          tickets.length > 0 &&
          UniqueCategories?.map((UniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{UniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === UniqueCategory)
                  .map((filterTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filterTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Dashboard;
