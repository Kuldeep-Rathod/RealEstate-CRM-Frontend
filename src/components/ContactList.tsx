import { FC, useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import axiosInstance from "../utils/axiosInstance";

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
    const [selectedTab, setSelectedTab] = useState<"unvisited" | "visited">(
        "unvisited"
    );
    const [statusTab, setStatusTab] = useState<"all" | "new" | "hot" | "cold" | "warm">("all");

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data } = await axiosInstance.get<Contact[]>(`/leads/userLeads`);

                setContacts(
                    data.map((contact) => ({
                        _id: contact._id,
                        name: contact.name,
                        phone: contact.phone,
                        company: contact.company || "Unknown Company",
                        status: contact.status,
                        notes: contact.notes || "",
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

    // Filter contacts based on visited/unvisited
    const filteredContacts = contacts.filter((contact) =>
        selectedTab === "visited"
            ? contact.notes.trim() !== ""
            : contact.notes.trim() === ""
    );

    // Further filter based on status
    const filteredByStatus = filteredContacts.filter((contact) =>
        statusTab === "all" ? true : contact.status === statusTab
    );

    return (
        <div className="contact-list">
            {/* Status Filter Buttons */}
            <div className="status-tabs">
                {["all", "new", "hot", "cold", "warm"].map((status) => (
                    <p
                        key={status}
                        className={`status-tabs ${statusTab === status ? "active" : ""}`}
                        onClick={() => setStatusTab(status as typeof statusTab)}
                    >
                        {status.toUpperCase()}
                    </p>
                ))}
            </div>

            {/* Visited/Unvisited Toggle */}
            <div className="toggle-buttons">
                <button
                    className={`toggle-btn ${selectedTab === "unvisited" ? "active" : ""}`}
                    onClick={() => setSelectedTab("unvisited")}
                >
                    Unvisited
                </button>
                <button
                    className={`toggle-btn ${selectedTab === "visited" ? "active" : ""}`}
                    onClick={() => setSelectedTab("visited")}
                >
                    Visited
                </button>
            </div>

            {loading ? (
                <p className="loading">Loading contacts...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <div className="contact-container">
                    {filteredByStatus.length > 0 ? (
                        filteredByStatus.map((contact) => (
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
