import { useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
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
  const { addActivity } = useData();
  const [form, setForm] = useState({
    name: "",
    abbreviation: "",
    teamType: "NATIONAL",
    scope: "NATIONAL",
    country: "",
    continent: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (editingItem) {
      setForm({
        name: editingItem.name,
        abbreviation: editingItem.abbreviation,
        teamType: editingItem.teamType,
        scope: editingItem.scope,
        country: editingItem.country,
        continent: editingItem.continent,
        description: editingItem.description || "",
        image: editingItem.image || "",
      });
    } else {
      setForm({
        name: "",
        abbreviation: "",
        teamType: "NATIONAL",
        scope: "NATIONAL",
        country: "",
        continent: "",
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
    addActivity(editingItem ? "info" : "add", `${editingItem ? "Updated" : "Enlisted"} national squad '${form.name}'`);
  };

  const teamTypeOptions = [
    { value: "NATIONAL", label: "National" },
    { value: "CLUB", label: "Club" },
  ];

  const scopeOptions = [
    { value: "NATIONAL", label: "National" },
    { value: "CONTINENTAL", label: "Continental" },
    { value: "GLOBAL", label: "Global" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="w-full max-w-3xl p-0">
      <div className="flex max-h-[90vh] flex-col bg-white dark:bg-gray-900 rounded-2xl">
        <div className="overflow-y-auto px-6 py-6 lg:px-10 space-y-6">
          <h5 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            {editingItem ? "Edit Squad Intelligence" : "Enlist National Team"}
          </h5>

          <PhotoUpload
            label="National Team Crest / Flag"
            value={form.image}
            onChange={(value) => handleChange("image", value)}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label>Squad Name</Label>
              <Input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label>Abbreviation (FIFA)</Label>
              <Input
                type="text"
                value={form.abbreviation}
                onChange={(e) => handleChange("abbreviation", e.target.value)}
              />
            </div>
            <div>
              <Label>Team Type</Label>
              <Select
                options={teamTypeOptions}
                value={form.teamType}
                placeholder="Select team type"
                onChange={(value) => handleChange("teamType", value)}
                className="dark:bg-dark-900"
              />
            </div>
            <div>
              <Label>Scope</Label>
              <Select
                options={scopeOptions}
                value={form.scope}
                placeholder="Select scope"
                onChange={(value) => handleChange("scope", value)}
                className="dark:bg-dark-900"
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
              <Label>Confederation / Continent</Label>
              <Input
                type="text"
                value={form.continent}
                onChange={(e) => handleChange("continent", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Squad Description / History</Label>
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
          <Button onClick={handleSubmit}>{editingItem ? "Update Squad" : "Enlist Squad"}</Button>
        </div>
      </div>
    </Modal>
  );
}
