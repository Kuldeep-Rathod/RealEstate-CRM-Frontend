import { FC, useState } from "react";
import {
    PhoneCall,
    MessageCircleMore,
    SquarePen,
    Check,
    X,
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

export type ContactCardProps = {
    _id: string;
    name: string;
    phone: string;
    company: string;
    status: string;
    notes: string;
    handleInfoClick: () => void;
    onUpdateNotes: (id: string, newNotes: string) => void;
};

const ContactCard: FC<ContactCardProps> = ({
    _id,
    name,
    phone,
    company,
    status,
    notes,
    onUpdateNotes,
}) => {
    const [leadStatus, setLeadStatus] = useState(status);
    const [showModal, setShowModal] = useState(false);
    const [newNotes, setNewNotes] = useState(notes);
    const [isEditing, setIsEditing] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const handleStatusChange = async (selectedStatus: string) => {
        setLeadStatus(selectedStatus); // Update UI immediately
        setShowStatusDropdown(false); // Hide dropdown after selection

        try {
            const response = await axiosInstance.put(`/leads/${_id}`, {
                status: selectedStatus,
            });

            if (response.status !== 200) {
                throw new Error("Failed to update status");
            }

            console.log("Status updated successfully");
        } catch (error) {
            console.error("Error updating status:", error);
            setLeadStatus(status); // Revert if API fails
        }
    };

    const handleSave = async () => {
        try {
            const response = await axiosInstance.put(`/leads/${_id}`, {
                notes: newNotes,
            });

            if (response.status !== 200) {
                throw new Error("Failed to update notes");
            }

            onUpdateNotes(_id, newNotes);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating notes:", error);
        }
    };

    return (
        <div className="contact-card">
            <div className="contact-details">
                <p className="name">{name}</p>
                <p className="phone">{phone}</p>
                <p className="company">{company}</p>
            </div>
            {/* Status Dropdown */}
            <div
                className="status"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            >
                <p className={`status ${leadStatus}`}>{leadStatus}</p>

                {showStatusDropdown && (
                    <div className="status-dropdown">
                        {["new", "hot", "cold", "warm"].map((option) => (
                            <div
                                key={option}
                                className={`status-option ${option}`}
                                onClick={() => handleStatusChange(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="actions">
                <button
                    className="call"
                    onClick={() => (window.location.href = `tel:${phone}`)}
                >
                    <PhoneCall size={12} />
                </button>

                <button
                    className="message"
                    onClick={() =>
                        window.open(`https://wa.me/${phone}`, "_blank")
                    }
                >
                    <MessageCircleMore size={12} />
                </button>

                <button onClick={() => setShowModal(true)} className="edit">
                    <SquarePen size={12} />
                </button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{isEditing ? "Edit Notes" : "Notes"}</h3>

                        {isEditing ? (
                            <textarea
                                value={newNotes}
                                onChange={(e) => setNewNotes(e.target.value)}
                                rows={3}
                            />
                        ) : (
                            <p>{notes}</p>
                        )}

                        <div className="modal-actions">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="save"
                                    >
                                        <Check size={12} /> Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setNewNotes(notes);
                                        }}
                                        className="cancel"
                                    >
                                        <X size={12} /> Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="edit"
                                    >
                                        <SquarePen size={12} /> Edit
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="close"
                                    >
                                        Close
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactCard;
