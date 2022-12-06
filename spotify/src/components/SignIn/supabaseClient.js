import { createClient } from '@supabase/supabase-js'
import {keyConfig} from "./keyConfig.js"
const supabaseUrl = keyConfig.REACT_APP_SUPABASE_URL
const supabaseAnonKey = keyConfig.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)