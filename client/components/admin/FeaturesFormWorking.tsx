import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Upload, 
  Eye, 
  EyeOff,
  Save,
  X,
  Image as ImageIcon,
  Type,
  Palette,
  ArrowUp,
  ArrowDown,
  Package,
  Gift,
  Zap,
  Users,
  Heart,
  BadgeCheck,
  Shield,
  Star,
  Truck,
  Clock,
  CheckCircle,
  Award,
  Target,
  Sparkles,
  Crown,
  Gem,
  Lightbulb,
  Rocket,
  Trophy,
  Handshake,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Feature } from "@shared/admin-types";
import { cn } from "@/lib/utils";

interface FeaturesFormWorkingProps {
  data: Feature[];
  onChange: (data: Feature[]) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Package, Gift, Zap, Users, Heart, BadgeCheck, Shield, Star,
  Truck, Clock, CheckCircle, Award, Target, Sparkles, Crown,
  Gem, Lightbulb, Rocket, Trophy, Handshake
};

const iconOptions = Object.keys(iconMap);

const colorOptions = [
  { value: 'blue', label: 'Blue', class: 'text-blue-600' },
  { value: 'purple', label: 'Purple', class: 'text-purple-600' },
  { value: 'green', label: 'Green', class: 'text-green-600' },
  { value: 'orange', label: 'Orange', class: 'text-orange-600' },
  { value: 'red', label: 'Red', class: 'text-red-600' },
  { value: 'indigo', label: 'Indigo', class: 'text-indigo-600' },
  { value: 'yellow', label: 'Yellow', class: 'text-yellow-600' },
  { value: 'pink', label: 'Pink', class: 'text-pink-600' },
  { value: 'gray', label: 'Gray', class: 'text-gray-600' },
];

export function FeaturesFormWorking({ data, onChange }: FeaturesFormWorkingProps) {
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const createNewFeature = (): Feature => ({
    id: generateId(),
    icon: 'Package',
    title: '',
    description: '',
    color: 'blue',
    image: '',
    imageAlt: '',
    enabled: true,
    order: Math.max(...data.map(f => f.order), 0) + 1
  });

  const handleReorder = (featureId: string, direction: 'up' | 'down') => {
    const feature = data.find(f => f.id === featureId);
    if (!feature) return;

    const targetOrder = direction === 'up' ? feature.order - 1 : feature.order + 1;
    const targetFeature = data.find(f => f.order === targetOrder);
    
    if (targetFeature) {
      const updated = data.map(f => {
        if (f.id === feature.id) return { ...f, order: targetOrder };
        if (f.id === targetFeature.id) return { ...f, order: feature.order };
        return f;
      });
      onChange(updated);
    }
  };

  const handleToggleEnabled = (id: string) => {
    const updated = data.map(feature =>
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
    );
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    const updated = data.filter(feature => feature.id !== id);
    onChange(updated);
  };

  const handleSave = (feature: Feature) => {
    if (isAddingNew) {
      onChange([...data, feature]);
      setIsAddingNew(false);
    } else {
      const updated = data.map(f => f.id === feature.id ? feature : f);
      onChange(updated);
    }
    setEditingFeature(null);
  };

  const handleEdit = (feature: Feature) => {
    setEditingFeature({ ...feature });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setEditingFeature(createNewFeature());
    setIsAddingNew(true);
  };

  const enabledCount = data.filter(f => f.enabled).length;
  const totalCount = data.length;
  const sortedData = [...data].sort((a, b) => a.order - b.order);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Features Management</CardTitle>
              <CardDescription>
                Add, edit, reorder, and manage feature highlights for your landing page
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">
                {enabledCount} of {totalCount} enabled
              </Badge>
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Features List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Features</CardTitle>
          <CardDescription>
            Manage individual features, toggle visibility, and reorder them
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <Alert>
              <AlertDescription>
                No features added yet. Click "Add Feature" to create your first feature.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {sortedData.map((feature, index) => {
                const IconComponent = iconMap[feature.icon] || Package;
                return (
                  <div
                    key={feature.id}
                    className={cn(
                      "bg-white border rounded-lg p-4",
                      feature.enabled ? "border-gray-200" : "border-gray-100 bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* Reorder Controls */}
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder(feature.id, 'up')}
                          disabled={index === 0}
                          className="h-6 w-6 p-0"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder(feature.id, 'down')}
                          disabled={index === sortedData.length - 1}
                          className="h-6 w-6 p-0"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Feature Icon & Content */}
                      <div className="flex-1 flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          feature.enabled ? "bg-blue-100" : "bg-gray-100"
                        )}>
                          <IconComponent className={cn(
                            "w-6 h-6",
                            feature.enabled 
                              ? colorOptions.find(c => c.value === feature.color)?.class || "text-blue-600"
                              : "text-gray-400"
                          )} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={cn(
                              "font-medium",
                              feature.enabled ? "text-gray-900" : "text-gray-500"
                            )}>
                              {feature.title || 'Untitled Feature'}
                            </h4>
                            {!feature.enabled && (
                              <Badge variant="secondary" className="text-xs">
                                Disabled
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              Order: {feature.order}
                            </Badge>
                          </div>
                          <p className={cn(
                            "text-sm",
                            feature.enabled ? "text-gray-600" : "text-gray-400"
                          )}>
                            {feature.description || 'No description'}
                          </p>
                        </div>

                        {/* Preview Image */}
                        {feature.image && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                            <img 
                              src={feature.image} 
                              alt={feature.imageAlt || feature.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={() => handleToggleEnabled(feature.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(feature)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(feature.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-900">Live Preview</CardTitle>
          <CardDescription className="text-green-700">
            How your features will appear on the live site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedData.filter(f => f.enabled).map((feature) => {
              const IconComponent = iconMap[feature.icon] || Package;
              return (
                <div key={feature.id} className="bg-white rounded-lg p-4 border shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <IconComponent className={cn(
                        "w-5 h-5",
                        colorOptions.find(c => c.value === feature.color)?.class || "text-blue-600"
                      )} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                  {feature.image && (
                    <div className="mt-3">
                      <img 
                        src={feature.image} 
                        alt={feature.imageAlt}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {sortedData.filter(f => f.enabled).length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No features enabled. Enable some features to see the preview.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Edit/Add Modal */}
      <Dialog open={!!editingFeature} onOpenChange={(open) => {
        if (!open) {
          setEditingFeature(null);
          setIsAddingNew(false);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isAddingNew ? 'Add New Feature' : 'Edit Feature'}
            </DialogTitle>
            <DialogDescription>
              Configure the feature details, appearance, and content
            </DialogDescription>
          </DialogHeader>

          {editingFeature && (
            <FeatureEditor
              feature={editingFeature}
              onChange={setEditingFeature}
              onSave={handleSave}
              onCancel={() => {
                setEditingFeature(null);
                setIsAddingNew(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// Feature Editor Component
interface FeatureEditorProps {
  feature: Feature;
  onChange: (feature: Feature) => void;
  onSave: (feature: Feature) => void;
  onCancel: () => void;
}

function FeatureEditor({ feature, onChange, onSave, onCancel }: FeatureEditorProps) {
  const [imagePreview, setImagePreview] = useState<string>(feature.image);

  const updateField = (field: keyof Feature, value: any) => {
    onChange({
      ...feature,
      [field]: value
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        updateField('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!feature.title.trim()) {
      alert('Please enter a feature title');
      return;
    }
    onSave(feature);
  };

  const IconComponent = iconMap[feature.icon] || Package;

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Type className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Basic Information</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="featureTitle">Title *</Label>
            <Input
              id="featureTitle"
              value={feature.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter feature title..."
            />
          </div>
          
          <div>
            <Label htmlFor="featureDescription">Description</Label>
            <Textarea
              id="featureDescription"
              value={feature.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe this feature..."
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Appearance</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="featureIcon">Icon</Label>
            <Select value={feature.icon} onValueChange={(value) => updateField('icon', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((icon) => {
                  const IconComponent = iconMap[icon];
                  return (
                    <SelectItem key={icon} value={icon}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {icon}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="featureColor">Color Theme</Label>
            <Select value={feature.color} onValueChange={(value) => updateField('color', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div className={cn("w-3 h-3 rounded-full", `bg-${color.value}-600`)} />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Icon Preview */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <Label className="text-sm">Icon Preview</Label>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-12 h-12 rounded-lg bg-white border flex items-center justify-center">
              <IconComponent className={cn(
                "w-6 h-6",
                colorOptions.find(c => c.value === feature.color)?.class || "text-blue-600"
              )} />
            </div>
            <div>
              <div className="font-medium">{feature.title || 'Feature Title'}</div>
              <div className="text-sm text-gray-600">{feature.description || 'Feature description'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Image */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Feature Image (Optional)</h3>
        </div>

        {imagePreview && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <img
              src={imagePreview}
              alt="Feature preview"
              className="w-full max-w-sm h-32 object-cover bg-gray-50 rounded-lg border"
            />
          </div>
        )}

        <div className="space-y-3">
          <div>
            <Label htmlFor="featureImage">Image URL</Label>
            <Input
              id="featureImage"
              value={feature.image}
              onChange={(e) => {
                updateField('image', e.target.value);
                setImagePreview(e.target.value);
              }}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="featureImageUpload">Or Upload Image</Label>
            <Input
              id="featureImageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div>
            <Label htmlFor="featureImageAlt">Image Alt Text</Label>
            <Input
              id="featureImageAlt"
              value={feature.imageAlt}
              onChange={(e) => updateField('imageAlt', e.target.value)}
              placeholder="Describe the image for accessibility..."
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Feature
        </Button>
      </div>
    </div>
  );
}
