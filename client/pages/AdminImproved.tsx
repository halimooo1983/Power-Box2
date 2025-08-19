import { useState } from "react";
import {
  Settings,
  FileText,
  Star,
  Users,
  Link,
  MessageSquare,
  Search,
  Eye,
  Save,
  RotateCcw,
  Home,
  Menu,
  X,
  ChevronRight,
  Upload,
  Image as ImageIcon,
  DollarSign,
  Type,
  Globe,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import {
  defaultLandingPageData,
  type LandingPageData,
  type Feature,
  type Testimonial,
  type PopupContent,
} from "@shared/admin-types";

type AdminSection =
  | "hero"
  | "features"
  | "testimonials"
  | "seo"
  | "links"
  | "rating"
  | "popups"
  | "preview";

interface SidebarItem {
  id: AdminSection;
  label: string;
  icon: React.ElementType;
  description: string;
  badge?: string;
}

export default function AdminImproved() {
  const [activeSection, setActiveSection] = useState<AdminSection>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<LandingPageData>(defaultLandingPageData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [editingPopup, setEditingPopup] = useState<PopupContent | null>(null);

  const sidebarItems: SidebarItem[] = [
    {
      id: "hero",
      label: "Hero Section",
      icon: FileText,
      description: "Edit main headline, pricing, and CTA buttons",
      badge: "Essential",
    },
    {
      id: "features",
      label: "Features",
      icon: Settings,
      description: "Manage feature points, reorder, and toggle visibility",
      badge: `${data.features.length} items`,
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: Users,
      description: "Add, edit, and manage customer reviews",
      badge: `${data.testimonials.length} reviews`,
    },
    {
      id: "seo",
      label: "SEO Settings",
      icon: Search,
      description: "Meta titles, descriptions, and social sharing",
    },
    {
      id: "links",
      label: "Links & Navigation",
      icon: Link,
      description: "Manage footer links, social media, and buttons",
      badge: `${data.links.length} links`,
    },
    {
      id: "rating",
      label: "Rating Display",
      icon: Star,
      description: "Configure star ratings and review counts",
    },
    {
      id: "popups",
      label: "Popups & Modals",
      icon: MessageSquare,
      description: "Exit intent popups and promotional modals",
      badge: data.popups.some((p) => p.enabled) ? "Active" : "Inactive",
    },
    {
      id: "preview",
      label: "Preview",
      icon: Eye,
      description: "See how your changes look on the live site",
      badge: "Live",
    },
  ];

  const updateData = (section: keyof LandingPageData, newData: any) => {
    setData((prev) => ({
      ...prev,
      [section]: newData,
      lastUpdated: new Date().toISOString(),
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    console.log("Saving data:", data);
    setHasUnsavedChanges(false);
    // TODO: Replace with API call to save to Supabase
  };

  const handleReset = () => {
    setData(defaultLandingPageData);
    setHasUnsavedChanges(false);
  };

  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      callback(result);
    };
    reader.readAsDataURL(file);
  };

  const ImageUploadField = ({
    label,
    currentImage,
    onImageChange,
    placeholder = "Upload an image or enter URL",
  }: {
    label: string;
    currentImage: string;
    onImageChange: (url: string) => void;
    placeholder?: string;
  }) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>

      {/* Image Preview */}
      {currentImage && (
        <div className="relative max-w-sm">
          <img
            src={currentImage}
            alt={label}
            className="w-full h-32 object-cover rounded-lg border bg-gray-50"
          />
          <Badge className="absolute top-2 right-2 bg-green-600">
            Live Preview
          </Badge>
        </div>
      )}

      {/* URL Input */}
      <Input
        value={currentImage}
        onChange={(e) => onImageChange(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />

      {/* File Upload */}
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleImageUpload(file, onImageChange);
            }
          }}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Browse
        </Button>
      </div>
      <p className="text-xs text-gray-500">{placeholder}</p>
    </div>
  );

  const renderActiveForm = () => {
    switch (activeSection) {
      case "hero":
        return (
          <div className="space-y-8">
            {/* Main Content Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Hero Content
                </CardTitle>
                <CardDescription>
                  Edit the main headline, subtitle, and key messaging for your
                  landing page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Left Column - Text Content */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Main Title *</Label>
                      <Textarea
                        id="title"
                        value={data.hero.title}
                        onChange={(e) =>
                          updateData("hero", {
                            ...data.hero,
                            title: e.target.value,
                          })
                        }
                        placeholder="Enter your main headline..."
                        className="min-h-[100px] resize-none"
                      />
                      <p className="text-xs text-gray-500">
                        This is the first thing visitors see. Make it
                        compelling!
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtitle (Optional)</Label>
                      <Input
                        id="subtitle"
                        value={data.hero.subtitle || ""}
                        onChange={(e) =>
                          updateData("hero", {
                            ...data.hero,
                            subtitle: e.target.value,
                          })
                        }
                        placeholder="Optional subtitle or tagline..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="urgencyText">Urgency Text</Label>
                        <Input
                          id="urgencyText"
                          value={data.hero.urgencyText}
                          onChange={(e) =>
                            updateData("hero", {
                              ...data.hero,
                              urgencyText: e.target.value,
                            })
                          }
                          placeholder="e.g., Limited stock available"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deliveryText">Delivery Text</Label>
                        <Input
                          id="deliveryText"
                          value={data.hero.deliveryText}
                          onChange={(e) =>
                            updateData("hero", {
                              ...data.hero,
                              deliveryText: e.target.value,
                            })
                          }
                          placeholder="e.g., Fast & reliable delivery"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Image Upload */}
                  <div className="space-y-6">
                    <ImageUploadField
                      label="Hero Image"
                      currentImage={data.hero.heroImage}
                      onImageChange={(url) =>
                        updateData("hero", { ...data.hero, heroImage: url })
                      }
                      placeholder="Recommended: 800x600px or larger. Supports JPG, PNG, WebP."
                    />

                    <div className="space-y-2">
                      <Label htmlFor="heroImageAlt">Image Alt Text</Label>
                      <Input
                        id="heroImageAlt"
                        value={data.hero.heroImageAlt}
                        onChange={(e) =>
                          updateData("hero", {
                            ...data.hero,
                            heroImageAlt: e.target.value,
                          })
                        }
                        placeholder="Describe the image for accessibility..."
                      />
                      <p className="text-xs text-gray-500">
                        Important for SEO and accessibility
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Rating Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing & Rating
                </CardTitle>
                <CardDescription>
                  Configure pricing display and customer rating information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="salePrice">
                        Sale Price * <Badge variant="outline">USD</Badge>
                      </Label>
                      <Input
                        id="salePrice"
                        type="number"
                        step="0.01"
                        value={data.hero.salePrice}
                        onChange={(e) =>
                          updateData("hero", {
                            ...data.hero,
                            salePrice: parseFloat(e.target.value) || 0,
                          })
                        }
                        placeholder="31.95"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">
                        Original Price (Optional){" "}
                        <Badge variant="outline">USD</Badge>
                      </Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={data.hero.originalPrice || ""}
                        onChange={(e) =>
                          updateData("hero", {
                            ...data.hero,
                            originalPrice:
                              parseFloat(e.target.value) || undefined,
                          })
                        }
                        placeholder="49.99"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating Value</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="rating"
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={data.hero.rating}
                          onChange={(e) =>
                            updateData("hero", {
                              ...data.hero,
                              rating: parseFloat(e.target.value) || 0,
                            })
                          }
                          placeholder="4.6"
                          className="w-24"
                        />
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(data.hero.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ratingReviews">Number of Reviews</Label>
                      <Input
                        id="ratingReviews"
                        type="number"
                        value={data.hero.ratingReviews}
                        onChange={(e) =>
                          updateData("hero", {
                            ...data.hero,
                            ratingReviews: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="23"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Call-to-Action Buttons
                </CardTitle>
                <CardDescription>
                  Configure the main action buttons and their destinations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Button */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
                  <h4 className="font-medium text-blue-900">Primary Button</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryButtonText">Button Text</Label>
                      <Input
                        id="primaryButtonText"
                        value={data.hero.primaryButtonText}
                        onChange={(e) =>
                          updateData("hero", {
                            ...data.hero,
                            primaryButtonText: e.target.value,
                          })
                        }
                        placeholder="View Product Details"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryButtonLink">Button Link</Label>
                      <Input
                        id="primaryButtonLink"
                        value={data.hero.primaryButtonLink}
                        onChange={(e) =>
                          updateData("hero", {
                            ...data.hero,
                            primaryButtonLink: e.target.value,
                          })
                        }
                        placeholder="#product-modal or https://..."
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary Button */}
                <div className="p-4 bg-gray-50 rounded-lg border space-y-4">
                  <h4 className="font-medium text-gray-900">
                    Secondary Button
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="secondaryButtonText">Button Text</Label>
                      <Input
                        id="secondaryButtonText"
                        value={data.hero.secondaryButtonText}
                        onChange={(e) =>
                          updateData("hero", {
                            ...data.hero,
                            secondaryButtonText: e.target.value,
                          })
                        }
                        placeholder="Learn More About This Product"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryButtonLink">Button Link</Label>
                      <Input
                        id="secondaryButtonLink"
                        value={data.hero.secondaryButtonLink}
                        onChange={(e) =>
                          updateData("hero", {
                            ...data.hero,
                            secondaryButtonLink: e.target.value,
                          })
                        }
                        placeholder="#product-section or https://..."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "features":
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Features Management
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() =>
                          setEditingFeature({
                            id: Date.now().toString(),
                            icon: "Package",
                            title: "",
                            description: "",
                            color: "blue",
                            image: "",
                            imageAlt: "",
                            enabled: true,
                            order: data.features.length + 1,
                          })
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Feature</DialogTitle>
                        <DialogDescription>
                          Create a new feature for your product
                        </DialogDescription>
                      </DialogHeader>
                      {editingFeature && (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Feature Title</Label>
                              <Input
                                value={editingFeature.title}
                                onChange={(e) =>
                                  setEditingFeature({
                                    ...editingFeature,
                                    title: e.target.value,
                                  })
                                }
                                placeholder="Enter feature title"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Icon</Label>
                              <Select
                                value={editingFeature.icon}
                                onValueChange={(value) =>
                                  setEditingFeature({
                                    ...editingFeature,
                                    icon: value,
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Package">
                                    Package
                                  </SelectItem>
                                  <SelectItem value="Gift">Gift</SelectItem>
                                  <SelectItem value="Zap">Zap</SelectItem>
                                  <SelectItem value="Users">Users</SelectItem>
                                  <SelectItem value="Heart">Heart</SelectItem>
                                  <SelectItem value="BadgeCheck">
                                    BadgeCheck
                                  </SelectItem>
                                  <SelectItem value="Shield">Shield</SelectItem>
                                  <SelectItem value="Star">Star</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={editingFeature.description}
                              onChange={(e) =>
                                setEditingFeature({
                                  ...editingFeature,
                                  description: e.target.value,
                                })
                              }
                              placeholder="Describe this feature"
                              className="min-h-[80px]"
                            />
                          </div>
                          <ImageUploadField
                            label="Feature Image"
                            currentImage={editingFeature.image}
                            onImageChange={(url) =>
                              setEditingFeature({
                                ...editingFeature,
                                image: url,
                              })
                            }
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => {
                                updateData("features", [
                                  ...data.features,
                                  editingFeature,
                                ]);
                                setEditingFeature(null);
                              }}
                            >
                              Add Feature
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription>
                  Add, edit, and manage product features with full CRUD
                  operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="p-4 border rounded-lg space-y-4 bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">
                          Feature {index + 1}: {feature.title}
                        </h4>
                        <Badge
                          variant={feature.enabled ? "default" : "secondary"}
                        >
                          {feature.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={(checked) => {
                            const updatedFeatures = data.features.map((f) =>
                              f.id === feature.id
                                ? { ...f, enabled: checked }
                                : f,
                            );
                            updateData("features", updatedFeatures);
                          }}
                        />
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedFeatures = data.features.filter(
                              (f) => f.id !== feature.id,
                            );
                            updateData("features", updatedFeatures);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={feature.title}
                            onChange={(e) => {
                              const updatedFeatures = data.features.map((f) =>
                                f.id === feature.id
                                  ? { ...f, title: e.target.value }
                                  : f,
                              );
                              updateData("features", updatedFeatures);
                            }}
                            placeholder="Feature title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={feature.description}
                            onChange={(e) => {
                              const updatedFeatures = data.features.map((f) =>
                                f.id === feature.id
                                  ? { ...f, description: e.target.value }
                                  : f,
                              );
                              updateData("features", updatedFeatures);
                            }}
                            placeholder="Feature description"
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <ImageUploadField
                          label="Feature Image"
                          currentImage={feature.image}
                          onImageChange={(url) => {
                            const updatedFeatures = data.features.map((f) =>
                              f.id === feature.id ? { ...f, image: url } : f,
                            );
                            updateData("features", updatedFeatures);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Testimonials Management
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() =>
                          setEditingTestimonial({
                            id: Date.now().toString(),
                            name: "",
                            rating: 5,
                            review: "",
                            profileImage: "",
                            verified: false,
                            location: "",
                            purchaseDate: new Date()
                              .toISOString()
                              .split("T")[0],
                          })
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Testimonial
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Testimonial</DialogTitle>
                        <DialogDescription>
                          Add a customer review and testimonial
                        </DialogDescription>
                      </DialogHeader>
                      {editingTestimonial && (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Customer Name</Label>
                              <Input
                                value={editingTestimonial.name}
                                onChange={(e) =>
                                  setEditingTestimonial({
                                    ...editingTestimonial,
                                    name: e.target.value,
                                  })
                                }
                                placeholder="Customer name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Rating (1-5)</Label>
                              <Input
                                type="number"
                                min="1"
                                max="5"
                                value={editingTestimonial.rating}
                                onChange={(e) =>
                                  setEditingTestimonial({
                                    ...editingTestimonial,
                                    rating: parseInt(e.target.value) || 5,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Review Text</Label>
                            <Textarea
                              value={editingTestimonial.review}
                              onChange={(e) =>
                                setEditingTestimonial({
                                  ...editingTestimonial,
                                  review: e.target.value,
                                })
                              }
                              placeholder="Customer review text..."
                              className="min-h-[100px]"
                            />
                          </div>
                          <ImageUploadField
                            label="Profile Image"
                            currentImage={editingTestimonial.profileImage}
                            onImageChange={(url) =>
                              setEditingTestimonial({
                                ...editingTestimonial,
                                profileImage: url,
                              })
                            }
                            placeholder="Customer profile photo"
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => {
                                updateData("testimonials", [
                                  ...data.testimonials,
                                  editingTestimonial,
                                ]);
                                setEditingTestimonial(null);
                              }}
                            >
                              Add Testimonial
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription>
                  Manage customer reviews and testimonials with profile images
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="p-6 border rounded-lg space-y-4 bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Testimonial {index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const updatedTestimonials = data.testimonials.filter(
                            (t) => t.id !== testimonial.id,
                          );
                          updateData("testimonials", updatedTestimonials);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Customer Name</Label>
                            <Input
                              value={testimonial.name}
                              onChange={(e) => {
                                const updatedTestimonials =
                                  data.testimonials.map((t) =>
                                    t.id === testimonial.id
                                      ? { ...t, name: e.target.value }
                                      : t,
                                  );
                                updateData("testimonials", updatedTestimonials);
                              }}
                              placeholder="Customer name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Rating (1-5)</Label>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              value={testimonial.rating}
                              onChange={(e) => {
                                const updatedTestimonials =
                                  data.testimonials.map((t) =>
                                    t.id === testimonial.id
                                      ? {
                                          ...t,
                                          rating: parseInt(e.target.value) || 5,
                                        }
                                      : t,
                                  );
                                updateData("testimonials", updatedTestimonials);
                              }}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            value={testimonial.location || ""}
                            onChange={(e) => {
                              const updatedTestimonials = data.testimonials.map(
                                (t) =>
                                  t.id === testimonial.id
                                    ? { ...t, location: e.target.value }
                                    : t,
                              );
                              updateData("testimonials", updatedTestimonials);
                            }}
                            placeholder="California, US"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Review Text</Label>
                          <Textarea
                            value={testimonial.review}
                            onChange={(e) => {
                              const updatedTestimonials = data.testimonials.map(
                                (t) =>
                                  t.id === testimonial.id
                                    ? { ...t, review: e.target.value }
                                    : t,
                              );
                              updateData("testimonials", updatedTestimonials);
                            }}
                            placeholder="Customer review text..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <ImageUploadField
                          label="Profile Image"
                          currentImage={testimonial.profileImage}
                          onImageChange={(url) => {
                            const updatedTestimonials = data.testimonials.map(
                              (t) =>
                                t.id === testimonial.id
                                  ? { ...t, profileImage: url }
                                  : t,
                            );
                            updateData("testimonials", updatedTestimonials);
                          }}
                          placeholder="Customer profile photo"
                        />

                        <div className="flex items-center gap-2">
                          <Switch
                            checked={testimonial.verified}
                            onCheckedChange={(checked) => {
                              const updatedTestimonials = data.testimonials.map(
                                (t) =>
                                  t.id === testimonial.id
                                    ? { ...t, verified: checked }
                                    : t,
                              );
                              updateData("testimonials", updatedTestimonials);
                            }}
                          />
                          <Label>Verified Purchase</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case "seo":
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  SEO Settings
                </CardTitle>
                <CardDescription>
                  Configure meta tags and search engine optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={data.seo.metaTitle}
                    onChange={(e) =>
                      updateData("seo", {
                        ...data.seo,
                        metaTitle: e.target.value,
                      })
                    }
                    placeholder="Page title for search engines"
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">
                      Recommended: 50-60 characters
                    </span>
                    <span
                      className={cn(
                        "font-medium",
                        data.seo.metaTitle.length > 60
                          ? "text-red-600"
                          : data.seo.metaTitle.length > 50
                            ? "text-yellow-600"
                            : "text-green-600",
                      )}
                    >
                      {data.seo.metaTitle.length}/60
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={data.seo.metaDescription}
                    onChange={(e) =>
                      updateData("seo", {
                        ...data.seo,
                        metaDescription: e.target.value,
                      })
                    }
                    placeholder="Brief description for search results"
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">
                      Recommended: 150-160 characters
                    </span>
                    <span
                      className={cn(
                        "font-medium",
                        data.seo.metaDescription.length > 160
                          ? "text-red-600"
                          : data.seo.metaDescription.length > 150
                            ? "text-yellow-600"
                            : "text-green-600",
                      )}
                    >
                      {data.seo.metaDescription.length}/160
                    </span>
                  </div>
                </div>

                <ImageUploadField
                  label="Open Graph Image"
                  currentImage={data.seo.ogImage}
                  onImageChange={(url) =>
                    updateData("seo", { ...data.seo, ogImage: url })
                  }
                  placeholder="Recommended: 1200x630px for social sharing"
                />

                <div className="space-y-2">
                  <Label htmlFor="ogImageAlt">OG Image Alt Text</Label>
                  <Input
                    id="ogImageAlt"
                    value={data.seo.ogImageAlt}
                    onChange={(e) =>
                      updateData("seo", {
                        ...data.seo,
                        ogImageAlt: e.target.value,
                      })
                    }
                    placeholder="Alt text for social sharing image"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Keywords</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {data.seo.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-2 py-1"
                      >
                        {keyword}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-2"
                          onClick={() => {
                            const updatedKeywords = data.seo.keywords.filter(
                              (_, i) => i !== index,
                            );
                            updateData("seo", {
                              ...data.seo,
                              keywords: updatedKeywords,
                            });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a keyword"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const keyword = e.currentTarget.value.trim();
                          if (keyword && !data.seo.keywords.includes(keyword)) {
                            updateData("seo", {
                              ...data.seo,
                              keywords: [...data.seo.keywords, keyword],
                            });
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={(e) => {
                        const input = e.currentTarget
                          .previousElementSibling as HTMLInputElement;
                        const keyword = input.value.trim();
                        if (keyword && !data.seo.keywords.includes(keyword)) {
                          updateData("seo", {
                            ...data.seo,
                            keywords: [...data.seo.keywords, keyword],
                          });
                          input.value = "";
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Preview */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">Search Preview</CardTitle>
                <CardDescription className="text-green-700">
                  How your page will appear in Google search results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded border shadow-sm">
                  <div className="text-xl text-blue-600 underline mb-1">
                    {data.seo.metaTitle || "Page Title"}
                  </div>
                  <div className="text-green-700 text-sm mb-2">
                    https://your-domain.com/
                  </div>
                  <div className="text-gray-700 text-sm">
                    {data.seo.metaDescription ||
                      "Meta description will appear here..."}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "links":
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Links & Navigation
                </CardTitle>
                <CardDescription>
                  Manage footer links, social media, and navigation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.links.map((link, index) => (
                  <div
                    key={link.id}
                    className="p-4 border rounded-lg space-y-4 bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Link {index + 1}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{link.category}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedLinks = data.links.filter(
                              (l) => l.id !== link.id,
                            );
                            updateData("links", updatedLinks);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          value={link.label}
                          onChange={(e) => {
                            const updatedLinks = data.links.map((l) =>
                              l.id === link.id
                                ? { ...l, label: e.target.value }
                                : l,
                            );
                            updateData("links", updatedLinks);
                          }}
                          placeholder="Link label"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>URL</Label>
                        <Input
                          value={link.url}
                          onChange={(e) => {
                            const updatedLinks = data.links.map((l) =>
                              l.id === link.id
                                ? { ...l, url: e.target.value }
                                : l,
                            );
                            updateData("links", updatedLinks);
                          }}
                          placeholder="https://example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                          value={link.category}
                          onValueChange={(
                            value:
                              | "social"
                              | "footer"
                              | "button"
                              | "navigation",
                          ) => {
                            const updatedLinks = data.links.map((l) =>
                              l.id === link.id ? { ...l, category: value } : l,
                            );
                            updateData("links", updatedLinks);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="footer">Footer</SelectItem>
                            <SelectItem value="button">Button</SelectItem>
                            <SelectItem value="navigation">
                              Navigation
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => {
                    const newLink = {
                      id: Date.now().toString(),
                      label: "",
                      url: "",
                      category: "footer" as const,
                      icon: "",
                      target: "_blank" as const,
                    };
                    updateData("links", [...data.links, newLink]);
                  }}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Link
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "rating":
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Rating Display Configuration
                </CardTitle>
                <CardDescription>
                  Configure how star ratings and review counts are displayed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ratingValue">Rating Value</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="ratingValue"
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={data.rating.value}
                          onChange={(e) =>
                            updateData("rating", {
                              ...data.rating,
                              value: parseFloat(e.target.value) || 0,
                            })
                          }
                          placeholder="4.6"
                          className="w-24"
                        />
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(data.rating.value)
                                  ? "text-yellow-400 fill-current"
                                  : i < data.rating.value
                                    ? "text-yellow-400 fill-current opacity-50"
                                    : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reviewCount">Review Count</Label>
                      <Input
                        id="reviewCount"
                        type="number"
                        value={data.rating.reviewCount}
                        onChange={(e) =>
                          updateData("rating", {
                            ...data.rating,
                            reviewCount: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="570"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Star Display Style</Label>
                      <Select
                        value={data.rating.style}
                        onValueChange={(
                          value: "full" | "half" | "three-quarters",
                        ) =>
                          updateData("rating", { ...data.rating, style: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Stars Only</SelectItem>
                          <SelectItem value="half">
                            Half Star Precision
                          </SelectItem>
                          <SelectItem value="three-quarters">
                            Three-Quarters Precision
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>Display Locations</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={data.rating.showInHero}
                            onCheckedChange={(checked) =>
                              updateData("rating", {
                                ...data.rating,
                                showInHero: checked,
                              })
                            }
                          />
                          <Label>Show in Hero Section</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={data.rating.showInTrust}
                            onCheckedChange={(checked) =>
                              updateData("rating", {
                                ...data.rating,
                                showInTrust: checked,
                              })
                            }
                          />
                          <Label>Show in Trust Section</Label>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <h4 className="font-medium mb-2">Preview</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(data.rating.value)
                                  ? "text-yellow-400 fill-current"
                                  : i < data.rating.value
                                    ? "text-yellow-400 fill-current opacity-50"
                                    : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">
                          {data.rating.value}
                        </span>
                        <span className="text-sm text-gray-600">
                          ({data.rating.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "popups":
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Popups & Modals
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() =>
                          setEditingPopup({
                            id: Date.now().toString(),
                            title: "",
                            subtitle: "",
                            description: "",
                            buttonText: "",
                            buttonLink: "",
                            secondaryButtonText: "",
                            secondaryButtonLink: "",
                            image: "",
                            imageAlt: "",
                            enabled: true,
                            type: "exit-intent",
                          })
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Popup
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Popup</DialogTitle>
                        <DialogDescription>
                          Create a new popup or modal
                        </DialogDescription>
                      </DialogHeader>
                      {editingPopup && (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Title</Label>
                              <Input
                                value={editingPopup.title}
                                onChange={(e) =>
                                  setEditingPopup({
                                    ...editingPopup,
                                    title: e.target.value,
                                  })
                                }
                                placeholder="Popup title"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Type</Label>
                              <Select
                                value={editingPopup.type}
                                onValueChange={(
                                  value: "exit-intent" | "timed" | "scroll",
                                ) =>
                                  setEditingPopup({
                                    ...editingPopup,
                                    type: value,
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="exit-intent">
                                    Exit Intent
                                  </SelectItem>
                                  <SelectItem value="timed">Timed</SelectItem>
                                  <SelectItem value="scroll">
                                    Scroll Triggered
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={editingPopup.description}
                              onChange={(e) =>
                                setEditingPopup({
                                  ...editingPopup,
                                  description: e.target.value,
                                })
                              }
                              placeholder="Popup description"
                              className="min-h-[80px]"
                            />
                          </div>
                          <ImageUploadField
                            label="Popup Image"
                            currentImage={editingPopup.image || ""}
                            onImageChange={(url) =>
                              setEditingPopup({ ...editingPopup, image: url })
                            }
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => {
                                updateData("popups", [
                                  ...data.popups,
                                  editingPopup,
                                ]);
                                setEditingPopup(null);
                              }}
                            >
                              Add Popup
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription>
                  Manage exit intent, timed, and scroll-triggered popups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.popups.map((popup, index) => (
                  <div
                    key={popup.id}
                    className="p-6 border rounded-lg space-y-4 bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">
                          Popup {index + 1}: {popup.title}
                        </h4>
                        <Badge
                          variant={popup.enabled ? "default" : "secondary"}
                        >
                          {popup.enabled ? "Active" : "Disabled"}
                        </Badge>
                        <Badge variant="outline">{popup.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={popup.enabled}
                          onCheckedChange={(checked) => {
                            const updatedPopups = data.popups.map((p) =>
                              p.id === popup.id
                                ? { ...p, enabled: checked }
                                : p,
                            );
                            updateData("popups", updatedPopups);
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedPopups = data.popups.filter(
                              (p) => p.id !== popup.id,
                            );
                            updateData("popups", updatedPopups);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={popup.title}
                            onChange={(e) => {
                              const updatedPopups = data.popups.map((p) =>
                                p.id === popup.id
                                  ? { ...p, title: e.target.value }
                                  : p,
                              );
                              updateData("popups", updatedPopups);
                            }}
                            placeholder="Popup title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={popup.description}
                            onChange={(e) => {
                              const updatedPopups = data.popups.map((p) =>
                                p.id === popup.id
                                  ? { ...p, description: e.target.value }
                                  : p,
                              );
                              updateData("popups", updatedPopups);
                            }}
                            placeholder="Popup description"
                            className="min-h-[80px]"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Button Text</Label>
                            <Input
                              value={popup.buttonText}
                              onChange={(e) => {
                                const updatedPopups = data.popups.map((p) =>
                                  p.id === popup.id
                                    ? { ...p, buttonText: e.target.value }
                                    : p,
                                );
                                updateData("popups", updatedPopups);
                              }}
                              placeholder="Get 15% Off"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Button Link</Label>
                            <Input
                              value={popup.buttonLink}
                              onChange={(e) => {
                                const updatedPopups = data.popups.map((p) =>
                                  p.id === popup.id
                                    ? { ...p, buttonLink: e.target.value }
                                    : p,
                                );
                                updateData("popups", updatedPopups);
                              }}
                              placeholder="#newsletter"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <ImageUploadField
                          label="Popup Image"
                          currentImage={popup.image || ""}
                          onImageChange={(url) => {
                            const updatedPopups = data.popups.map((p) =>
                              p.id === popup.id ? { ...p, image: url } : p,
                            );
                            updateData("popups", updatedPopups);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case "preview":
        return (
          <div className="space-y-8">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">Live Preview</CardTitle>
                <CardDescription className="text-green-700">
                  See how your changes will appear on the live site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-8 border shadow-sm">
                  {/* Hero Section Preview */}
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                      {data.hero.title}
                    </h1>
                    {data.hero.subtitle && (
                      <p className="text-lg text-gray-600 mb-4">
                        {data.hero.subtitle}
                      </p>
                    )}

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(data.hero.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{data.hero.rating}</span>
                      <span className="text-gray-600">
                        ({data.hero.ratingReviews} reviews)
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <span className="text-3xl font-bold text-green-600">
                        ${data.hero.salePrice}
                      </span>
                      {data.hero.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">
                          ${data.hero.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Hero Image */}
                    {data.hero.heroImage && (
                      <div className="mb-6">
                        <img
                          src={data.hero.heroImage}
                          alt={data.hero.heroImageAlt}
                          className="max-w-md mx-auto h-48 object-contain rounded-lg"
                        />
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex gap-4 justify-center mb-6">
                      <Button size="lg" className="px-8">
                        {data.hero.primaryButtonText}
                      </Button>
                      <Button variant="outline" size="lg" className="px-8">
                        {data.hero.secondaryButtonText}
                      </Button>
                    </div>

                    {/* Urgency/Delivery */}
                    <div className="flex justify-center gap-6 text-sm">
                      <span className="text-green-600">
                        ✓ {data.hero.deliveryText}
                      </span>
                      <span className="text-red-600">
                        ⚡ {data.hero.urgencyText}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  {/* Features Preview */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-center mb-6">
                      Key Features
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {data.features
                        .filter((f) => f.enabled)
                        .slice(0, 6)
                        .map((feature) => (
                          <div
                            key={feature.id}
                            className="text-center p-4 border rounded-lg"
                          >
                            <div className="text-2xl mb-2">📦</div>
                            <h4 className="font-medium mb-1">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {feature.description}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <Separator className="my-8" />

                  {/* Statistics */}
                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {data.features.filter((f) => f.enabled).length}
                      </div>
                      <div className="text-sm text-gray-600">
                        Active Features
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {data.testimonials.length}
                      </div>
                      <div className="text-sm text-gray-600">
                        Customer Reviews
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {data.popups.filter((p) => p.enabled).length}
                      </div>
                      <div className="text-sm text-gray-600">Active Popups</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {data.links.length}
                      </div>
                      <div className="text-sm text-gray-600">
                        Navigation Links
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Previews */}
            <Card>
              <CardHeader>
                <CardTitle>Device Previews</CardTitle>
                <CardDescription>
                  How your site will look on different devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-8 h-12 bg-gray-200 rounded mx-auto mb-2"></div>
                    <span className="text-sm font-medium">Mobile</span>
                    <p className="text-xs text-gray-500">375px width</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-8 bg-gray-200 rounded mx-auto mb-2"></div>
                    <span className="text-sm font-medium">Tablet</span>
                    <p className="text-xs text-gray-500">768px width</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-10 bg-gray-200 rounded mx-auto mb-2"></div>
                    <span className="text-sm font-medium">Desktop</span>
                    <p className="text-xs text-gray-500">1200px+ width</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                This section is under development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                More functionality will be added here.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  const activeItem = sidebarItems.find((item) => item.id === activeSection);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform lg:translate-x-0 lg:relative lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm opacity-90">Professional Edition</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-blue-800"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-b bg-gray-50">
            <div className="space-y-2">
              <Button
                onClick={handleSave}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!hasUnsavedChanges}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
                {hasUnsavedChanges && (
                  <Badge
                    variant="destructive"
                    className="ml-auto animate-pulse"
                  >
                    Unsaved
                  </Badge>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset to Default
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto p-4 text-left",
                    activeSection === item.id
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <div className="flex items-center w-full">
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant={
                              activeSection === item.id
                                ? "secondary"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs opacity-80 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t p-4 bg-gray-50">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open("/", "_blank")}
            >
              <Home className="mr-2 h-4 w-4" />
              View Live Site
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Admin Dashboard</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-gray-900 font-medium">
                  {activeItem?.label || "Dashboard"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {hasUnsavedChanges && (
                <Badge variant="destructive" className="animate-pulse">
                  Unsaved Changes
                </Badge>
              )}
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                ✅ Professional
              </Badge>
              <Badge variant="outline">
                {new Date(data.lastUpdated).toLocaleTimeString()}
              </Badge>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                {activeItem?.icon && (
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <activeItem.icon className="h-8 w-8 text-blue-600" />
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {activeItem?.label}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {activeItem?.description}
                  </p>
                </div>
              </div>
              <Separator />
            </div>

            {/* Dynamic Form Content */}
            {renderActiveForm()}
          </div>
        </main>
      </div>
    </div>
  );
}
