import { useState } from "react";
import { FileText, Save, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { defaultLandingPageData, type LandingPageData } from "@shared/admin-types";
import { HeroFormWorking } from "@/components/admin/HeroFormWorking";

export default function AdminSimple() {
  const [data, setData] = useState<LandingPageData>(defaultLandingPageData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateData = (section: keyof LandingPageData, newData: any) => {
    setData(prev => ({
      ...prev,
      [section]: newData,
      lastUpdated: new Date().toISOString()
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    console.log('Saving data:', data);
    setHasUnsavedChanges(false);
  };

  const handleReset = () => {
    setData(defaultLandingPageData);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Admin Dashboard - Hero Section
                </CardTitle>
                <CardDescription>
                  Testing the Hero form functionality
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                {hasUnsavedChanges && (
                  <Badge variant="destructive" className="animate-pulse">
                    Unsaved Changes
                  </Badge>
                )}
                <Button 
                  onClick={handleSave}
                  disabled={!hasUnsavedChanges}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('/', '_blank')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  View Live Site
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Hero Form */}
      <div className="max-w-4xl mx-auto">
        <HeroFormWorking 
          data={data.hero} 
          onChange={(heroData) => updateData('hero', heroData)} 
        />
      </div>
    </div>
  );
}
