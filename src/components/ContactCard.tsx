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
        <div className="p-2 shadow-md rounded-lg border w-full max-w-xs mx-auto bg-gray-900 border-gray-700 text-white text-xs">
            <div className="flex items-center justify-between gap-2">
                {/* Contact Details */}
                <div className="flex flex-col text-start">
                    <p className="text-sm font-semibold truncate">{name}</p>
                    <p className="text-gray-300 truncate">{phone}</p>
                    <p className="text-gray-400 truncate">{company}</p>
                    <p
                        className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                            status === "Active" ? "bg-green-600" : "bg-gray-600"
                        }`}
                    >
                        {status}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1">
                    <button
                        className="p-1.5 rounded bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => (window.location.href = `tel:${phone}`)}
                    >
                        <PhoneCall size={12} />
                    </button>

                    <button
                        className="p-1.5 rounded bg-blue-700 text-white hover:bg-blue-800"
                        onClick={() =>
                            window.open(`https://wa.me/${phone}`, "_blank")
                        }
                    >
                        <MessageCircleMore size={12} />
                    </button>

                    <button
                        onClick={() => setShowModal(true)}
                        className="p-1.5 rounded bg-gray-800 text-white hover:bg-gray-900"
                    >
                        <SquarePen size={12} />
                    </button>
                </div>
            </div>

            {/* Modal for Viewing/Editing Notes */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3">
                    <div className="bg-white p-4 rounded-lg shadow-xl text-center w-full max-w-xs">
                        <h3 className="text-sm font-semibold mb-2 text-gray-900">
                            {isEditing ? "Edit Notes" : "Notes"}
                        </h3>

                        {isEditing ? (
                            <textarea
                                value={newNotes}
                                onChange={(e) => setNewNotes(e.target.value)}
                                className="w-full p-2 border rounded text-gray-900 text-xs"
                                rows={3}
                            />
                        ) : (
                            <p className="text-gray-700 text-xs leading-snug">
                                {notes}
                            </p>
                        )}

                        <div className="mt-3 flex justify-center gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-xs flex items-center gap-1"
                                    >
                                        <Check size={12} /> Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setNewNotes(notes);
                                        }}
                                        className="px-3 py-1 rounded bg-gray-400 text-white hover:bg-gray-500 text-xs flex items-center gap-1"
                                    >
                                        <X size={12} /> Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs flex items-center gap-1"
                                    >
                                        <SquarePen size={12} /> Edit
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-3 py-1 rounded bg-black text-white hover:bg-gray-900 text-xs"
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
