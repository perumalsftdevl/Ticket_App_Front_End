"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;

  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("submit");

    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch("http://localhost:8081/api/update_tickets", {
        method: "PUT",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json", // Correct format for setting the header
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create Ticket");
      } else {
        router.push("/");
        router.refresh();
      }
    } else {
      const res = await fetch("http://localhost:8081/api/add_tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json", // Correct format for setting the header
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create Ticket");
      } else {
        router.push("/");
        router.refresh();
      }
    }
  };

  const StartingTicketData = {
    title: "",
    description: "",
    category: "Hardware Problem",
    priority: 1,
    progress: 0,
    status: "not start",
  };

  if (EDITMODE) {
    StartingTicketData["title"] = ticket.title;
    StartingTicketData["description"] = ticket.description;
    StartingTicketData["category"] = ticket.category;
    StartingTicketData["priority"] = ticket.priority;
    StartingTicketData["progress"] = ticket.progress;
    StartingTicketData["status"] = ticket.status;
    StartingTicketData["active"] = ticket.active;
    StartingTicketData["id"] = ticket._id;
  }
  const [formData, setFormData] = useState(StartingTicketData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2 "
        method="post"
        onSubmit={handleSubmit}
      >
        <h3> {EDITMODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>

        <label>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        <label>Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          row="5"
        ></textarea>

        <label>Category</label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            id="priority"
            name="priority"
            type="radio"
            value={1}
            onChange={handleChange}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority"
            name="priority"
            type="radio"
            value={2}
            onChange={handleChange}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority"
            name="priority"
            type="radio"
            value={3}
            onChange={handleChange}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority"
            name="priority"
            type="radio"
            value={4}
            onChange={handleChange}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority"
            name="priority"
            type="radio"
            value={5}
            onChange={handleChange}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>

        <input
          type="range"
          id="progress"
          name="progress"
          onChange={handleChange}
          required={true}
          value={formData.progress}
          min="0"
          max="100"
        />
        <label>Status</label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <input
          type="submit"
          className="btn"
          value={EDITMODE ? "Update  Ticket" : "Create  Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
