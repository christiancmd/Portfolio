// src/services/projects.ts
import { supabase } from "../lib/supabase";

export interface Project {
  id: number;
  title: string;
  description: string;
  status: boolean;
  image_url: string;
  github: string;
  demo: string;
  used_tech: { tech: { name: string } }[];
}

export interface Solution {
  id: number;
  url_solution: string;
  cod: string;
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase.from("project").select(`
    *,
    used_tech (
      tech (name)
    )
  `);

    if (error) {
      console.error("Error al obtener proyectos:", error.message);
      return [];
    }

    return (data as Project[]) || [];
  } catch (error) {
    console.error("Error inesperado:", error);
    return [];
  }
}

export async function getSolutions() {
  try {
    const { data, error } = await supabase
      .from("solutions")
      .select(`id, url_solution, cod`);

    if (error) {
      console.error("Error al obtener soluciones:", error.message);
      return [];
    }

    return (data as Solution[]) || [];
  } catch (error) {
    console.error("Error inesperado:", error);
    return [];
  }
}
