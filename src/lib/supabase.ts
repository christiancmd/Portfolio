import { createClient } from '@supabase/supabase-js';

// Llamamos a las variables que acabas de configurar en el .env
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

// Creamos e exportamos el cliente de conexión
export const supabase = createClient(supabaseUrl, supabaseAnonKey);