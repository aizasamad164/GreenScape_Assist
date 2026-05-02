import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useGarden } from "../context/GardenContext";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";

export default function AddPlant() {
  const navigate = useNavigate();
  const { addPlant } = useGarden();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    image: "",
    wateringFrequency: "7",
    sunlight: "partial" as "full" | "partial" | "shade",
    location: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.species || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    addPlant({
      ...formData,
      wateringFrequency: parseInt(formData.wateringFrequency),
      lastWatered: new Date().toISOString(),
      image: formData.image || "https://images.unsplash.com/photo-1649531373919-a52c80fba1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    });

    toast.success(`${formData.name} added to your garden!`);
    navigate("/home");
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-green-700"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl">Add New Plant</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <Card className="bg-[#fef9ec]">
          <CardContent className="p-4 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Plant Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Sunny, Monty"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="species">Species *</Label>
              <Input
                id="species"
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                placeholder="e.g., Monstera Deliciosa, Basil"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL (Optional)</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/plant.jpg"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wateringFrequency">Watering Frequency (days) *</Label>
              <Select
                value={formData.wateringFrequency}
                onValueChange={(value) => setFormData({ ...formData, wateringFrequency: value })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#fef9ec]">
                  <SelectItem value="1">Daily</SelectItem>
                  <SelectItem value="2">Every 2 days</SelectItem>
                  <SelectItem value="3">Every 3 days</SelectItem>
                  <SelectItem value="7">Weekly</SelectItem>
                  <SelectItem value="14">Every 2 weeks</SelectItem>
                  <SelectItem value="21">Every 3 weeks</SelectItem>
                  <SelectItem value="30">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sunlight">Sunlight Requirements *</Label>
              <Select
                value={formData.sunlight}
                onValueChange={(value) => setFormData({ ...formData, sunlight: value as "full" | "partial" | "shade" })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#fef9ec]">
                  <SelectItem value="full">Full Sun (6+ hours)</SelectItem>
                  <SelectItem value="partial">Partial Sun (3-6 hours)</SelectItem>
                  <SelectItem value="shade">Shade (Less than 3 hours)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Living room windowsill"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Care Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special care instructions or observations..."
                rows={4}
                className="bg-white"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            Add Plant
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 bg-white"
            onClick={() => navigate("/home")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}