import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Palette, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

interface ArtisanProfile {
  name: string;
  craftType: string;
  story: string;
  location: string;
  phone: string;
  email: string;
}

interface ArtisanProfileBuilderProps {
  onProfileCreated: (profile: ArtisanProfile) => void;
}

const craftTypes = [
  "Pottery & Ceramics",
  "Textiles & Weaving",
  "Jewelry Making",
  "Woodworking",
  "Metalwork",
  "Leather Crafts",
  "Glass Blowing",
  "Painting & Art",
  "Sculpture",
  "Traditional Crafts"
];

export default function ArtisanProfileBuilder({ onProfileCreated }: ArtisanProfileBuilderProps) {
  const [profile, setProfile] = useState<ArtisanProfile>({
    name: "",
    craftType: "",
    story: "",
    location: "",
    phone: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name || !profile.craftType || !profile.story) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    onProfileCreated(profile);
    toast.success("Artisan profile created successfully!");
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-warm shadow-warm border-sage-light animate-fade-up">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl text-earth">Create Your Artisan Profile</CardTitle>
        <CardDescription className="text-muted-foreground">
          Tell your story and let AI help you market your beautiful crafts
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-earth font-medium">Artisan Name *</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="border-sage-light focus:border-terracotta"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="craftType" className="text-earth font-medium">Craft Type *</Label>
              <Select value={profile.craftType} onValueChange={(value) => setProfile(prev => ({ ...prev, craftType: value }))}>
                <SelectTrigger className="border-sage-light focus:border-terracotta">
                  <SelectValue placeholder="Select your craft" />
                </SelectTrigger>
                <SelectContent>
                  {craftTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-terracotta" />
                        {type}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="story" className="text-earth font-medium">Your Story *</Label>
            <Textarea
              id="story"
              placeholder="Tell us about your craft journey, inspiration, and what makes your work unique..."
              value={profile.story}
              onChange={(e) => setProfile(prev => ({ ...prev, story: e.target.value }))}
              className="min-h-[120px] border-sage-light focus:border-terracotta resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-earth font-medium">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </Label>
              <Input
                id="location"
                placeholder="City, Country"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                className="border-sage-light focus:border-terracotta"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-earth font-medium">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="+1 234 567 8900"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                className="border-sage-light focus:border-terracotta"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-earth font-medium">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                className="border-sage-light focus:border-terracotta"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:bg-terracotta-dark text-primary-foreground font-medium py-6 text-lg shadow-warm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          >
            Create My Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}