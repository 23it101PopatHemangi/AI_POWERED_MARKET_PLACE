import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Sparkles, Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ProductGeneratorProps {
  craftType: string;
}

export default function ProductGenerator({ craftType }: ProductGeneratorProps) {
  const [productName, setProductName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateDescription = () => {
    if (!productName.trim()) {
      toast.error("Please enter a product name");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation with realistic delay
    setTimeout(() => {
      const descriptions = {
        "Pottery & Ceramics": `This exquisite handcrafted ${productName} showcases the timeless beauty of traditional pottery techniques. Each piece is carefully shaped and fired to create a unique work of art that brings warmth and character to any space. The rich textures and earthy tones reflect the artisan's deep connection to the clay and centuries-old crafting traditions.`,
        
        "Textiles & Weaving": `This beautifully woven ${productName} represents hours of meticulous craftsmanship and traditional textile artistry. Created using time-honored techniques passed down through generations, each thread tells a story of cultural heritage and skilled handiwork. The intricate patterns and rich colors make this piece a stunning addition to any collection.`,
        
        "Jewelry Making": `This stunning handcrafted ${productName} is a testament to the artisan's exceptional skill and artistic vision. Each element is carefully selected and assembled to create a piece that's both elegant and meaningful. The intricate details and quality materials ensure this jewelry will be treasured for years to come.`,
        
        "Woodworking": `This masterfully crafted ${productName} showcases the natural beauty of wood combined with exceptional artisan skill. Hand-selected timber is carefully shaped and finished to highlight the grain and character of the wood. Each piece is unique, reflecting the organic nature of the material and the craftsperson's dedication to their art.`,
        
        "default": `This exceptional handcrafted ${productName} embodies the passion and skill of traditional artisanship. Created with careful attention to detail and using time-honored techniques, this piece represents the perfect blend of functionality and artistic beauty. Each item is unique, making it a special addition to any collection.`
      };

      const description = descriptions[craftType as keyof typeof descriptions] || descriptions.default;
      setGeneratedDescription(description);
      setIsGenerating(false);
      toast.success("Product description generated!");
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDescription);
    setCopied(true);
    toast.success("Description copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-warm shadow-warm border-sage-light animate-fade-up">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
          <Camera className="w-8 h-8 text-sage-dark" />
        </div>
        <CardTitle className="text-2xl text-earth">AI Product Description Generator</CardTitle>
        <CardDescription className="text-muted-foreground">
          Upload your product photo and get compelling marketing descriptions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName" className="text-earth font-medium">Product Name</Label>
            <Input
              id="productName"
              placeholder="e.g., Handwoven Traditional Scarf"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border-sage-light focus:border-terracotta"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productImage" className="text-earth font-medium">Product Photo</Label>
            <div className="border-2 border-dashed border-sage-light rounded-lg p-8 text-center hover:border-terracotta transition-colors">
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Product preview" 
                    className="max-w-full h-48 object-cover rounded-lg mx-auto shadow-soft"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => {setImagePreview(null); setImageFile(null);}}
                    className="border-sage text-sage-dark hover:bg-sage-light"
                  >
                    Change Photo
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="w-12 h-12 text-sage mx-auto" />
                  <div>
                    <input
                      id="productImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('productImage')?.click()}
                      className="border-sage text-sage-dark hover:bg-sage-light"
                    >
                      Upload Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Click to upload your product image
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Button 
            onClick={generateDescription}
            disabled={isGenerating || !productName.trim()}
            className="w-full bg-gradient-primary hover:bg-terracotta-dark text-primary-foreground font-medium py-6 text-lg shadow-warm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" />
                Generating Description...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate AI Description
              </div>
            )}
          </Button>

          {generatedDescription && (
            <div className="space-y-3 p-4 bg-cream/50 rounded-lg border border-sage-light">
              <div className="flex items-center justify-between">
                <Label className="text-earth font-medium">Generated Description</Label>
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
                value={generatedDescription}
                onChange={(e) => setGeneratedDescription(e.target.value)}
                className="min-h-[120px] border-sage-light focus:border-terracotta resize-none"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}