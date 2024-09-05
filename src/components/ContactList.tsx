import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteContact } from "../store/contactsSlice";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ContactList: React.FC<{
  setContactsExist: React.Dispatch<React.SetStateAction<boolean>>;
  onEditContact: (contact: any) => void;
}> = ({ setContactsExist, onEditContact }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDeleteClick = (id: string) => {
    dispatch(deleteContact(id));
  };

  useEffect(() => {
    setContactsExist(contacts.length > 0);
  }, [contacts, setContactsExist]);

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <div className="p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-gray-500 text-2xl">
                  {contact.firstName[0]}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {contact.firstName} {contact.lastName}
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Email:</span> {contact.email}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Phone:</span> {contact.phone}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-semibold capitalize ${
                      contact.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {contact.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
            <button
              onClick={() => onEditContact(contact)}
              className="flex items-center bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition ease-in-out duration-300"
            >
              <AiOutlineEdit className="mr-2" />
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(contact.id)}
              className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition ease-in-out duration-300"
            >
              <AiOutlineDelete className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
