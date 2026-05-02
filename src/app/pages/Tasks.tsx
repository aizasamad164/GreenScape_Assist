import { useState } from "react";
import { CheckCircle2, Circle, Droplet, Scissors, Package, Sparkles } from "lucide-react";
import { useGarden } from "../context/GardenContext";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

export default function Tasks() {
  const { tasks, updateTask } = useGarden();
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "water":
        return <Droplet className="w-5 h-5 text-blue-600" />;
      case "fertilize":
        return <Sparkles className="w-5 h-5 text-green-600" />;
      case "prune":
        return <Scissors className="w-5 h-5 text-orange-600" />;
      case "repot":
        return <Package className="w-5 h-5 text-purple-600" />;
      default:
        return <Circle className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else if (date < today) {
      return "Overdue";
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  const isOverdue = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date < today && date.toDateString() !== today.toDateString();
  };

  const toggleTask = (taskId: string, completed: boolean) => {
    updateTask(taskId, { completed });
  };

  const TaskCard = ({ task }: { task: any }) => {
    const overdue = isOverdue(task.dueDate);

    return (
      <Card
        className={`overflow-hidden transition-all bg-[#f5e6d3] border-amber-200 ${
          task.completed ? "opacity-60" : ""
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <button
              onClick={() => toggleTask(task.id, !task.completed)}
              className="mt-1 flex-shrink-0"
            >
              {task.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
            </button>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className={`font-medium ${task.completed ? "line-through" : ""}`}>
                    {task.plantName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getTaskIcon(task.type)}
                    <span className="text-sm text-gray-600 capitalize">{task.type}</span>
                  </div>
                </div>
                <Badge
                  variant={overdue ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {formatDate(task.dueDate)}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-green-50 to-green-100">
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-2xl mb-1">Tasks</h1>
          <p className="text-gray-600 text-sm">
            {pendingTasks.length} pending task{pendingTasks.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "pending" | "completed")}>
          <TabsList className="grid w-full grid-cols-2 bg-[#f5e6d3]">
            <TabsTrigger value="pending">
              Pending ({pendingTasks.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedTasks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4 space-y-3">
            {pendingTasks.length === 0 ? (
              <Card className="bg-[#f5e6d3] border-amber-200">
                <CardContent className="p-8 text-center text-gray-500">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-600" />
                  <p>All caught up! No pending tasks.</p>
                </CardContent>
              </Card>
            ) : (
              pendingTasks
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4 space-y-3">
            {completedTasks.length === 0 ? (
              <Card className="bg-[#f5e6d3] border-amber-200">
                <CardContent className="p-8 text-center text-gray-500">
                  <p>No completed tasks yet.</p>
                </CardContent>
              </Card>
            ) : (
              completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}