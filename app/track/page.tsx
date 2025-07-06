"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Heart,
  Activity,
  Thermometer,
  Scale,
  Droplets,
  Moon,
  TrendingUp,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/navbar";
import Link from "next/link";

interface HealthData {
  id: string;
  type: string;
  value: string;
  unit: string;
  date: string;
  time: string;
  updatedAt: string;
}

export default function Track() {
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    type: "",
    value: "",
    unit: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
  });
  const { toast } = useToast();

  const healthMetrics = [
    {
      type: "Blood Pressure",
      unit: "mmHg",
      icon: Heart,
      color: "text-red-600",
    },
    { type: "Heart Rate", unit: "bpm", icon: Activity, color: "text-pink-600" },
    { type: "Weight", unit: "kg", icon: Scale, color: "text-blue-600" },
    {
      type: "Temperature",
      unit: "°C",
      icon: Thermometer,
      color: "text-orange-600",
    },
    {
      type: "Blood Sugar",
      unit: "mg/dL",
      icon: Droplets,
      color: "text-purple-600",
    },
    {
      type: "Sleep Hours",
      unit: "hours",
      icon: Moon,
      color: "text-indigo-600",
    },
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("healthTrackingData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setHealthData(parsedData);
      } catch (error) {
        console.error("Error parsing saved health data:", error);
        // Initialize with default data if parsing fails
        initializeDefaultData();
      }
    } else {
      // Initialize with some default data for first-time users
      initializeDefaultData();
    }
  }, []);

  // Save data to localStorage whenever healthData changes
  useEffect(() => {
    localStorage.setItem("healthTrackingData", JSON.stringify(healthData));
  }, [healthData]);

  const initializeDefaultData = () => {
    const defaultData: HealthData[] = [
      {
        id: "blood-pressure",
        type: "Blood Pressure",
        value: "120/80",
        unit: "mmHg",
        date: "2024-01-15",
        time: "08:30",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "heart-rate",
        type: "Heart Rate",
        value: "72",
        unit: "bpm",
        date: "2024-01-15",
        time: "08:30",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "weight",
        type: "Weight",
        value: "70.5",
        unit: "kg",
        date: "2024-01-14",
        time: "07:00",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "temperature",
        type: "Temperature",
        value: "36.8",
        unit: "°C",
        date: "2024-01-14",
        time: "19:00",
        updatedAt: new Date().toISOString(),
      },
    ];
    setHealthData(defaultData);
  };

  const handleAddEntry = () => {
    if (!newEntry.type || !newEntry.value) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const entryId = newEntry.type.toLowerCase().replace(/\s+/g, "-");
    const existingEntryIndex = healthData.findIndex(
      (entry) => entry.id === entryId
    );
    const currentDateTime = new Date().toISOString();

    const entry: HealthData = {
      id: entryId,
      type: newEntry.type,
      value: newEntry.value,
      unit: newEntry.unit,
      date: newEntry.date,
      time: newEntry.time,
      updatedAt: currentDateTime,
    };

    if (existingEntryIndex !== -1) {
      // Update existing entry
      const updatedData = [...healthData];
      updatedData[existingEntryIndex] = entry;
      setHealthData(updatedData);

      toast({
        title: "Entry Updated",
        description: `Your ${newEntry.type} data has been updated successfully.`,
      });
    } else {
      // Add new entry
      setHealthData((prev) => [entry, ...prev]);

      toast({
        title: "Entry Added",
        description: `Your ${newEntry.type} data has been recorded successfully.`,
      });
    }

    // Reset form
    setNewEntry({
      type: "",
      value: "",
      unit: "",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().slice(0, 5),
    });
    setIsDialogOpen(false);
  };

  const handleDeleteEntry = (entryId: string, entryType: string) => {
    setHealthData((prev) => prev.filter((entry) => entry.id !== entryId));
    toast({
      title: "Entry Deleted",
      description: `Your ${entryType} entry has been deleted successfully.`,
    });
  };

  const getLatestValue = (type: string) => {
    const latest = healthData.find((entry) => entry.type === type);
    return latest ? `${latest.value} ${latest.unit}` : "No data";
  };

  const getLastUpdated = (type: string) => {
    const latest = healthData.find((entry) => entry.type === type);
    if (!latest) return "Never";

    const updatedDate = new Date(latest.updatedAt);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getIcon = (type: string) => {
    const metric = healthMetrics.find((m) => m.type === type);
    return metric ? metric.icon : Activity;
  };

  const getColor = (type: string) => {
    const metric = healthMetrics.find((m) => m.type === type);
    return metric ? metric.color : "text-gray-600";
  };

  const clearAllData = () => {
    setHealthData([]);
    localStorage.removeItem("healthTrackingData");
    toast({
      title: "Data Cleared",
      description: "All health tracking data has been cleared.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                  Health Tracking
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Monitor your vital signs and health metrics
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Entry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add/Update Health Entry</DialogTitle>
                      <DialogDescription>
                        Record your latest health measurements. Existing entries
                        will be updated.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="type">Metric Type *</Label>
                        <Select
                          value={newEntry.type}
                          onValueChange={(value) => {
                            const metric = healthMetrics.find(
                              (m) => m.type === value
                            );
                            setNewEntry((prev) => ({
                              ...prev,
                              type: value,
                              unit: metric?.unit || "",
                            }));
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select metric type" />
                          </SelectTrigger>
                          <SelectContent>
                            {healthMetrics.map((metric) => (
                              <SelectItem key={metric.type} value={metric.type}>
                                {metric.type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="value">Value *</Label>
                        <Input
                          id="value"
                          placeholder="Enter value"
                          value={newEntry.value}
                          onChange={(e) =>
                            setNewEntry((prev) => ({
                              ...prev,
                              value: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Date *</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newEntry.date}
                            onChange={(e) =>
                              setNewEntry((prev) => ({
                                ...prev,
                                date: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Time *</Label>
                          <Input
                            id="time"
                            type="time"
                            value={newEntry.time}
                            onChange={(e) =>
                              setNewEntry((prev) => ({
                                ...prev,
                                time: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <Button onClick={handleAddEntry} className="w-full">
                        {healthData.find(
                          (entry) => entry.type === newEntry.type
                        )
                          ? "Update Entry"
                          : "Add Entry"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                {healthData.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearAllData}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Health Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {healthMetrics.map((metric) => {
              const Icon = metric.icon;
              const hasData = healthData.some(
                (entry) => entry.type === metric.type
              );
              return (
                <Card
                  key={metric.type}
                  className="hover:shadow-lg transition-shadow w-full"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        {metric.type}
                      </CardTitle>
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">
                      {getLatestValue(metric.type)}
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {hasData
                        ? `Updated ${getLastUpdated(metric.type)}`
                        : "No data yet"}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Entries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Recent Entries
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Your latest health measurements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {healthData.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-sm sm:text-base">
                    No health data recorded yet.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Start tracking your health by adding your first entry.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {healthData
                    .sort(
                      (a, b) =>
                        new Date(b.updatedAt).getTime() -
                        new Date(a.updatedAt).getTime()
                    )
                    .map((entry) => {
                      const Icon = getIcon(entry.type);
                      return (
                        <div
                          key={entry.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-2 sm:gap-0"
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <Icon
                              className={`h-5 w-5 ${getColor(entry.type)}`}
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-sm sm:text-base">
                                {entry.type}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-500">
                                {entry.date} at {entry.time} • Updated{" "}
                                {getLastUpdated(entry.type)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="text-right">
                              <div className="font-bold text-gray-900 text-sm sm:text-base">
                                {entry.value} {entry.unit}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteEntry(entry.id, entry.type)
                              }
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Track Main Page Links */}
          <div className="mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Explore More
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/track/diagnosis">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center border border-gray-100 hover:border-blue-400 cursor-pointer">
                  <span className="text-3xl mb-2">🩺</span>
                  <span className="text-lg font-semibold text-gray-900">
                    Disease Risk Self-Assessment
                  </span>
                  <p className="text-center text-gray-500 text-sm mt-2">
                    Evaluate your risk for common diseases based on your health
                    data.
                  </p>
                </div>
              </Link>
              <Link href="/track/mentalhealth">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center border border-gray-100 hover:border-blue-400 cursor-pointer">
                  <span className="text-3xl mb-2">🧠</span>
                  <span className="text-lg font-semibold text-gray-900">
                    Mental Health Check
                  </span>
                  <p className="text-center text-gray-500 text-sm mt-2">
                    Monitor your mental well-being and track changes over time.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
