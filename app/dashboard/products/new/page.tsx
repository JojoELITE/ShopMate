"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Wand2, Save, ArrowLeft, ImageIcon, Loader2, CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewProductPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [] as string[],
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleVideoCapture = () => {
    setIsRecording(true)
    // Simulation de l'enregistrement vidéo
    setTimeout(() => {
      setIsRecording(false)
      setIsGenerating(true)

      // Simulation de la génération IA
      setTimeout(() => {
        setIsGenerating(false)
        setIsGenerated(true)
        setProductData({
          name: "iPhone 15 Pro Max",
          description:
            "Smartphone Apple dernière génération avec écran Super Retina XDR de 6,7 pouces, puce A17 Pro, système de caméra Pro avancé et design en titane.",
          price: "850000",
          category: "electronique",
          stock: "5",
          images: ["/placeholder.svg?height=300&width=300"],
        })
      }, 3000)
    }, 2000)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }))
    }
  }

  const handleSave = () => {
    // Simulation de sauvegarde
    setTimeout(() => {
      router.push("/dashboard/products")
    }, 1000)
  }

  const updateProductData = (field: string, value: string) => {
    setProductData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouveau Produit</h1>
            <p className="text-gray-600 mt-1">Créez votre fiche produit avec l'IA</p>
          </div>
        </div>
        {isGenerated && (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Généré par IA
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Capture Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Capture Produit
              </CardTitle>
              <CardDescription>Filmez votre produit pour générer automatiquement sa fiche</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Video Capture Area */}
              <div className="relative">
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  {isRecording ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm text-gray-600">Enregistrement en cours...</p>
                    </div>
                  ) : isGenerating ? (
                    <div className="text-center">
                      <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
                      <p className="text-sm text-gray-600">Génération IA en cours...</p>
                      <p className="text-xs text-gray-500 mt-1">Analyse de votre produit</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600">Cliquez pour filmer votre produit</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleVideoCapture}
                  disabled={isRecording || isGenerating}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  {isRecording ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      Filmer le produit
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isRecording || isGenerating}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Importer
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {isGenerating && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-blue-800">IA en action</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Analyse de l'image, génération du nom, description et prix...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Images Preview */}
          {productData.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Images du produit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {productData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Produit ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Product Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wand2 className="w-5 h-5 mr-2" />
                Informations Produit
              </CardTitle>
              <CardDescription>
                {isGenerated
                  ? "Informations générées par l'IA - Vous pouvez les modifier"
                  : "Remplissez les informations de votre produit"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit</Label>
                <Input
                  id="name"
                  placeholder="Ex: iPhone 15 Pro"
                  value={productData.name}
                  onChange={(e) => updateProductData("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre produit..."
                  rows={4}
                  value={productData.description}
                  onChange={(e) => updateProductData("description", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (FCFA)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    value={productData.price}
                    onChange={(e) => updateProductData("price", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={productData.stock}
                    onChange={(e) => updateProductData("stock", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select value={productData.category} onValueChange={(value) => updateProductData("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronique">Électronique</SelectItem>
                    <SelectItem value="mode">Mode & Beauté</SelectItem>
                    <SelectItem value="maison">Maison & Jardin</SelectItem>
                    <SelectItem value="sport">Sport & Loisirs</SelectItem>
                    <SelectItem value="auto">Auto & Moto</SelectItem>
                    <SelectItem value="livre">Livres & Médias</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={!productData.name || !productData.price}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer le produit
                </Button>

                <Button variant="outline">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Créer campagne
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          {isGenerated && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Suggestions IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-2">Optimisations suggérées :</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Ajouter des mots-clés dans la description pour améliorer la visibilité</li>
                    <li>• Prix compétitif par rapport au marché (850,000 FCFA)</li>
                    <li>• Catégorie "Électronique" optimale pour ce produit</li>
                  </ul>
                </div>
                <Button size="sm" variant="outline" className="w-full border-blue-300 text-blue-700">
                  Voir plus de suggestions
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
