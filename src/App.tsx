import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactsPage from "./pages/Contacts";
import ChartMapViewer from "./pages/ChartMapViewer";
import ContactForm from "./pages/ContactForm";
import Layout from "./pages/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ContactsPage />} />
          <Route path="/chart-map" element={<ChartMapViewer />} />
          <Route path="/add-contact" element={<ContactForm />} />
          <Route path="/edit-contact/:id" element={<ContactForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
