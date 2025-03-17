import { FC } from "react";
import ContactList from "../components/ContactList"; // Adjust the path as needed

const ContactsPage: FC = () => {
    return (
        <>
            <ContactList handleInfoClick={(contact) => console.log(contact)} />
        </>
    );
};

export default ContactsPage;
