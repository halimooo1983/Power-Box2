import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Settings, Users } from "lucide-react";

export default function AdminTest() {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard Test
          </h1>
          <p className="text-gray-600">
            Testing if basic admin page loads without form components
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>Admin sections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeSection === "hero" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("hero")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Hero Section
                </Button>
                <Button
                  variant={activeSection === "features" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("features")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Features
                </Button>
                <Button
                  variant={
                    activeSection === "testimonials" ? "default" : "outline"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveSection("testimonials")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Testimonials
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">Working</Badge>
                  Admin Section:{" "}
                  {activeSection.charAt(0).toUpperCase() +
                    activeSection.slice(1)}
                </CardTitle>
                <CardDescription>
                  This basic admin page loads successfully without form
                  component imports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-medium text-green-900 mb-2">
                      ✅ Status: Working
                    </h3>
                    <p className="text-green-700 text-sm">
                      Basic admin page structure loads correctly. This confirms
                      the issue is with the form component imports.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-blue-900 mb-2">
                      🔍 Next Steps
                    </h3>
                    <p className="text-blue-700 text-sm">
                      Now we need to identify which form component is causing
                      the blank page issue.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded border">
                      <h4 className="font-medium mb-1">Hero Form</h4>
                      <p className="text-sm text-gray-600">
                        Text editing, pricing, buttons, images
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded border">
                      <h4 className="font-medium mb-1">Features Form</h4>
                      <p className="text-sm text-gray-600">
                        CRUD operations, reordering, icons
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
