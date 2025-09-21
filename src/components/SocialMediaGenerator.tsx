import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Share2, Instagram, Facebook, Twitter, Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface SocialMediaGeneratorProps {
  artisanName: string;
  craftType: string;
}

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, limit: 2200 },
  { id: "facebook", name: "Facebook", icon: Facebook, limit: 500 },
  { id: "twitter", name: "Twitter/X", icon: Twitter, limit: 280 }
];

const postTypes = [
  "Product Showcase",
  "Behind the Scenes",
  "Craft Process",
  "Artisan Story",
  "Customer Feature",
  "Workshop/Event"
];

export default function SocialMediaGenerator({ artisanName, craftType }: SocialMediaGeneratorProps) {
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [postType, setPostType] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSocialPost = () => {
    if (!postType || !productDetails.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const posts = {
        "Product Showcase": {
          instagram: `✨ Introducing our latest creation! ✨\n\n${productDetails}\n\nEach piece is lovingly handcrafted in our workshop, where tradition meets artistry. When you choose handmade, you're not just buying a product – you're supporting a passionate artisan and keeping traditional ${craftType.toLowerCase()} alive! 🎨\n\n💫 What draws you to handcrafted pieces? Let us know in the comments!\n\n#HandmadeWithLove #${craftType.replace(/\s+/g, '')} #ArtisanCrafted #SupportLocal #${artisanName.replace(/\s+/g, '')}Artisan`,
          
          facebook: `We're excited to share our newest creation with you!\n\n${productDetails}\n\nAt our workshop, every piece tells a story. This beautiful work represents hours of careful craftsmanship and years of honed skill in ${craftType.toLowerCase()}. When you choose our handmade pieces, you're supporting traditional artistry and bringing something truly unique into your home.\n\nWe'd love to hear what handcrafted items mean to you!`,
          
          twitter: `New creation alert! 🎨\n\n${productDetails.substring(0, 100)}${productDetails.length > 100 ? '...' : ''}\n\nHandcrafted with love in our ${craftType.toLowerCase()} workshop ✨\n\n#HandmadeWithLove #${craftType.replace(/\s+/g, '')} #ArtisanCrafted`
        },
        
        "Behind the Scenes": {
          instagram: `Take a peek behind the magic! ✨\n\nToday in the workshop: ${productDetails}\n\nEvery creation starts with a vision and raw materials. What you see here is the beautiful process of transformation – from idea to finished piece. This is where the magic happens, where traditional ${craftType.toLowerCase()} techniques meet modern creativity! 🔥\n\n👀 Love seeing the process? Follow for more behind-the-scenes content!\n\n#BehindTheScenes #ArtisanLife #${craftType.replace(/\s+/g, '')} #CraftProcess #HandmadeJourney #${artisanName.replace(/\s+/g, '')}Workshop`,
          
          facebook: `Ever wondered how our pieces come to life? Here's a glimpse into our workshop!\n\n${productDetails}\n\nThe creative process is just as beautiful as the finished product. Each step requires patience, skill, and passion. From selecting materials to the final finishing touches, every moment is filled with purpose and artistry.\n\nWe love sharing this journey with you – the heart and soul behind every handcrafted piece!`,
          
          twitter: `Workshop vibes today! 🔨\n\n${productDetails.substring(0, 120)}${productDetails.length > 120 ? '...' : ''}\n\nThe magic happens here ✨\n\n#BehindTheScenes #${craftType.replace(/\s+/g, '')} #ArtisanLife`
        },
        
        "Artisan Story": {
          instagram: `Meet the hands behind the craft! 👋\n\n${productDetails}\n\nEvery artisan has a story, and ours is woven into every piece we create. ${craftType} isn't just our profession – it's our passion, our heritage, and our way of connecting with the world. Through our work, we carry forward traditions while creating something new and beautiful! 💝\n\n✨ What's your connection to handmade crafts? Share your story below!\n\n#ArtisanStory #CraftHeritage #${craftType.replace(/\s+/g, '')} #PassionProject #TraditionalCrafts #${artisanName.replace(/\s+/g, '')}Story`,
          
          facebook: `We wanted to share a bit of our story with you...\n\n${productDetails}\n\nBeing an artisan means more than just creating beautiful objects. It means preserving traditions, expressing creativity, and building connections with people who appreciate handmade quality. Every piece we create carries a piece of our heart and our commitment to excellence.\n\nThank you for being part of our journey and supporting handcrafted artistry!`,
          
          twitter: `Our artisan journey 💫\n\n${productDetails.substring(0, 140)}${productDetails.length > 140 ? '...' : ''}\n\nCrafting with heart & heritage 🎨\n\n#ArtisanStory #${craftType.replace(/\s+/g, '')}`
        }
      };

      const hashtagSets = {
        instagram: ["HandmadeWithLove", craftType.replace(/\s+/g, ''), "ArtisanCrafted", "SupportLocal", "TraditionalCrafts", "HandcraftedQuality", "MadeWithPassion", "UniqueDesign"],
        facebook: ["HandmadeWithLove", craftType.replace(/\s+/g, ''), "ArtisanCrafted", "SupportLocal"],
        twitter: ["HandmadeWithLove", craftType.replace(/\s+/g, ''), "ArtisanCrafted"]
      };

      const postData = posts[postType as keyof typeof posts];
      const selectedPost = postData[selectedPlatform as keyof typeof postData] || postData.instagram;
      
      setGeneratedPost(selectedPost);
      setHashtags(hashtagSets[selectedPlatform as keyof typeof hashtagSets]);
      setIsGenerating(false);
      toast.success("Social media post generated!");
    }, 2000);
  };

  const copyToClipboard = () => {
    const fullPost = selectedPlatform === 'instagram' ? 
      `${generatedPost}\n\n${hashtags.map(tag => `#${tag}`).join(' ')}` : 
      generatedPost;
    
    navigator.clipboard.writeText(fullPost);
    setCopied(true);
    toast.success("Post copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);

  return (
    <Card className="w-full max-w-2xl bg-gradient-warm shadow-warm border-sage-light animate-fade-up">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
          <Share2 className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl text-earth">Social Media Content Creator</CardTitle>
        <CardDescription className="text-muted-foreground">
          Generate engaging posts for your social media platforms
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-earth font-medium">Platform</Label>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="border-sage-light focus:border-terracotta">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.id} value={platform.id}>
                    <div className="flex items-center gap-2">
                      <platform.icon className="w-4 h-4 text-terracotta" />
                      {platform.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-earth font-medium">Post Type</Label>
            <Select value={postType} onValueChange={setPostType}>
              <SelectTrigger className="border-sage-light focus:border-terracotta">
                <SelectValue placeholder="Choose post type" />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-earth font-medium">Product/Content Details</Label>
          <Textarea
            placeholder="Describe your product, process, or story that you want to share..."
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            className="min-h-[100px] border-sage-light focus:border-terracotta resize-none"
          />
        </div>

        <Button 
          onClick={generateSocialPost}
          disabled={isGenerating || !postType || !productDetails.trim()}
          className="w-full bg-gradient-primary hover:bg-terracotta-dark text-primary-foreground font-medium py-6 text-lg shadow-warm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 animate-spin" />
              Creating Post...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Generate {selectedPlatformData?.name} Post
            </div>
          )}
        </Button>

        {generatedPost && (
          <div className="space-y-4 p-4 bg-cream/50 rounded-lg border border-sage-light">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedPlatformData && <selectedPlatformData.icon className="w-5 h-5 text-terracotta" />}
                <Label className="text-earth font-medium">{selectedPlatformData?.name} Post</Label>
                <Badge variant="outline" className="text-xs">
                  {generatedPost.length}/{selectedPlatformData?.limit} chars
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="border-sage text-sage-dark hover:bg-sage-light"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            <Textarea
              value={generatedPost}
              onChange={(e) => setGeneratedPost(e.target.value)}
              className="min-h-[150px] border-sage-light focus:border-terracotta resize-none"
            />
            
            {selectedPlatform === 'instagram' && hashtags.length > 0 && (
              <div className="space-y-2">
                <Label className="text-earth font-medium text-sm">Suggested Hashtags:</Label>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-sage-light text-sage-dark">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}