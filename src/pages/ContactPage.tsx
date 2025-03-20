import { FC } from "react";
import ContactList from "../components/ContactList"; // Adjust the path as needed
import Navbar from "../components/Navbar";

const ContactsPage: FC = () => {
    return (
        <>
            <Navbar />
            <ContactList handleInfoClick={(contact) => console.log(contact)} />
        </>
    );
};

export default ContactsPage;
