"use client";

import { MoreVertical, Plus, Search, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data (replace with real data later)
const subjects = [
  { id: 1, name: "Matemática" },
  { id: 2, name: "Física" },
  { id: 3, name: "Química" },
];

const topics = [
  { id: 1, name: "Álgebra Linear", active: true },
  { id: 2, name: "Geometria", active: false },
  { id: 3, name: "Trigonometria", active: false },
];

const flashcards = [
  {
    id: 1,
    title: "Matrizes - Conceito Básico",
    description: "Definição e tipos de matrizes na álgebra linear",
  },
  {
    id: 2,
    title: "Determinantes",
    description: "Cálculo e propriedades dos determinantes",
  },
  // Add more flashcards as needed
];

export default function FlashcardsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        {/* Left Column - Navigation and Filters */}
        <aside className="w-64 space-y-6">
          {/* Subject Selection */}
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar matéria" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem
                  key={subject.id}
                  value={subject.id.toString()}
                >
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Topics List */}
          <div className="space-y-2">
            {topics.map((topic) => (
              <Button
                key={topic.id}
                variant={topic.active ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                {topic.name}
              </Button>
            ))}
          </div>

          {/* Create New Flashcard Button */}
          <Button className="w-full">
            <Plus className="mr-2 size-4" />
            Criar novo flashcard
          </Button>
        </aside>

        {/* Right Column - Main Content */}
        <main className="flex-1 space-y-6">
          {/* Top Actions Bar */}
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute top-2.5 left-2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar flashcards..."
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Zap className="mr-2 size-4" />
                Estudo Rápido
              </Button>
              <Button>
                <Sparkles className="mr-2 size-4" />
                Gerar com IA
              </Button>
            </div>
          </div>

          {/* Flashcards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {flashcards.map((flashcard) => (
              <Card key={flashcard.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{flashcard.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Duplicar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {flashcard.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Estudar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
