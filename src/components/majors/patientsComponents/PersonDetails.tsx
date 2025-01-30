
import { ArrowLeft, HeartPulse, LeafyGreen, NotebookTabs, ThermometerSun } from "lucide-react";
import { Button } from "../../buttons/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../../Avatars/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../../cards/Card";
import BloodPressureChart from "../../../features/BloodPressureChart/BloodPressureChart";
import DiagnosticList from "../../../features/DiagnosticList/DiagnosticList";
import LabResults from "../../../features/LabResults/LabResults";


interface Person {
  photo: string;
  name: string;
  dob: string;
  gender: string;
  contact?: string;
  emergencyContact?: string;
  insuranceProvider?: string;
  respiratoryRate?: number | string;
  temperature?: number | string;
  heartRate?: number | string;
}

interface PersonDetailsProps {
  person?: Person | null; // Allow null as a valid type
  showAllInfo: boolean;
  setShowAllInfo: (show: boolean) => void;
  toggleSidebar: () => void;
}

export default function PersonDetails({
  person,
  showAllInfo,
  setShowAllInfo,
  toggleSidebar,
}: PersonDetailsProps) {
  if (!person) {
    return (
      <div className="h-full flex items-center justify-center bg-[#d7eef8] md:bg-transparent">
        <Button variant="outline" className="md:hidden mb-4 flex items-center text-lg rounded-full bg-[#56bbe3] hover:bg-[#2baadc] text-white" onClick={toggleSidebar}>
          <NotebookTabs className="h-9 w-9 mr-2 text-white hover:text-white" />
          <span className="text-white hover:text-white">Select a person</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 pb-[4rem] md:pb-[7.5rem]">
      <div className="flex justify-between items-center">
        <Button variant="outline" className="md:hidden flex items-center gap-3 bg-white" onClick={toggleSidebar}>
          <ArrowLeft className="h-5 w-5" />
          People List
        </Button>
        <Button onClick={() => setShowAllInfo(!showAllInfo)} className="ml-auto text-sm rounded-full">
          {showAllInfo ? "Show Summary" : "Show All Information"}
        </Button>
      </div>

      <div className="flex gap-3 md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 bg-[#d7eef8]">
        <Avatar className="h-20 w-20 ">
          <AvatarImage src={person.photo} alt={person.name} />
          <AvatarFallback>
            {person.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{person.name}</h2>
          <p className="text-gray-500">
            {person.dob} | {person.gender}
          </p>
        </div>
      </div>

      {showAllInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Contact:</strong> {person.contact || "N/A"}
            </p>
            <p>
              <strong>Emergency Contact:</strong> {person.emergencyContact || "N/A"}
            </p>
            <p>
              <strong>Insurance Provider:</strong> {person.insuranceProvider || "N/A"}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Vital Signs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <BloodPressureChart />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-3">
            <div className="bg-[#00b2cb] p-4 rounded-lg bg-opacity-30 shadow-sm flex flex-col justify-between gap-3">
              <div className="flex items-center justify-center w-[4rem] h-[4rem] bg-white rounded-full"><LeafyGreen size={29} className="text-[#00b2cb] text-opacity-40"/></div>
              <div>
                <h4 className="">Respiratory Rate</h4>
                <p className="font-bold">{person.respiratoryRate || "N/A"} bpm</p>
              </div>
              <p>Normal</p>
            </div>

            <div className="bg-[#ff5d00] p-4 rounded-lg bg-opacity-20 shadow-sm flex flex-col justify-between gap-3">
              <div className="flex items-center justify-center w-[4rem] h-[4rem] bg-white rounded-full"><ThermometerSun size={29} className="text-[#ff5d00] text-opacity-40"/></div>
              <div>
                <h4 className="">Temperature</h4>
                <p className="font-bold">{person.temperature || "N/A"} °F</p>
              </div>
              <p>Normal</p>
            </div>
            <div className="bg-red-500 pl-4 py-4 rounded-lg bg-opacity-20 shadow-sm flex flex-col justify-between gap-3">
              <div className="flex items-center justify-center w-[4rem] h-[4rem] bg-white rounded-full"><HeartPulse size={29} className="text-red-500 text-opacity-50"/></div>
              <div>
                <h4 className="">Heart Rate</h4>
                <p className="font-bold">{person.heartRate || "N/A"} bpm</p>
              </div>
              <p className="text-sm">Lower Than Average</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <DiagnosticList />
      <LabResults />
    </div>
  );
}
