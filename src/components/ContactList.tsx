import { FC, useEffect, useState } from "react";
import ContactCard from "./ContactCard";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export type Contact = {
    _id: string;
    name: string;
    phone: string;
    company: string;
    status: string;
    notes: string;
};

type ContactListProps = {
    handleInfoClick: (contact: Contact) => void;
};

const ContactList: FC<ContactListProps> = ({ handleInfoClick }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${SERVER_URL}/leads/`);
                if (!response.ok) throw new Error("Failed to fetch contacts");

                const data: Contact[] = await response.json();

                setContacts(
                    data.map((contact) => ({
                        _id: contact._id,
                        name: contact.name,
                        phone: contact.phone,
                        company: contact.company || "Unknown Company",
                        status: contact.status,
                        notes: contact.notes || "No notes available",
                    }))
                );
            } catch (err) {
                setError("Failed to load contacts. Please try again.");
                console.error("Error fetching contacts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const handleUpdateNotes = (id: string, newNotes: string) => {
        setContacts((prevContacts) =>
            prevContacts.map((contact) =>
                contact._id === id ? { ...contact, notes: newNotes } : contact
            )
        );
    };

    return (
        <div className="contact-list">
            <h2 className="heading">Contact List</h2>

            {loading ? (
                <p className="loading">Loading contacts...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <div className="container">
                    {contacts.length > 0 ? (
                        contacts.map((contact) => (
                            <ContactCard
                                key={contact._id}
                                {...contact}
                                handleInfoClick={() => handleInfoClick(contact)}
                                onUpdateNotes={handleUpdateNotes}
                            />
                        ))
                    ) : (
                        <p className="empty">No contacts found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ContactList;
