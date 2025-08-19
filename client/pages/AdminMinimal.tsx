import { useState } from "react";
import { FileText, Settings, Users, Search, Link, Star, MessageSquare, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AdminSection = 'hero' | 'features' | 'testimonials' | 'seo' | 'links' | 'rating' | 'popups' | 'preview';

const sidebarItems = [
  { id: 'hero' as AdminSection, label: 'Hero Section', icon: FileText, description: 'Edit main headline, pricing, and CTA buttons' },
  { id: 'features' as AdminSection, label: 'Features', icon: Settings, description: 'Manage feature points' },
  { id: 'testimonials' as AdminSection, label: 'Testimonials', icon: Users, description: 'Add, edit, and manage customer reviews' },
  { id: 'seo' as AdminSection, label: 'SEO Settings', icon: Search, description: 'Meta titles, descriptions' },
  { id: 'links' as AdminSection, label: 'Links & Navigation', icon: Link, description: 'Manage footer links' },
  { id: 'rating' as AdminSection, label: 'Rating Display', icon: Star, description: 'Configure star ratings' },
  { id: 'popups' as AdminSection, label: 'Popups & Modals', icon: MessageSquare, description: 'Exit intent popups' },
  { id: 'preview' as AdminSection, label: 'Preview', icon: Eye, description: 'See how your changes look' }
];

export default function AdminMinimal() {
  const [activeSection, setActiveSection] = useState<AdminSection>('hero');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-xl">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Landing Page Editor</p>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className="w-full justify-start h-auto p-4"
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <p className="text-xs opacity-80">{item.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b px-6 py-4">
          <h2 className="text-xl font-bold">
            {sidebarItems.find(item => item.id === activeSection)?.label}
          </h2>
        </header>

        <main className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeSection === 'hero' && 'Hero Section Management'}
                {activeSection === 'features' && 'Features Management'}
                {activeSection === 'testimonials' && 'Testimonials Management'}
                {activeSection === 'seo' && 'SEO Settings'}
                {activeSection === 'links' && 'Links Management'}
                {activeSection === 'rating' && 'Rating Configuration'}
                {activeSection === 'popups' && 'Popups & Modals'}
                {activeSection === 'preview' && 'Live Preview'}
              </CardTitle>
              <CardDescription>
                Manage your landing page content for the {sidebarItems.find(item => item.id === activeSection)?.label} section
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-8 bg-blue-50 rounded-lg text-center">
                  <Badge variant="outline" className="mb-4">
                    ✅ {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section Active
                  </Badge>
                  <h3 className="text-lg font-medium mb-2">
                    Admin Dashboard is Working!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This section is ready for content management. You can edit:
                  </p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
                    {activeSection === 'hero' && (
                      <>
                        <div className="bg-white p-3 rounded border">📝 Text Content</div>
                        <div className="bg-white p-3 rounded border">💰 Pricing</div>
                        <div className="bg-white p-3 rounded border">🔗 Button Links</div>
                        <div className="bg-white p-3 rounded border">🖼️ Hero Image</div>
                      </>
                    )}
                    {activeSection === 'features' && (
                      <>
                        <div className="bg-white p-3 rounded border">➕ Add Features</div>
                        <div className="bg-white p-3 rounded border">✏️ Edit Features</div>
                        <div className="bg-white p-3 rounded border">🔄 Reorder Features</div>
                        <div className="bg-white p-3 rounded border">👁️ Enable/Disable</div>
                      </>
                    )}
                    {activeSection === 'testimonials' && (
                      <>
                        <div className="bg-white p-3 rounded border">👤 Customer Info</div>
                        <div className="bg-white p-3 rounded border">⭐ Star Ratings</div>
                        <div className="bg-white p-3 rounded border">📝 Review Text</div>
                        <div className="bg-white p-3 rounded border">🖼️ Profile Images</div>
                      </>
                    )}
                    {activeSection === 'seo' && (
                      <>
                        <div className="bg-white p-3 rounded border">📄 Meta Title</div>
                        <div className="bg-white p-3 rounded border">📝 Meta Description</div>
                        <div className="bg-white p-3 rounded border">🖼️ OG Image</div>
                        <div className="bg-white p-3 rounded border">🏷️ Keywords</div>
                      </>
                    )}
                    {activeSection === 'links' && (
                      <>
                        <div className="bg-white p-3 rounded border">📱 Social Media</div>
                        <div className="bg-white p-3 rounded border">🔗 Footer Links</div>
                        <div className="bg-white p-3 rounded border">🎯 Button Links</div>
                        <div className="bg-white p-3 rounded border">🧭 Navigation</div>
                      </>
                    )}
                    {activeSection === 'rating' && (
                      <>
                        <div className="bg-white p-3 rounded border">⭐ Rating Value</div>
                        <div className="bg-white p-3 rounded border">🎨 Star Style</div>
                        <div className="bg-white p-3 rounded border">🔢 Review Count</div>
                        <div className="bg-white p-3 rounded border">📍 Display Location</div>
                      </>
                    )}
                    {activeSection === 'popups' && (
                      <>
                        <div className="bg-white p-3 rounded border">💬 Popup Content</div>
                        <div className="bg-white p-3 rounded border">🎯 Trigger Settings</div>
                        <div className="bg-white p-3 rounded border">🔘 CTA Buttons</div>
                        <div className="bg-white p-3 rounded border">🖼️ Popup Images</div>
                      </>
                    )}
                    {activeSection === 'preview' && (
                      <>
                        <div className="bg-white p-3 rounded border">💻 Desktop View</div>
                        <div className="bg-white p-3 rounded border">📱 Mobile View</div>
                        <div className="bg-white p-3 rounded border">📊 Content Stats</div>
                        <div className="bg-white p-3 rounded border">🔗 Live Site</div>
                      </>
                    )}
                  </div>
                  <div className="mt-6">
                    <Button onClick={() => window.open('/', '_blank')}>
                      View Live Site
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
