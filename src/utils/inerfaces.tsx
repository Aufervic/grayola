import { Session } from "@supabase/supabase-js";

export interface Project {
    id?: "",
    title?: "",
    description?: "",
    files?: string[]
}

export interface Designer {
    id: "",
    user_id: "",
    first_name: "",
}

export interface Profile {
    id: "",
    created_at: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "Client" | "Project Manager" | "Designer" | ""
    user_id: "",
}


export interface SessionContextType {
    session?: Session | null;
    profile?: Profile | null;
}