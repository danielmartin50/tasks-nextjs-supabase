'use server'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: {
    email: string
    password: string
}) {
  const supabase = await createClient()


  const { error, data } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return{
        success: false,
        message: error.message
    }
  }
  return{
    success: true,
    message: 'Usuario autenticado exitosamente',
    data
  }
}

export async function signup(formData: {
    name: string
    email: string
    password: string
}) {
  const supabase = await createClient()

  
  const { error, data } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
        data: {
            name: formData.name,
            full_name: formData.name,
        }
    }
  })

  if (error) {
    console.error('Supabase signup error:', {
      message: error.message,
      code: error.code,
      status: error.status,
    })

    return {
        success: false,
        message: error.message
    }
  }

  return {
    success: true,
    message: 'Usuario registrado exitosamente',
    data
  }
}
