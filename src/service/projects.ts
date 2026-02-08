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

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from("project").select(`
    *,
    used_tech (
      tech (name)
    )
  `);

  if (error) throw new Error(error.message);
  return data || [];
}