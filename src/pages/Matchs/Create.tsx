import { useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import DatePicker from "../../components/form/date-picker";
import { useData } from "../../context/DataContext";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  editingItem?: any;
  onSave: (item: any) => void;
}

interface Zone {
  id: string;
  name: string;
}

interface Stadium {
  id: string;
  name: string;
  zones: Zone[];
}

export default function Create({ isOpen, closeModal, editingItem, onSave }: Props) {
  const { addActivity } = useData();
  const [form, setForm] = useState({
    dateTime: "",
    status: "SCHEDULED",
    matchNumber: "",
    attendance: 0,
    referee: "",
    stadiumName: "",
    homeTeam: "",
    awayTeam: "",
    competition: "",
    score: "",
    zonePricings: [] as { zoneId: string; price: number; availableSeats: number; isActive: boolean }[],
  });

  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);

  // Fetch stadiums (fake for now)
  useEffect(() => {
    setStadiums([
      { id: "s1", name: "Wembley Stadium", zones: [{ id: "z1", name: "VIP" }, { id: "z2", name: "Regular" }] },
      { id: "s2", name: "Camp Nou", zones: [{ id: "z3", name: "Premium" }, { id: "z4", name: "Standard" }] },
    ]);
  }, []);

  useEffect(() => {
    if (editingItem) {
      setForm({
        dateTime: editingItem.dateTime,
        status: editingItem.status,
        matchNumber: editingItem.matchNumber,
        attendance: editingItem.attendance,
        referee: editingItem.referee,
        stadiumName: editingItem.stadiumName,
        homeTeam: editingItem.homeTeam,
        awayTeam: editingItem.awayTeam,
        competition: editingItem.competition,
        score: editingItem.score || "",
        zonePricings: editingItem.zonePricings || [],
      });
      const stadium = stadiums.find(s => s.name === editingItem.stadiumName);
      setZones(stadium?.zones || []);
    } else {
      setForm({
        dateTime: "",
        status: "SCHEDULED",
        matchNumber: "",
        attendance: 0,
        referee: "",
        stadiumName: "",
        homeTeam: "",
        awayTeam: "",
        competition: "",
        score: "",
        zonePricings: [],
      });
      setZones([]);
    }
  }, [editingItem, isOpen, stadiums]);

  const handleStadiumChange = (stadiumId: string) => {
    const stadium = stadiums.find((s) => s.id === stadiumId);
    setZones(stadium?.zones || []);
    setForm({
      ...form,
      stadiumName: stadium?.name || "",
      zonePricings: stadium?.zones.map((z) => ({ zoneId: z.id, price: 0, availableSeats: 0, isActive: true })) || [],
    });
  };

  const handleZonePriceChange = (zoneId: string, field: "price" | "availableSeats" | "isActive", value: any) => {
    const updated = form.zonePricings.map((z) => (z.zoneId === zoneId ? { ...z, [field]: value } : z));
    setForm({ ...form, zonePricings: updated });
  };

  const handleSubmit = () => {
    onSave(form);
    addActivity(editingItem ? "info" : "add", `${editingItem ? "Updated" : "Scheduled"} match between ${form.homeTeam} and ${form.awayTeam}`);
  };

  const statusOptions = [
    { value: "SCHEDULED", label: "Scheduled" },
    { value: "LIVE", label: "Live" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELED", label: "Canceled" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="w-full max-w-4xl p-0">
      <div className="flex max-h-[90vh] flex-col bg-white dark:bg-gray-900 rounded-2xl">
        <div className="overflow-y-auto px-6 py-6 lg:px-10 space-y-6">
          <h5 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            {editingItem ? "Edit Match Fixture" : "Schedule New Match"}
          </h5>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label>Date & Time</Label>
              <DatePicker
                id="dateTime"
                placeholder="Select Date & Time"
                value={form.dateTime}
                onChange={(_, dateString) => setForm({ ...form, dateTime: dateString })}
              />
            </div>

            <div>
              <Label>Status</Label>
              <Select
                options={statusOptions}
                value={form.status}
                placeholder="Select Status"
                onChange={(value) => setForm({ ...form, status: value })}
                className="dark:bg-dark-900"
              />
            </div>

            <div>
              <Label>Match Number</Label>
              <Input type="text" value={form.matchNumber} onChange={(e) => setForm({ ...form, matchNumber: e.target.value })} />
            </div>

            <div>
              <Label>Referee</Label>
              <Input type="text" value={form.referee} onChange={(e) => setForm({ ...form, referee: e.target.value })} />
            </div>

            <div>
              <Label>Stadium</Label>
              <Select
                options={stadiums.map((s) => ({ value: s.id, label: s.name }))}
                value={stadiums.find(s => s.name === form.stadiumName)?.id || ""}
                placeholder="Select Stadium"
                onChange={handleStadiumChange}
                className="dark:bg-dark-900"
              />
            </div>

            <div>
              <Label>Competition</Label>
              <Input type="text" value={form.competition} onChange={(e) => setForm({ ...form, competition: e.target.value })} />
            </div>

            <div>
              <Label>Home Team</Label>
              <Input type="text" value={form.homeTeam} onChange={(e) => setForm({ ...form, homeTeam: e.target.value })} />
            </div>

            <div>
              <Label>Away Team</Label>
              <Input type="text" value={form.awayTeam} onChange={(e) => setForm({ ...form, awayTeam: e.target.value })} />
            </div>

            <div>
              <Label>Score (e.g. 2 - 1)</Label>
              <Input type="text" value={form.score} placeholder="0 - 0" onChange={(e) => setForm({ ...form, score: e.target.value })} />
            </div>
          </div>

          {/* Zone Pricing */}
          {zones.length > 0 && (
            <div className="space-y-4 mt-4">
              <h6 className="font-semibold text-gray-800 dark:text-white/90">Zone Pricing & Allocation</h6>
              {form.zonePricings.map((z) => {
                const zone = zones.find((zone) => zone.id === z.zoneId);
                return (
                  <div key={z.zoneId} className="grid grid-cols-1 gap-4 md:grid-cols-3 p-4 border border-gray-200 rounded-xl dark:border-gray-700">
                    <div>
                      <Label>Zone</Label>
                      <Input type="text" value={zone?.name || ""} disabled />
                    </div>
                    <div>
                      <Label>Price ($)</Label>
                      <Input type="number" value={z.price} onChange={(e) => handleZonePriceChange(z.zoneId, "price", Number(e.target.value))} />
                    </div>
                    <div>
                      <Label>Available Seats</Label>
                      <Input type="number" value={z.availableSeats} onChange={(e) => handleZonePriceChange(z.zoneId, "availableSeats", Number(e.target.value))} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSubmit}>{editingItem ? "Update Fixture" : "Schedule Match"}</Button>
        </div>
      </div>
    </Modal>
  );
}
