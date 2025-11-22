import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { HeroContent } from "@shared/admin-types";

interface HeroFormSimpleProps {
  data: HeroContent;
  onChange: (data: HeroContent) => void;
}

export function HeroFormSimple({ data, onChange }: HeroFormSimpleProps) {
  const updateField = (field: keyof HeroContent, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Content (Simple)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salePrice">Sale Price</Label>
            <Input
              id="salePrice"
              type="number"
              step="0.01"
              value={data.salePrice}
              onChange={(e) =>
                updateField("salePrice", parseFloat(e.target.value) || 0)
              }
              placeholder="31.95"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryButtonText">Primary Button Text</Label>
            <Input
              id="primaryButtonText"
              value={data.primaryButtonText}
              onChange={(e) => updateField("primaryButtonText", e.target.value)}
              placeholder="View Product Details"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
