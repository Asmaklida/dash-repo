import { useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import PhotoUpload from "../../components/form/PhotoUpload";
import { useData } from "../../context/DataContext";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  editingItem?: any;
  onSave: (item: any) => void;
}

export default function Create({ isOpen, closeModal, editingItem, onSave }: Props) {
  const { addActivity, incrementStat } = useData();
  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    continent: "",
    stadium: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (editingItem) {
      setForm({
        name: editingItem.name,
        country: editingItem.country,
        city: editingItem.city,
        continent: editingItem.continent,
        stadium: editingItem.stadium,
        description: editingItem.description || "",
        image: editingItem.image || "",
      });
    } else {
      setForm({
        name: "",
        country: "",
        city: "",
        continent: "",
        stadium: "",
        description: "",
        image: "",
      });
    }
  }, [editingItem, isOpen]);

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    onSave(form);
    addActivity(editingItem ? "warning" : "add", `${editingItem ? "Updated" : "Registered"} club '${form.name}'`);
    if (!editingItem) incrementStat("teams");
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="w-full max-w-3xl p-0">
      <div className="flex max-h-[90vh] flex-col bg-white dark:bg-gray-900 rounded-2xl">
        <div className="overflow-y-auto px-6 py-6 lg:px-10 space-y-6">
          <h5 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            {editingItem ? "Edit Club" : "Register Club"}
          </h5>

          <PhotoUpload
            label="Club Crest / Logo"
            value={form.image}
            onChange={(value) => handleChange("image", value)}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label>Club Name</Label>
              <Input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div>
              <Label>Stadium Name</Label>
              <Input
                type="text"
                value={form.stadium}
                onChange={(e) => handleChange("stadium", e.target.value)}
              />
            </div>

            <div>
              <Label>City</Label>
              <Input
                type="text"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>

            <div>
              <Label>Country</Label>
              <Input
                type="text"
                value={form.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />
            </div>

            <div>
              <Label>Continent</Label>
              <Input
                type="text"
                value={form.continent}
                onChange={(e) => handleChange("continent", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Club History / Bio</Label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{editingItem ? "Update Entry" : "Register Team"}</Button>
        </div>
      </div>
    </Modal>
  );
}
