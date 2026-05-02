import { Link } from "react-router";
import { Plus, Droplet, CheckCircle, Search, User } from "lucide-react";
import { useGarden } from "../context/GardenContext";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { useState } from "react";

export default function MyGarden() {
  const { plants } = useGarden();
  const [searchQuery, setSearchQuery] = useState("");

  const getDaysUntilNextWatering = (plant: {
    lastWatered: string;
    wateringFrequency: number;
  }) => {
    const lastWateredDate = new Date(plant.lastWatered);
    const nextWateringDate = new Date(lastWateredDate);
    nextWateringDate.setDate(nextWateringDate.getDate() + plant.wateringFrequency);
    const today = new Date();
    const daysUntil = Math.ceil((nextWateringDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil;
  };

  const getPlantStatus = (plant: any) => {
    const daysUntilWatering = getDaysUntilNextWatering(plant);
    if (daysUntilWatering <= 1) {
      return { status: "needs-water", icon: Droplet, color: "text-blue-600", bgColor: "bg-blue-100" };
    }
    return { status: "healthy", icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100" };
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.species.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <div className="bg-[#fef9ec] p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-green-900">GreenScape Assist</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Plant Cards */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-4 pb-20">
          {filteredPlants.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {searchQuery ? "No plants found" : "No plants yet. Add your first plant!"}
            </div>
          ) : (
            filteredPlants.map((plant) => {
              const { status, icon: StatusIcon, color, bgColor } = getPlantStatus(plant);

              return (
                <Link key={plant.id} to={`/plant/${plant.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-[#fef9ec] h-32">
                    <CardContent className="p-0 h-full">
                      <div className="flex gap-0 h-full">
                        <div className="w-32 h-full flex-shrink-0">
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 py-4 pr-4 pl-4 flex flex-col justify-between">
                          <div>
                            <h3 className="font-medium text-lg mb-1">{plant.name}</h3>
                            <p className="text-sm text-gray-600">{plant.species}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bgColor}`}>
                              <StatusIcon className={`w-4 h-4 ${color}`} />
                              <span className={`text-xs font-medium ${color}`}>
                                {status === "needs-water" ? "Needs Water" : "Healthy"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <Link to="/add-plant">
        <Button
          size="icon"
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
}