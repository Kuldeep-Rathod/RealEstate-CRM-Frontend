import { FC, useState } from "react";
import {
    PhoneCall,
    MessageCircleMore,
    SquarePen,
    Check,
    X,
} from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

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
    const [showModal, setShowModal] = useState(false);
    const [newNotes, setNewNotes] = useState(notes);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/leads/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ notes: newNotes }),
            });

            if (!response.ok) {
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
            <div className="status">
                <p
                    className={`status ${
                        status === "Active" ? "active" : "inactive"
                    }`}
                >
                    {status}
                </p>
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
                        <button onClick={handleSave} className="save">
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
                        <button onClick={() => setIsEditing(true)} className="edit">
                            <SquarePen size={12} /> Edit
                        </button>
                        <button onClick={() => setShowModal(false)} className="close">
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
