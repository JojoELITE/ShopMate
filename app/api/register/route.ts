import { NextResponse } from "next/server"
import  prisma  from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const body = await req.json()
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    businessType,
    country,
  } = body

  // Vérification de base
  if (!email || !password || !confirmPassword) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 })
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ error: "Les mots de passe ne correspondent pas." }, { status: 400 })
  }

  // Vérifie si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ error: "Cet email est déjà utilisé." }, { status: 409 })
  }

  // Hash du mot de passe avec bcryptjs
  const passwordHash = bcrypt.hashSync(password, 10)

  try {
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        passwordHash,
        businessType,
        country,
      },
    })

    return NextResponse.json({ message: "Compte créé avec succès", userId: newUser.id }, { status: 201 })
  } catch (error) {
    console.error("Erreur de création d'utilisateur :", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
