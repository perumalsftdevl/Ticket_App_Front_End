"use client";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const DeleteBlock = ({ id }) => {
  const router = useRouter();

  const deleteTicked = async () => {
    const res = await fetch(
      `http://localhost:8081/api/delete_tickets?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicked}
    />
  );
};

export default DeleteBlock;
