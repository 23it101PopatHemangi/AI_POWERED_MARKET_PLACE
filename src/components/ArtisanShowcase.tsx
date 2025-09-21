import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Star } from "lucide-react";

interface ArtisanProfile {
  name: string;
  craftType: string;
  story: string;
  location: string;
  phone: string;
  email: string;
}

interface ShowcaseItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  price: string;
  featured: boolean;
}

interface ArtisanShowcaseProps {
  profile: ArtisanProfile;
  showcaseItems?: ShowcaseItem[];
}

// Sample showcase items for demo
const sampleItems: ShowcaseItem[] = [
  {
    id: "1",
    name: "Handwoven Traditional Scarf",
    description: "This exquisite handcrafted scarf showcases the timeless beauty of traditional weaving techniques. Each piece is carefully woven to create a unique work of art.",
    price: "$89",
    featured: true
  },
  {
    id: "2", 
    name: "Ceramic Garden Vase",
    description: "A beautiful ceramic vase perfect for your garden or home. Hand-thrown and glazed with natural earth tones.",
    price: "$156", 
    featured: false
  },
  {
    id: "3",
    name: "Artisan Jewelry Set",
    description: "Handcrafted jewelry featuring traditional metalwork techniques passed down through generations.",
    price: "$234",
    featured: true
  }
];

export default function ArtisanShowcase({ profile, showcaseItems = sampleItems }: ArtisanShowcaseProps) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-up">
      {/* Artisan Header */}
      <Card className="bg-gradient-warm shadow-warm border-sage-light overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-primary rounded-full mb-6">
              <span className="text-3xl font-bold text-primary-foreground">
                {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-earth">{profile.name}</h1>
              <Badge variant="secondary" className="bg-sage text-sage-dark text-lg px-4 py-2">
                {profile.craftType} Artisan
              </Badge>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {profile.story}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-terracotta" />
                  {profile.location}
                </div>
              )}
              {profile.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-terracotta" />
                  {profile.email}
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-terracotta" />
                  {profile.phone}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Products */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-earth">Featured Creations</h2>
          <p className="text-muted-foreground">
            Discover our handcrafted masterpieces, each one unique and made with love
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseItems.map((item) => (
            <Card key={item.id} className="group bg-gradient-warm shadow-soft border-sage-light hover:shadow-warm transition-all duration-300 hover:scale-[1.02] overflow-hidden">
              <CardContent className="p-0">
                {/* Product Image Placeholder */}
                <div className="h-64 bg-gradient-secondary flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-sage/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <p className="text-sage-dark font-medium">
                      {item.name}
                    </p>
                  </div>
                  {item.featured && (
                    <Badge className="absolute top-3 right-3 bg-golden text-earth">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-earth group-hover:text-terracotta transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-terracotta">
                      {item.price}
                    </span>
                    <Badge variant="outline" className="border-sage text-sage-dark">
                      Handmade
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-primary shadow-warm border-none text-center">
        <CardContent className="p-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary-foreground">
              Ready to Commission Your Own Piece?
            </h3>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto">
              Each creation is as unique as the person who will treasure it. 
              Let's work together to bring your vision to life with traditional {profile.craftType.toLowerCase()} techniques.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/90 pt-4">
              <span>✨ Custom Designs Available</span>
              <span>🎨 Traditional Techniques</span>
              <span>💝 Made with Love</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}