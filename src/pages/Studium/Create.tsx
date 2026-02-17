import { useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  onAddStadium: (stadium: any) => void;
  onUpdateStadium: (stadium: any) => void;
  stadium?: any | null;
}

import { useData } from "../../context/DataContext";

export default function Create({ isOpen, closeModal, onAddStadium, onUpdateStadium, stadium }: Props) {
  const { addActivity, incrementStat } = useData();
  const [form, setForm] = useState({
    name: "",
    address: "",
    cityId: "1",
    countryId: "1",
    capacity: "",
    constructionYear: "",
    description: "",
    zones: [
      {
        name: "",
        capacity: "",
        description: "",
      },
    ],
  });

  useEffect(() => {
    if (stadium) {
      setForm({
        name: stadium.name,
        address: stadium.address,
        cityId: cityOptions.find(c => c.label === stadium.city)?.value || "1",
        countryId: countryOptions.find(c => c.label === stadium.country)?.value || "1",
        capacity: stadium.capacity.toString(),
        constructionYear: stadium.constructionYear.toString(),
        description: stadium.description,
        zones: stadium.seatingCategories.map((cat: string) => ({
          name: cat,
          capacity: "",
          description: "",
        })),
      });
    } else {
      setForm({
        name: "",
        address: "",
        cityId: "1",
        countryId: "1",
        capacity: "",
        constructionYear: "",
        description: "",
        zones: [{ name: "", capacity: "", description: "" }],
      });
    }
  }, [stadium, isOpen]);

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleZoneChange = (index: number, field: string, value: any) => {
    const updatedZones = [...form.zones];
    updatedZones[index] = { ...updatedZones[index], [field]: value };
    setForm({ ...form, zones: updatedZones });
  };

  const addZone = () => {
    setForm({
      ...form,
      zones: [...form.zones, { name: "", capacity: "", description: "" }],
    });
  };

  const removeZone = (index: number) => {
    const updatedZones = form.zones.filter((_, i) => i !== index);
    setForm({ ...form, zones: updatedZones });
  };

  const handleSubmit = () => {
    if (!form.name || !form.capacity) return;

    const stadiumData = {
      id: stadium ? stadium.id : Date.now().toString(),
      name: form.name,
      address: form.address,
      city: cityOptions.find(c => c.value === form.cityId)?.label || "Unknown City",
      country: countryOptions.find(c => c.value === form.countryId)?.label || "Unknown Country",
      capacity: parseInt(form.capacity),
      constructionYear: parseInt(form.constructionYear) || new Date().getFullYear(),
      description: form.description,
      status: stadium ? stadium.status : ("Active" as const),
      seatingCategories: form.zones.filter(z => z.name).map(z => z.name),
    };

    if (stadium) {
      onUpdateStadium(stadiumData);
      addActivity("info", `Stadium '${form.name}' technical details updated`);
    } else {
      onAddStadium(stadiumData);
      addActivity("add", `New stadium '${form.name}' construction complete`);
      incrementStat("stadiums");
    }

    closeModal();
  };

  const countryOptions = [
    { value: "1", label: "Spain" },
    { value: "2", label: "Morocco" },
    { value: "3", label: "United Kingdom" },
    { value: "4", label: "Germany" },
    { value: "5", label: "France" },
  ];

  const countryToCities: { [key: string]: { value: string; label: string }[] } = {
    "1": [ // Spain
      { value: "es-1", label: "Madrid" },
      { value: "es-2", label: "Barcelona" },
      { value: "es-3", label: "Valencia" },
      { value: "es-4", label: "Seville" },
      { value: "es-5", label: "Bilbao" },
    ],
    "2": [ // Morocco
      { value: "ma-1", label: "Casablanca" },
      { value: "ma-2", label: "Rabat" },
      { value: "ma-3", label: "Marrakech" },
      { value: "ma-4", label: "Tangier" },
      { value: "ma-5", label: "Agadir" },
    ],
    "3": [ // UK
      { value: "uk-1", label: "London" },
      { value: "uk-2", label: "Manchester" },
      { value: "uk-3", label: "Liverpool" },
      { value: "uk-4", label: "Glasgow" },
      { value: "uk-5", label: "Birmingham" },
    ],
    "4": [ // Germany
      { value: "de-1", label: "Munich" },
      { value: "de-2", label: "Berlin" },
      { value: "de-3", label: "Dortmund" },
      { value: "de-4", label: "Hamburg" },
      { value: "de-5", label: "Frankfurt" },
    ],
    "5": [ // France
      { value: "fr-1", label: "Paris" },
      { value: "fr-2", label: "Marseille" },
      { value: "fr-3", label: "Lyon" },
      { value: "fr-4", label: "Lille" },
      { value: "fr-5", label: "Nice" },
    ],
  };

  const cityOptions = countryToCities[form.countryId] || [];

  useEffect(() => {
    // Reset city if it doesn't belong to the new country
    if (form.countryId && !stadium) {
      const cities = countryToCities[form.countryId] || [];
      if (!cities.find(c => c.value === form.cityId)) {
        handleChange("cityId", "");
      }
    }
  }, [form.countryId]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="w-full max-w-4xl p-0">
      <div className="flex max-h-[90vh] flex-col bg-white dark:bg-gray-900 rounded-2xl">
        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-6 lg:px-10 space-y-6">
          {/* Header */}
          <div>
            <h5 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              {stadium ? "Update Studium" : "Add Studium"}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stadium ? "Modify the venue technical details." : "Fill the information below to create a new studium."}
            </p>
          </div>

          {/* Main Fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label>Studium Name</Label>
              <Input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div>
              <Label>Address</Label>
              <Input
                type="text"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            <div>
              <Label>Country</Label>
              <Select
                options={countryOptions}
                placeholder="Select country"
                value={form.countryId}
                onChange={(value) => handleChange("countryId", value)}
                className="dark:bg-dark-900"
              />
            </div>

            <div>
              <Label>City</Label>
              <Select
                options={cityOptions}
                placeholder="Select city"
                value={form.cityId}
                onChange={(value) => handleChange("cityId", value)}
                className="dark:bg-dark-900"
              />
            </div>

            <div>
              <Label>Total Capacity</Label>
              <Input
                type="number"
                value={form.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
              />
            </div>

            <div>
              <Label>Construction Year</Label>
              <Input
                type="number"
                value={form.constructionYear}
                onChange={(e) => handleChange("constructionYear", e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="dark:bg-dark-900 h-24 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          {/* Zones Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h6 className="font-semibold text-gray-800 dark:text-white/90">Zones</h6>
              <Button size="sm" variant="outline" onClick={addZone}>
                + Add Zone
              </Button>
            </div>

            {form.zones.map((zone, index) => (
              <div key={index} className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <Label>Zone Name</Label>
                    <Input
                      type="text"
                      value={zone.name}
                      onChange={(e) => handleZoneChange(index, "name", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Zone Capacity</Label>
                    <Input
                      type="number"
                      value={zone.capacity}
                      onChange={(e) => handleZoneChange(index, "capacity", e.target.value)}
                    />
                  </div>

                  <div className="flex items-end">
                    {form.zones.length > 1 && (
                      <Button size="sm" variant="outline" onClick={() => removeZone(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <Label>Description</Label>
                  <textarea
                    rows={3}
                    value={zone.description}
                    onChange={(e) => handleZoneChange(index, "description", e.target.value)}
                    className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSubmit}>{stadium ? "Update Studium" : "Add Studium"}</Button>
        </div>
      </div>
    </Modal>
  );
}
