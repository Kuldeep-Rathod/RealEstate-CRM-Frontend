import { Link, useLocation } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { FaUpload, FaList } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Location } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 1100);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {isMobile && (
                <button id="hamburger" onClick={() => setShowModal(!showModal)}>
                    <HiMenu />
                </button>
            )}

            <aside
                className="sidebar"
                style={
                    isMobile
                        ? {
                              width: "14rem",
                              height: "100vh",
                              position: "fixed",
                              top: 0,
                              left: showModal ? 0 : "-18rem",
                              zIndex: 10,
                              transition: "all 0.5s ease-in-out",
                          }
                        : {}
                }
            >
                <div className="sidebar-header">
                    <h2>
                        <Link to="/dashboard">Lead Manager</Link>
                    </h2>

                    {isMobile && (
                        <button
                            className="close-btn"
                            onClick={() => setShowModal(!showModal)}
                        >
                            <FaAngleLeft />
                        </button>
                    )}
                </div>

                <ul className="sidebar-menu">
                    <SidebarItem
                        url="/leads"
                        text="All Leads"
                        icon={FaList}
                        location={location}
                    />
                    <SidebarItem
                        url="/upload"
                        text="Upload Leads"
                        icon={FaUpload}
                        location={location}
                    />
                    <SidebarItem
                        url="/logout"
                        text="Logout"
                        icon={IoIosLogOut}
                        location={location}
                    />
                </ul>
            </aside>
        </>
    );
};

const SidebarItem = ({
    url,
    text,
    icon: Icon,
    location,
}: {
    url: string;
    text: string;
    icon: React.ElementType;
    location: Location;
}) => (
    <li className={location.pathname === url ? "active" : ""}>
        <Link to={url}>
            <Icon />
            {text}
        </Link>
    </li>
);

export default Sidebar;
