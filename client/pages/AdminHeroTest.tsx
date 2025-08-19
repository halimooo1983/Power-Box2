import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { defaultLandingPageData } from "@shared/admin-types";

// Test importing HeroFormWorking
// import { HeroFormWorking } from "@/components/admin/HeroFormWorking";

export default function AdminHeroTest() {
  const [data] = useState(defaultLandingPageData);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline">Testing</Badge>
              Hero Form Import Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-900 mb-2">✅ Step 1: Basic page loads</h3>
                <p className="text-green-700 text-sm">
                  This page loads without importing the HeroFormWorking component.
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">🔍 Step 2: Test import</h3>
                <p className="text-blue-700 text-sm">
                  Next, we'll uncomment the import to see if that causes the blank page.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-medium mb-2">Current Hero Data:</h4>
                <p className="text-sm text-gray-600">
                  Title: {data.hero.title.substring(0, 60)}...
                </p>
                <p className="text-sm text-gray-600">
                  Price: ${data.hero.salePrice}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
