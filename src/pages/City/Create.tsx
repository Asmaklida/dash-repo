import { useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import { useData } from "../../context/DataContext";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  editingItem?: any;
  onSave: (item: any) => void;
}

const Create: React.FC<Props> = ({ isOpen, closeModal, editingItem, onSave }) => {
  const { addActivity } = useData();
  const [form, setForm] = useState({
    name: "",
    country: "",
    continentName: "AFRICA",
  });

  useEffect(() => {
    if (editingItem) {
      setForm({
        name: editingItem.name,
        country: editingItem.country,
        continentName: editingItem.continentName,
      });
    } else {
      setForm({
        name: "",
        country: "",
        continentName: "AFRICA",
      });
    }
  }, [editingItem, isOpen]);

  const handleSubmit = () => {
    onSave(form);
    addActivity(editingItem ? "info" : "add", `${editingItem ? "Updated" : "Registered"} city '${form.name}'`);
  };

  const continentOptions = [
    { value: "AFRICA", label: "Africa" },
    { value: "EUROPE", label: "Europe" },
    { value: "ASIA", label: "Asia" },
    { value: "NORTH AMERICA", label: "North America" },
    { value: "SOUTH AMERICA", label: "South America" },
    { value: "OCEANIA", label: "Oceania" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-[600px] p-0"
    >
      <div className="flex max-h-[90vh] flex-col bg-white dark:bg-gray-900 rounded-2xl">
        <div className="overflow-y-auto px-6 py-6 lg:px-10 space-y-6">
          <h5 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            {editingItem ? "Edit Metropolitan Hub" : "Register New City"}
          </h5>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label>City Name</Label>
              <Input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Continent</Label>
              <Select
                options={continentOptions}
                value={form.continentName}
                placeholder="Select continent"
                onChange={(value) => setForm({ ...form, continentName: value })}
                className="dark:bg-dark-900"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSubmit}>{editingItem ? "Update Hub" : "Register City"}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default Create;
