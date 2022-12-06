import { supabase } from './supabaseClient'

export default function Auth() {
    async function handleLogin(e){
      e.preventDefault();
      try {
          const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'spotify'});
          if (error) throw error;
      } 
      catch (error) {
        alert(error.error_description || error.message)
      }
    }

    async function signout(e) {
      e.preventDefault();
      const { error } = await supabase.auth.signOut();
    }
    
    return (
        <div>
          <h1 className="header">Sign In</h1>
          <p className="description">Log in with your Spotify Account</p>
          <form onSubmit={handleLogin}>
              <button onClick={handleLogin}>login</button>
              <button onClick={signout}>logout</button>
          </form>
        </div>
    )
  }