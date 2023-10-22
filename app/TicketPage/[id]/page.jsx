import TicketForm from "../../(components)/TicketForm";

const getTicketById = async (id) => {
  try {
    let response = await fetch(
      `http://localhost:8081/api/get_tickets?id=${id}`,
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
      let data = await response.json();
      console.log("data.record", data);
      return data;
    } else {
      console.error("Failed to fetch data.");
    }
  } catch (error) {}
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateTicketDate = {};

  if (EDITMODE) {
    updateTicketDate = await getTicketById(params.id);
    updateTicketDate = updateTicketDate.record;
    console.log(updateTicketDate);
  } else {
    updateTicketDate = {
      _id: "new",
    };
  }
  return <TicketForm ticket={updateTicketDate} />;
};

export default TicketPage;
