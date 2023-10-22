import { faTicket, faHome, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4 ">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>

      <div>
        <div className="text-default-text">
          <FontAwesomeIcon icon={faUserAlt} className="icon pe-3" />
          Perumalkce2022@gmail.com
        </div>
      </div>
    </nav>
  );
};

export default Nav;
