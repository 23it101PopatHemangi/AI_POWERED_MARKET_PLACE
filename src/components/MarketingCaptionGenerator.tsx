import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Copy, CheckCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface MarketingCaptionGeneratorProps {
  craftType: string;
}

const captionStyles = [
  "Professional & Elegant",
  "Warm & Personal",
  "Bold & Energetic", 
  "Poetic & Artistic",
  "Simple & Direct"
];

const captionTypes = [
  "Product Launch",
  "Limited Edition",
  "Seasonal Collection",
  "Custom Orders",
  "Workshop Classes",
  "Sale/Discount"
];

export default function MarketingCaptionGenerator({ craftType }: MarketingCaptionGeneratorProps) {
  const [productName, setProductName] = useState("");
  const [captionStyle, setCaptionStyle] = useState("");
  const [captionType, setCaptionType] = useState("");
  const [keyFeatures, setKeyFeatures] = useState("");
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateCaptions = () => {
    if (!productName.trim() || !captionStyle || !captionType) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const captions = {
        "Product Launch": {
          "Professional & Elegant": [
            `Introducing our newest masterpiece: ${productName}. Expertly crafted using traditional ${craftType.toLowerCase()} techniques, this piece represents the pinnacle of artisan quality and design excellence.`,
            `We're proud to unveil ${productName} – a stunning example of contemporary ${craftType.toLowerCase()} artistry. Each detail has been carefully considered to create a piece that will be treasured for generations.`,
            `Discover ${productName}, where traditional craftsmanship meets modern sophistication. This exceptional piece showcases the very best of ${craftType.toLowerCase()} artistry.`
          ],
          "Warm & Personal": [
            `I'm so excited to share ${productName} with you! This piece has been a labor of love, and I can't wait for you to experience the warmth and character that comes with handmade ${craftType.toLowerCase()}.`,
            `Meet ${productName} – straight from my heart and hands to your home! There's something magical about creating each piece by hand, knowing it will bring joy to someone special.`,
            `After weeks of careful crafting, ${productName} is finally ready! I poured my passion for ${craftType.toLowerCase()} into every detail, and I hope you feel that love when you see it.`
          ],
          "Bold & Energetic": [
            `🔥 JUST DROPPED: ${productName}! This isn't just ${craftType.toLowerCase()} – this is art that demands attention! Ready to make a statement?`,
            `BOOM! ${productName} has arrived and it's absolutely STUNNING! When handcrafted ${craftType.toLowerCase()} meets bold design – magic happens!`,
            `NEW ALERT! 🚨 ${productName} is here and it's everything you didn't know you needed! Bold, beautiful, and 100% handcrafted perfection!`
          ]
        },
        "Limited Edition": {
          "Professional & Elegant": [
            `Exclusive Limited Edition: ${productName}. Only a select few pieces will be created, each numbered and signed. Reserve yours today.`,
            `Presenting our Limited Edition ${productName} – a rare opportunity to own a truly exceptional piece of ${craftType.toLowerCase()} artistry.`
          ],
          "Warm & Personal": [
            `I'm creating only 10 pieces of ${productName}, and each one will be completely unique. If this speaks to you, don't wait – these special pieces find their homes quickly!`,
            `Limited hearts, limited hands, limited time – that's why only a few ${productName} pieces will ever exist. Each one is crafted with extra love and attention.`
          ],
          "Bold & Energetic": [
            `⚡ LIMITED EDITION ALERT! Only 5 ${productName} pieces will EVER exist! First come, first served – don't sleep on this!`,
            `RARE DROP! 🎯 ${productName} Limited Edition – when they're gone, they're GONE forever! Who's claiming theirs?`
          ]
        }
      };

      const styleVariations = captions[captionType as keyof typeof captions]?.[captionStyle as keyof any] || [
        `Discover ${productName} – a beautiful example of handcrafted ${craftType.toLowerCase()} artistry.`,
        `Introducing ${productName}, lovingly created in our workshop using traditional techniques.`,
        `Meet ${productName} – where passion meets craftsmanship in perfect harmony.`
      ];

      // Add key features if provided
      const enhancedCaptions = styleVariations.map(caption => {
        if (keyFeatures.trim()) {
          return `${caption}\n\n✨ Features: ${keyFeatures}`;
        }
        return caption;
      });

      setGeneratedCaptions(enhancedCaptions);
      setIsGenerating(false);
      toast.success("Marketing captions generated!");
    }, 2000);
  };

  const copyToClipboard = (caption: string, index: number) => {
    navigator.clipboard.writeText(caption);
    setCopiedIndex(index);
    toast.success("Caption copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const regenerateCaptions = () => {
    generateCaptions();
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-warm shadow-warm border-sage-light animate-fade-up">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
          <Megaphone className="w-8 h-8 text-sage-dark" />
        </div>
        <CardTitle className="text-2xl text-earth">Marketing Caption Generator</CardTitle>
        <CardDescription className="text-muted-foreground">
          Create compelling captions that sell your beautiful handcrafted products
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName" className="text-earth font-medium">Product Name *</Label>
            <Input
              id="productName"
              placeholder="e.g., Rustic Ceramic Vase"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border-sage-light focus:border-terracotta"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-earth font-medium">Caption Style *</Label>
              <Select value={captionStyle} onValueChange={setCaptionStyle}>
                <SelectTrigger className="border-sage-light focus:border-terracotta">
                  <SelectValue placeholder="Choose style" />
                </SelectTrigger>
                <SelectContent>
                  {captionStyles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-earth font-medium">Caption Type *</Label>
              <Select value={captionType} onValueChange={setCaptionType}>
                <SelectTrigger className="border-sage-light focus:border-terracotta">
                  <SelectValue placeholder="Choose type" />
                </SelectTrigger>
                <SelectContent>
                  {captionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyFeatures" className="text-earth font-medium">Key Features (Optional)</Label>
            <Textarea
              id="keyFeatures"
              placeholder="e.g., Handthrown, Food-safe glaze, Dishwasher safe, Unique texture..."
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
              className="min-h-[80px] border-sage-light focus:border-terracotta resize-none"
            />
          </div>

          <Button 
            onClick={generateCaptions}
            disabled={isGenerating || !productName.trim() || !captionStyle || !captionType}
            className="w-full bg-gradient-primary hover:bg-terracotta-dark text-primary-foreground font-medium py-6 text-lg shadow-warm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 animate-bounce" />
                Generating Captions...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5" />
                Generate Marketing Captions
              </div>
            )}
          </Button>

          {generatedCaptions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-earth font-medium">Generated Captions</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={regenerateCaptions}
                  className="border-sage text-sage-dark hover:bg-sage-light"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
              
              <div className="space-y-3">
                {generatedCaptions.map((caption, index) => (
                  <div key={index} className="p-4 bg-cream/50 rounded-lg border border-sage-light">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            Option {index + 1}
                          </Badge>
                        </div>
                        <p className="text-sm text-earth leading-relaxed whitespace-pre-line">
                          {caption}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(caption, index)}
                        className="border-sage text-sage-dark hover:bg-sage-light shrink-0"
                      >
                        {copiedIndex === index ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}