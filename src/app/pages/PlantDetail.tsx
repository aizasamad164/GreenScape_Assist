import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Droplet, Sun, MapPin, Calendar, Trash2, Edit } from "lucide-react";
import { useGarden } from "../context/GardenContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

export default function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { plants, updatePlant, deletePlant } = useGarden();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const plant = plants.find((p) => p.id === id);

  if (!plant) {
    return (
      <div className="p-4">
        <p>Plant not found</p>
      </div>
    );
  }

  const handleWaterPlant = () => {
    updatePlant(plant.id, { lastWatered: new Date().toISOString() });
    toast.success(`${plant.name} has been watered!`);
  };

  const handleDeletePlant = () => {
    deletePlant(plant.id);
    toast.success(`${plant.name} has been removed from your garden`);
    navigate("/home");
  };

  const getDaysUntilNextWatering = () => {
    const lastWateredDate = new Date(plant.lastWatered);
    const nextWateringDate = new Date(lastWateredDate);
    nextWateringDate.setDate(nextWateringDate.getDate() + plant.wateringFrequency);
    const today = new Date();
    const daysUntil = Math.ceil((nextWateringDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const daysUntilWatering = getDaysUntilNextWatering();

  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 to-green-100">
      {/* Header Image */}
      <div className="relative h-64">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white/90 hover:bg-white"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white"
          onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
        >
          <Trash2 className="w-5 h-5 text-red-600" />
        </Button>
      </div>

      <div className="p-4 space-y-4 -mt-6 relative z-10">
        {/* Plant Info Card */}
        <Card className="shadow-lg bg-[#f5e6d3] border-amber-200">
          <CardContent className="p-4">
            <h1 className="text-2xl mb-1">{plant.name}</h1>
            <p className="text-gray-600 mb-4">{plant.species}</p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Droplet className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-600">Watering</div>
                  <div>Every {plant.wateringFrequency} days</div>
                </div>
                {daysUntilWatering <= 1 && (
                  <Badge variant="destructive">
                    {daysUntilWatering === 0 ? "Today" : "Overdue"}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Sun className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-gray-600">Sunlight</div>
                  <div className="capitalize">{plant.sunlight} sun</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-600">Location</div>
                  <div>{plant.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-gray-600">Last Watered</div>
                  <div>{formatDate(plant.lastWatered)}</div>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleWaterPlant}
            >
              <Droplet className="w-4 h-4 mr-2" />
              Water Now
            </Button>
          </CardContent>
        </Card>

        {/* Notes Card */}
        <Card className="bg-[#f5e6d3] border-amber-200">
          <CardHeader>
            <CardTitle className="text-lg">Care Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{plant.notes || "No notes yet."}</p>
          </CardContent>
        </Card>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="mb-3">Are you sure you want to delete {plant.name}?</p>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleDeletePlant}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}