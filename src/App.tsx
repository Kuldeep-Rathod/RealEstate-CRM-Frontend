import "./App.css";
import ContactList, { Contact } from "./components/ContactList";

const App = () => {
    const handleInfoClick = (contact: Contact) => {
        console.log("Clicked Contact:", contact);
    };

    return <ContactList handleInfoClick={handleInfoClick} />;
};

export default App;
