import { useState } from "react";
import PeopleList, { Person } from "../components/majors/patientsComponents/PeopleList";
import PersonDetails from "../components/majors/patientsComponents/PersonDetails";


export default function Patients() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showAllInfo, setShowAllInfo] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className={`md:w-1/4 border-r ${sidebarOpen ? "block" : "hidden md:block"}`}>
        <PeopleList
          onSelectPerson={(person: Person) => {
            setSelectedPerson(person);
            setSidebarOpen(false);
          }}
        />
      </div>
      <div className="flex-1 overflow-auto">
        <PersonDetails
          person={selectedPerson}
          showAllInfo={showAllInfo}
          setShowAllInfo={setShowAllInfo}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
    </div>
  );
}
