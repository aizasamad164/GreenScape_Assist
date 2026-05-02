import { useState } from "react";
import { Plus, Calendar, Leaf } from "lucide-react";
import { useGarden } from "../context/GardenContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";

export default function Journal() {
  const { journalEntries, addJournalEntry, plants } = useGarden();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    plantId: "",
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEntry.title || !newEntry.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const selectedPlant = plants.find((p) => p.id === newEntry.plantId);

    addJournalEntry({
      date: new Date().toISOString(),
      title: newEntry.title,
      content: newEntry.content,
      plantId: newEntry.plantId || undefined,
      plantName: selectedPlant?.name || undefined,
    });

    toast.success("Journal entry added!");
    setNewEntry({ title: "", content: "", plantId: "" });
    setIsDialogOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-green-50 to-green-100">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl mb-1">Garden Journal</h1>
            <p className="text-gray-600 text-sm">
              {journalEntries.length} entr{journalEntries.length !== 1 ? "ies" : "y"}
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className="bg-green-600 hover:bg-green-700">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-[#f5e6d3]">
              <DialogHeader>
                <DialogTitle>New Journal Entry</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    placeholder="What's happening in your garden?"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plant">Related Plant (Optional)</Label>
                  <Select
                    value={newEntry.plantId}
                    onValueChange={(value) => setNewEntry({ ...newEntry, plantId: value })}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select a plant" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#f5e6d3]">
                      <SelectItem value="none">None</SelectItem>
                      {plants.map((plant) => (
                        <SelectItem key={plant.id} value={plant.id}>
                          {plant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Entry *</Label>
                  <Textarea
                    id="content"
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    placeholder="Write about your observations, progress, or ideas..."
                    rows={6}
                    className="bg-white"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                    Save Entry
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-white"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Journal Entries */}
        <div className="space-y-4">
          {journalEntries.length === 0 ? (
            <Card className="bg-[#f5e6d3] border-amber-200">
              <CardContent className="p-8 text-center text-gray-500">
                <Leaf className="w-12 h-12 mx-auto mb-2 text-green-600" />
                <p className="mb-1">No journal entries yet</p>
                <p className="text-sm">Start documenting your gardening journey!</p>
              </CardContent>
            </Card>
          ) : (
            journalEntries.map((entry) => (
              <Card key={entry.id} className="bg-[#f5e6d3] border-amber-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium mb-1">{entry.title}</h3>
                      {entry.plantName && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <Leaf className="w-4 h-4" />
                          {entry.plantName}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 text-sm">{entry.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}