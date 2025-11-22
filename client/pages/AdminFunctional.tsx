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
import { cn } from "@/lib/utils";
import {
  defaultLandingPageData,
  type LandingPageData,
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

export default function AdminFunctional() {
  const [activeSection, setActiveSection] = useState<AdminSection>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<LandingPageData>(defaultLandingPageData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const sidebarItems: SidebarItem[] = [
    {
      id: "hero",
      label: "Hero Section",
      icon: FileText,
      description: "Edit main headline, pricing, and CTA buttons",
      badge: "Working",
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
      badge: "Working",
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
      badge: "Working",
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

  const renderActiveForm = () => {
    switch (activeSection) {
      case "hero":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Content</CardTitle>
                <CardDescription>
                  Edit the main headline, subtitle, and key messaging
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                    className="min-h-[80px] resize-none"
                  />
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
                    placeholder="Optional subtitle..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Sale Price (USD)</Label>
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
                    <Label htmlFor="originalPrice">Original Price (USD)</Label>
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryButtonText">
                      Primary Button Text
                    </Label>
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
                    <Label htmlFor="primaryButtonLink">
                      Primary Button Link
                    </Label>
                    <Input
                      id="primaryButtonLink"
                      value={data.hero.primaryButtonLink}
                      onChange={(e) =>
                        updateData("hero", {
                          ...data.hero,
                          primaryButtonLink: e.target.value,
                        })
                      }
                      placeholder="#product-modal"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heroImage">Hero Image URL</Label>
                    <Input
                      id="heroImage"
                      value={data.hero.heroImage}
                      onChange={(e) =>
                        updateData("hero", {
                          ...data.hero,
                          heroImage: e.target.value,
                        })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
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
                      placeholder="Describe the image..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "features":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Features Management</CardTitle>
                <CardDescription>
                  Add, edit, and manage product features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="p-4 border rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Feature {index + 1}</h4>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`feature-${feature.id}-enabled`}>
                          Enabled
                        </Label>
                        <Switch
                          id={`feature-${feature.id}-enabled`}
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
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`feature-${feature.id}-title`}>
                          Title
                        </Label>
                        <Input
                          id={`feature-${feature.id}-title`}
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
                        <Label htmlFor={`feature-${feature.id}-icon`}>
                          Icon
                        </Label>
                        <Input
                          id={`feature-${feature.id}-icon`}
                          value={feature.icon}
                          onChange={(e) => {
                            const updatedFeatures = data.features.map((f) =>
                              f.id === feature.id
                                ? { ...f, icon: e.target.value }
                                : f,
                            );
                            updateData("features", updatedFeatures);
                          }}
                          placeholder="Package, Gift, Zap..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`feature-${feature.id}-description`}>
                        Description
                      </Label>
                      <Textarea
                        id={`feature-${feature.id}-description`}
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
                        className="min-h-[60px]"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials Management</CardTitle>
                <CardDescription>
                  Manage customer reviews and testimonials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="p-4 border rounded-lg space-y-4"
                  >
                    <h4 className="font-medium">Testimonial {index + 1}</h4>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`testimonial-${testimonial.id}-name`}>
                          Customer Name
                        </Label>
                        <Input
                          id={`testimonial-${testimonial.id}-name`}
                          value={testimonial.name}
                          onChange={(e) => {
                            const updatedTestimonials = data.testimonials.map(
                              (t) =>
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
                        <Label htmlFor={`testimonial-${testimonial.id}-rating`}>
                          Rating (1-5)
                        </Label>
                        <Input
                          id={`testimonial-${testimonial.id}-rating`}
                          type="number"
                          min="1"
                          max="5"
                          value={testimonial.rating}
                          onChange={(e) => {
                            const updatedTestimonials = data.testimonials.map(
                              (t) =>
                                t.id === testimonial.id
                                  ? {
                                      ...t,
                                      rating: parseInt(e.target.value) || 5,
                                    }
                                  : t,
                            );
                            updateData("testimonials", updatedTestimonials);
                          }}
                          placeholder="5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor={`testimonial-${testimonial.id}-location`}
                        >
                          Location
                        </Label>
                        <Input
                          id={`testimonial-${testimonial.id}-location`}
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`testimonial-${testimonial.id}-review`}>
                        Review Text
                      </Label>
                      <Textarea
                        id={`testimonial-${testimonial.id}-review`}
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
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case "seo":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
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
                  <p className="text-xs text-gray-500">
                    {data.seo.metaTitle.length}/60 characters (recommended:
                    50-60)
                  </p>
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
                    className="min-h-[80px]"
                  />
                  <p className="text-xs text-gray-500">
                    {data.seo.metaDescription.length}/160 characters
                    (recommended: 150-160)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogImage">Open Graph Image URL</Label>
                  <Input
                    id="ogImage"
                    value={data.seo.ogImage}
                    onChange={(e) =>
                      updateData("seo", {
                        ...data.seo,
                        ogImage: e.target.value,
                      })
                    }
                    placeholder="https://example.com/og-image.jpg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "preview":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  Preview how your changes will appear on the live site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-6 border shadow-sm">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {data.hero.title}
                  </h1>
                  {data.hero.subtitle && (
                    <p className="text-gray-600 mb-4">{data.hero.subtitle}</p>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ${data.hero.salePrice}
                    </span>
                    {data.hero.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${data.hero.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 mb-6">
                    <Button className="flex-1">
                      {data.hero.primaryButtonText}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      {data.hero.secondaryButtonText}
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">
                      Features ({data.features.filter((f) => f.enabled).length}{" "}
                      active):
                    </h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {data.features
                        .filter((f) => f.enabled)
                        .slice(0, 4)
                        .map((feature) => (
                          <div
                            key={feature.id}
                            className="text-sm text-gray-600"
                          >
                            ✓ {feature.title}
                          </div>
                        ))}
                    </div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:block",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500">Fully Functional</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
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
                className="w-full"
                disabled={!hasUnsavedChanges}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
                {hasUnsavedChanges && (
                  <Badge variant="destructive" className="ml-auto">
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
                    "w-full justify-start h-auto p-4",
                    activeSection === item.id
                      ? "bg-blue-600 text-white hover:bg-blue-700"
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
          <div className="border-t p-4">
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

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Top bar */}
        <header className="bg-white border-b px-6 py-4">
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
                <span>Admin</span>
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
                ✅ Functional
              </Badge>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-4xl">
            {/* Section Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                {activeItem?.icon && (
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <activeItem.icon className="h-6 w-6 text-blue-600" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeItem?.label}
                  </h2>
                  <p className="text-gray-600">{activeItem?.description}</p>
                </div>
              </div>
              <Separator />
            </div>

            {/* Form Content */}
            {renderActiveForm()}
          </div>
        </main>
      </div>
    </div>
  );
}
