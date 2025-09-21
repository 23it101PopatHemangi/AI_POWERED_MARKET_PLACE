import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ArtisanProfileBuilder from "@/components/ArtisanProfileBuilder";
import ProductGenerator from "@/components/ProductGenerator";
import SocialMediaGenerator from "@/components/SocialMediaGenerator";
import MarketingCaptionGenerator from "@/components/MarketingCaptionGenerator";
import ArtisanShowcase from "@/components/ArtisanShowcase";
import { Palette, Sparkles, Share2, Megaphone, Store, ArrowRight } from "lucide-react";

interface ArtisanProfile {
  name: string;
  craftType: string;
  story: string;
  location: string;
  phone: string;
  email: string;
}

const Index = () => {
  const [currentProfile, setCurrentProfile] = useState<ArtisanProfile | null>(null);
  const [activeTab, setActiveTab] = useState("profile");

  const handleProfileCreated = (profile: ArtisanProfile) => {
    setCurrentProfile(profile);
    setActiveTab("generator");
  };

  const features = [
    {
      id: "profile",
      title: "Profile Builder",
      description: "Create your artisan identity",
      icon: Palette,
      color: "terracotta"
    },
    {
      id: "generator",
      title: "Product Descriptions",
      description: "AI-powered product copy",
      icon: Sparkles,
      color: "sage"
    },
    {
      id: "social",
      title: "Social Content",
      description: "Engaging social media posts",
      icon: Share2,
      color: "golden"
    },
    {
      id: "marketing",
      title: "Marketing Captions",
      description: "Compelling sales copy",
      icon: Megaphone,
      color: "terracotta"
    },
    {
      id: "showcase",
      title: "Marketplace",
      description: "Beautiful product showcase",
      icon: Store,
      color: "sage"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-primary">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-foreground/20 rounded-full mb-6 animate-gentle-bounce">
              <Palette className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground leading-tight">
              AI-Powered Marketplace Assistant
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Empower local artisans with AI-generated marketing content, product descriptions, 
              and social media posts that celebrate traditional craftsmanship
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/80 pt-4">
              <span>🎨 Traditional Crafts</span>
              <span>🤖 AI-Powered Content</span>
              <span>📱 Social Media Ready</span>
              <span>🌍 Support Local Artisans</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {!currentProfile ? (
          <div className="space-y-12">
            {/* Getting Started */}
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-earth">Start Your Artisan Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Create your profile and let AI help you market your beautiful handcrafted products to the world
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              {features.map((feature, index) => (
                <Card key={feature.id} className="bg-gradient-warm shadow-soft border-sage-light hover:shadow-warm transition-all duration-300 hover:scale-[1.02] group">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-12 h-12 bg-${feature.color} bg-opacity-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-earth">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                    {index < features.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-sage mx-auto hidden lg:block" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Profile Builder */}
            <div className="flex justify-center">
              <ArtisanProfileBuilder onProfileCreated={handleProfileCreated} />
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-earth">
                  Welcome, {currentProfile.name}! 🎨
                </h2>
                <p className="text-muted-foreground">
                  Your {currentProfile.craftType.toLowerCase()} journey begins here
                </p>
              </div>

              <TabsList className="grid w-full max-w-4xl grid-cols-2 md:grid-cols-5 bg-sage-light/50">
                <TabsTrigger value="profile" className="data-[state=active]:bg-terracotta data-[state=active]:text-primary-foreground">
                  <Palette className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="generator" className="data-[state=active]:bg-sage data-[state=active]:text-sage-foreground">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="social" className="data-[state=active]:bg-golden data-[state=active]:text-accent-foreground">
                  <Share2 className="w-4 h-4 mr-2" />
                  Social
                </TabsTrigger>
                <TabsTrigger value="marketing" className="data-[state=active]:bg-terracotta data-[state=active]:text-primary-foreground">
                  <Megaphone className="w-4 h-4 mr-2" />
                  Marketing
                </TabsTrigger>
                <TabsTrigger value="showcase" className="data-[state=active]:bg-sage data-[state=active]:text-sage-foreground">
                  <Store className="w-4 h-4 mr-2" />
                  Showcase
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex justify-center">
              <TabsContent value="profile" className="mt-0">
                <ArtisanProfileBuilder onProfileCreated={handleProfileCreated} />
              </TabsContent>

              <TabsContent value="generator" className="mt-0">
                <ProductGenerator craftType={currentProfile.craftType} />
              </TabsContent>

              <TabsContent value="social" className="mt-0">
                <SocialMediaGenerator 
                  artisanName={currentProfile.name} 
                  craftType={currentProfile.craftType} 
                />
              </TabsContent>

              <TabsContent value="marketing" className="mt-0">
                <MarketingCaptionGenerator craftType={currentProfile.craftType} />
              </TabsContent>

              <TabsContent value="showcase" className="mt-0">
                <ArtisanShowcase profile={currentProfile} />
              </TabsContent>
            </div>

            {/* Quick Reset */}
            <div className="text-center pt-8">
              <Button 
                variant="outline" 
                onClick={() => {
                  setCurrentProfile(null);
                  setActiveTab("profile");
                }}
                className="border-sage text-sage-dark hover:bg-sage-light"
              >
                Start Over with New Profile
              </Button>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Index;
