import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContactList from "../components/ContactList";
import warning from "../assets/icons/warning.svg";

const ContactsPage: React.FC = () => {
  const [contactsExist, setContactsExist] = useState(false);
  const navigate = useNavigate();

  const handleCreateContactClick = () => {
    navigate("/add-contact");
  };

  const handleEditContactClick = (contact: any) => {
    navigate(`/edit-contact/${contact.id}`);
  };

  return (
    <div className="mx-auto bg-gray-100 min-h-screen p-8">
      <div className="flex mt-4 flex-col items-center">
        <button
          onClick={handleCreateContactClick}
          className="bg-blue-500 text-white py-2 px-5 rounded-lg mb-4"
        >
          Create Contact
        </button>

        {!contactsExist && (
          <div className="mt-3 mb-4 w-auto lg:w-max p-4 bg-red-100 rounded flex items-center">
            <img className="w-6 h-6 mr-2" src={warning} alt="Info" />
            <p>
              No contacts found. Please add a contact using the "Create Contact"
              button.
            </p>
          </div>
        )}
      </div>
      <ContactList
        setContactsExist={setContactsExist}
        onEditContact={handleEditContactClick}
      />
    </div>
  );
};

export default ContactsPage;
